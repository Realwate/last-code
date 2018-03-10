'use strict';

const Service = require('../core/base_service');

class AnswerService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  get modelName() {
    return 'Answer'
  }
  async addVote(answerId, userId, { main }) { // 参照model, model
    let user = await this.getService('user').findById(userId);
    let answer = await this.findById(answerId);
    if (!user || !answer) {
      this.throwError();
    }
    await answer.increment('vote_count', { by: 1 });
    await this.removeVote();
    let answerVote = await this.getDao('AnswerVote').create(main);
    await answerVote.setUser(user);
    await answerVote.setQuestion(answer);

    return answerVote;
  }
  async deleteVote(answerId, userId) {
    let answer = await this.findById(answerId);
    let res = await this.rawQuery('delete from answer_vote where user_id = ? and answer_id = ', userId, answerId);
    if (res) {
      answer.increment('vote_count', { by: -1 });
    }
    return res;
  }
  async create(userId, answer) {
    let p1 = this.getService('user').findById(userId);
    let p2 = this.getService('question').findById(answer.question_id);
    let [user, question] = await Promise.all([p1, p2]);
    if (question == null) {
      this.throwError('找不到对应问题！');
    }
    this.merge(answer, { user_id: userId });
    answer = await this.dao.create(answer);
    user.increment('answer_count', { by: 1 });

    // 更新 矩阵
    this.getService('system').saveBehaviorData(userId, question.id, this.app.config.behavior.answer);
    return  this.jsonModel(answer,{author:user}) ;
  }
  async getAnswerByUser(userId) {
    let answers = await this.dao.findAll({
      where: {
        user_id: userId
      },
      include:[{
        model:this.ctx.model.Question,
        as: 'question'
      }]
    });
    let answerQuestionIds = answers.map(answer=>answer.question.id);
    let answerQuestions = await this.getService('question').getQuestionByIds(answerQuestionIds);
    return answerQuestions;
  }
}

module.exports = AnswerService;
