'use strict';

const Service = require('../core/base_service');

class QuestionService extends Service {
  constructor(ctx){
    super(ctx);
  }
  get modelName(){
    return 'Question'
  }
  // 创建问题
  async create(userId,{ref,main}) { // 参照model, model
    let user = await this.getService('user').findById(userId);
    this.merge(main,{user_id:userId})
    let question = await this.dao.create(main);
    // await question.setCreator(user)
    return question;
  }
  async getQuestionByUser(userId){
    let questions = await this.findAllByFilter({
      user_id:userId
    });
    return questions;
  }
  async addFollower(questionId,followerId){
    let question = await this.findById(questionId);
    let follower = await this.getService('user').findById(followerId);
    let res = await question.hasFollower(follower);
    if (res) {
      this.throwError();
    }
    question.addFollower(follower);
  }
  async deleteFollower(questionId,followerId){
    let question = await this.findById(questionId);
    let follower = await this.getService('user').findById(followerId);
    let res = await question.hasFollower(follower);
    if (!res) {
      this.throwError();
    }
    question.deleteFollower(follower);
  }
}

module.exports = QuestionService;
