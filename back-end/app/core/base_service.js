
const util = require('../util');
const Service = require('egg').Service;

class BaseService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  get dao() {
    return this.ctx.model[this.modelName];
  }
  get modelName(){
    throw Error('unsuported operation!');
  }
  rawQuery(sql, ...args) {
    return this.app.sequelize.query(sql, {
      replacements: args,
      type: this.app.sequelize.QueryTypes.SELECT
    });
  }
  getDao(name){
    return this.ctx.dao[name];
  }
  getService(name){
    return this.ctx.service[name];
  }
  merge(...args){
    return Object.assign(...args);
  }
  throwError(msg) {
    if(msg == null){
      msg = "error parameter!";
    }
    if (msg.join) {
      msg = msg.join('\n');
    }
    util.throwError(msg);
  }
  async create(obj) {
    return this.dao.create(obj);
  }
  async destroy(id) {
    const model = await this.dao.findById(id);
    if(model == null){
      this.throwError('error parameter!')
    }
    return model.destroy();
  }
  async update(id,obj) {
    const model = await this.dao.findById(id);
    if(model == null){
      this.throwError('error parameter!')
    }
    return model.update(obj);
  }
  async findById(id){
    const model = await this.dao.findById(id);
    return model;
  }
  async findOneByFilter(where = {}) {
    const config = { where ,raw: true};
    return this.dao.findOne(config,);
  }
  async findAllByFilter(where = {}) {
    const Op = this.ctx.app.Sequelize.Op;
    const config = { order: [[ 'updated_at', 'DESC' ]], where,raw: true };
    return this.dao.findAll(config);
  }
  async count(){
    return this.dao.count();
  }
}
module.exports = BaseService;
