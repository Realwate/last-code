'use strict';

const Service = require('../core/base_service');

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  get modelName() {
    return 'User'
  }
  get createRule() {
    return {
      fields: ['name', 'password', 'site', 'avatarUrl', 'company', 'description'],
      rule: {
        name: [
          this.Validator.require('用户名不能为空！'),
          this.Validator.custom('用户名已存在！', this.nameCanUse.bind(this)),
        ],
        password: [
          this.Validator.require('密码不能为空！'),
          this.Validator.match('密码必须由字母数字组成！', /(?=\D*\d)(?=.*[a-zA-Z])/),
        ],
      }
    };

  }
  get updateRule() {
    return this.createRule;
  }
  async nameCanUse(name, curUser) {
    const user = await this.findOneByFilter({ name });
    return user == null || curUser.id == user.id;
  }
  async getUserProfile(userId, loggedInUserId) { // 用户主页
    let users = await this.getUserInfo([userId], loggedInUserId);
    return users[0]
  }
  async getUserInfo(userIds, loggedInUserId) {
    // 包含 followerCount followingCount hasFollowed

    let users = await this.dao.findAll({
      where: {
        id: { [this.Op.in]: userIds }
      }
    });
    let followInfo = await this.rawQuery(
      ' select following_id from user_follow_user_relation where  follower_id=?',
      loggedInUserId);
    let followedMap = followInfo.reduce((map, info) => {
      map[info['following_id']] = true;
      return map;
    }, {});
    users = this.jsonModel(users);
    for (let user of users) {  // 添加 hasFollowed
      if (user.id == loggedInUserId) {
        continue;
      }
      user.hasFollowed = !!followedMap[user.id];
    }
    return users;
  }
  async getFollowingUsers(viewingUserId, loggedInUserId, page) {
    let user = await this.dao.findById(viewingUserId);
    if(user == null){
      this.throwError('error user')
    }
    let followers = await user.getFollowingUsers({...page});
    let ids = followers.map((follower) => follower.id);
    return this.getUserInfo(ids, loggedInUserId);
  }
  async getFollowingQuestions(viewingUserId, page) {
    let user = await this.dao.findById(viewingUserId);
    if(user == null){
      this.throwError('error user')
    }
    let followingQuestions = await user.getFollowingQuestions({...page});

    let followingQuestionIds = followingQuestions.map(question => question.id);
    return this.getService('question').getQuestionByIds(followingQuestionIds);
  }
  async addFollower(userId, followerId) {
    let user = await this.findById(userId);
    let follower = await this.findById(followerId);
    if (await user.hasFollower(follower)) {
      this.throwError();
    }
    await user.addFollower(follower);
    user.increment('follower_count', { by: 1 });
    follower.increment('following_count', { by: 1 });
  }
  async deleteFollower(userId, followerId) {
    let user = await this.findById(userId);
    let follower = await this.findById(followerId);
    if (!await user.hasFollower(follower)) {
      this.throwError();
    }
    await user.removeFollower(follower);
    user.increment('follower_count', { by: -1 });
    follower.increment('following_count', { by: -1 });
  }

}

module.exports = UserService;
