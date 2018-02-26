'use strict';

const Service = require('../core/base_service');

class AnswerService extends Service {
  constructor(ctx){
    super(ctx);
  }
  get modelName(){
    return 'Answer'
  }
  async addVote(answerId, userId, { main }) { // 参照model, model
    let user = await this.getService('user').findById(userId);
    let answer = await this.findById(answerId);
    if(!user || !answer){
      this.throwError();
    }
    await answer.increment('vote_count', {by: 1});
    await this.deleteVote();
    let answerVote = await this.getDao('AnswerVote').create(main);
    await answerVote.setUser(user);
    await answerVote.setQuestion(answer);

    return answerVote;
  }
  async deleteVote(answerId, userId) {
    let answer = await this.findById(answerId);
    let res = await this.rawQuery('delete from answer_vote where user_id = ? and answer_id = ', userId, answerId);
    if(res){
      answer.increment('vote_count', {by: -1});
    }
    return res;
  }
  async create(userId,{main}){
    let p1 = this.getService('user').findById(userId);
    let p2 = this.getService('question').findById(main.question_id);
    let [user,question] = await Promise.all([p1,p2]);
    if(question == null){
      this.throwError('找不到对应问题！');
    }
    question.increment('answer_count', {by: 1});
    this.merge(main,{user_id:userId});
    let answer = await this.dao.create(main);

    // 更新 矩阵
    this.getService('system').saveBehaviorData(userId,question.id,this.app.config.behavior.answer);
    return answer;
  }
  async getAnswerByUser(userId){
    let answer = await this.dao.findAll({where:{
      user_id:userId
    },raw:true});
    return answer;
  }
}

module.exports = AnswerService;
