'use strict';

const Service = require('../core/base_service');

class AnswerService extends Service {
  constructor(ctx) {
    super(ctx);
  }
  get modelName() {
    return 'Answer'
  }
  get createRule() {
    return {
      fields: ['content','user_id','question_id'],
      rule: {
        question_id: [
          this.Validator.require('问题不能为空！'),
          this.Validator.custom('找不到对应问题！', async (questionId, data) => {
            let q = this.getService('question').findById(questionId)
            return q != null;
          }),
        ],
      }
    }
  }
  async create(userId, answer) {
    let user = await this.validateUser(userId);
    let question = await this.getService('question').findById(answer.question_id);
    this.merge(answer, { user_id: userId });
    answer = await super.create(answer);
    user.increment('answer_count', { by: 1 });
    question.increment('answer_count', { by: 1 });

    // 添加回答推送通知
    this.getService('notification').addAnswerCreateMsg(question,user,answer.id);

    // 更新 矩阵
    this.getService('system').saveBehaviorData(userId, answer.question_id, this.app.config.behavior.answer);
    return this.jsonModel(answer, { author: user });
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
    let res = await this.rawQuery(
      'delete from answer_vote where user_id = ? and answer_id = ',
      userId, answerId);
    if (res) {
      answer.increment('vote_count', { by: -1 });
    }
    return res;
  }
  async getAnswerByUser(userId,page) {
    let answers = await this.dao.findAll({
      ...page,
      where: {
        user_id: userId
      },
      include: [{
        model: this.ctx.model.Question,
        as: 'question'
      }]
    });
    let answerQuestionIds = answers.map(answer => answer.question.id);
    let answerQuestions = await this.getService('question').getQuestionByIds(answerQuestionIds);
    return answerQuestions;
  }
}

module.exports = AnswerService;
