const Service = require('egg').Service;
// CommonService 统一用于单表的CRUD
class CommonService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  get dao() {
    return this.ctx.model[this.modelName];
  }
  model(modelName) {
    this.modelName = modelName;
    return this;
  }
  async create(obj) {
    return this.dao.create(obj);
  }
  async destroy(id) {
    const model = await this.dao.findById(id);
    return model.destroy();
  }
  async update(obj) {
    const model = await this.dao.findById(id);
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
    const Op = this.ctx.app.Sequelize.Op;
    const config = { order: [[ 'updated_at', 'DESC' ]], where };
    return this.dao.findAll(config);
  }
}
module.exports = CommonService;
