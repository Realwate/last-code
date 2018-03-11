'use strict';
let path = require('path');
let fs = require('fs')
let util = require('../util');
const Controller = require('../core/base_controller');
class SystemController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  get serviceName() {
    return 'system';
  }
  async getSystemInfo() {
    let result = await this.service.getSystemInfo();
    this.success(result);
  }
  async getSimilarUsers() {
    let result = await this.service.getSimilarUsers(this.loggedInUserId);
    this.success(result);
  }
  getAvatarPath(fileName) {
    return path.join(this.getAvatarDir(), fileName)
  }
  getAvatarDir() {
    return path.join(this.app.config.uploadPath, '/avatar');
  }
  async getAvatar() {
    let fileName = this.ctx.params.name;
    let path = this.getAvatarPath(fileName);
    if (!fs.existsSync(path)) {
      this.ctx.status = 404;
      return;
    }
    const readStream = fs.createReadStream(path);
    this.ctx.body = readStream;
  }
  async uploadAvatar() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const fileName = util.uuidv1() + path.extname(stream.filename).toLowerCase();
    const dir = this.getAvatarDir();
    if (!fs.existsSync(dir)) {
      util.mkDir(dir);
    }
    const writeStream = fs.createWriteStream(this.getAvatarPath(fileName));

    try {
      await util.awaitWrite(stream.pipe(writeStream));
    } catch (err) {
      throw err;
    }
    let avatarUrl = `image/avatar/${fileName}`;
    let user = await this.getService('user').findById(this.loggedInUserId);
    await user.update({ avatarUrl }); // 更新头像
    this.success({ avatarUrl })
  }
}


module.exports = SystemController;
