
const Service = require('egg').Service;
const Validator = require('./validator');

class BaseService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Op = this.app.Sequelize.Op;
    this.Validator = Validator;
  }
  get dao() {
    return this.ctx.model[this.modelName];
  }
  get modelName() {
    throw Error('unsuported operation!');
  }
  get createRule() {
    return {}
  }
  get udpateRule() {
    return {}
  }
  async createValidate(data) {
    return this.validate(this.createRule, data);
  }
  async updateValidate(data) {
    return this.validate(this.updateRule, data);
  }
  async validate({ rule, fields }, data) {
    if (rule) {
      // 先校验
      let msg = await Validator.validate(rule, data);
      msg && this.throwError(msg);
    }
    if (fields) {
      // 返回指定fields组成的对象 去除version count等字段
      let filterObj = {}
      for (let field of fields) {
        filterObj[field] = data[field];
      }
      return filterObj;
    }
    return data;

  }
  constructWhere(ids) {
    let res = ids.map((id) => `'${id}'`).join(",")
    return ` (${res}) `;
  }
  rawQuery(sql, ...args) {
    return this.app.model.query(sql, {
      replacements: args,
      type: this.app.model.QueryTypes.SELECT
    });
  }
  getDao(name) {
    return this.ctx.model[name];
  }
  getService(name) {
    return this.ctx.service[name];
  }
  merge(...args) {
    return Object.assign(...args);
  }
  throwError(msg) {
    if (msg == null) {
      msg = "error parameter!";
    }
    if (msg.join) {
      msg = msg.join('\n');
    }
    this.app.util.throwError(msg);
  }
  async parallel(...multiPromise) {
    return Promise.all(multiPromise);
  }
  async create(obj) {
    obj = await this.createValidate(obj);
    return this.dao.create(obj);
  }
  async destroy(id) {
    const model = await this.dao.findById(id);
    if (model == null) {
      this.throwError()
    }
    return model.destroy();
  }
  async update(id, obj) {
    const model = await this.dao.findById(id);
    if (model == null) {
      this.throwError()
    }
    obj = await this.updateValidate(obj);
    return model.update(obj);
  }
  async findById(id) {
    const model = await this.dao.findById(id);
    return model;
  }
  async findOneByFilter(where = {}) {
    const config = { where };
    return this.dao.findOne(config);
  }
  async findAllByFilter(where = {}) {
    const config = { order: [['updated_at', 'DESC']], where };
    return this.dao.findAll(config);
  }
  async count(){
    return this.dao.count();
  }
  async validateUser(userId){
    let user = await this.getService('user').findById(userId);
    if(user == null){
      this.throwError('用户不存在！')
    }
    return user;
  }
  jsonModel(model, extend = {}) {
    if (Array.isArray(model)) {
      return model.map((m) => {
        let o = m.get({ plain: true });
        return Object.assign(o, extend);
      })
    }
    return Object.assign(model.get({ plain: true }), extend);
  }
}
module.exports = BaseService;
