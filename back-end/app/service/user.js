'use strict';

const Service = require('../core/base_service');

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  get modelName() {
    return 'User'
  }
  async getUserProfile(id) { // 用户主页
    const ctx = this.ctx;
    let user = await this.dao.findOne({
      where: {
        id: id,
      },
      include: [{ model: ctx.model.Question, as: "question" }]
    });
    let following = await user.countFollowing();
    let follower = await user.countFollower();

    let res = user.get({ plain: true });
    res.following = following;
    res.follower = follower;
    return res;
  }
  async getFollowingTags(id) {
    let user = await this.dao.findById(id);
    let tags = await user.getFollowingTags();
    return tags;
  }
  async getFollowingUsers(id) {
    let user = await this.dao.findById(id);
    let follower = await user.getFollowingUser();
    return follower;
  }
  async getFollowingQuestion(id) {
    let user = await this.dao.findById(id);
    let questions = await user.getFollowingQuestion();
    return questions;
  }
  async addFollower(userId, followerId) {
    let user = await this.findById(userId);
    let follower = await this.findById(followerId);
    let res = await user.hasFollower(follower);
    if (res) {
      this.throwError();
    }
    user.addFollower(follower);
  }
  async deleteFollower(userId, followerId) {
    let user = await this.findById(userId);
    let follower = await this.findById(followerId);
    if (!await user.hasFollower(follower)) {
      this.throwError();
    }
    user.addFollower(follower);
  }

}

module.exports = UserService;
