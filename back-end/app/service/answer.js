'use strict';

const Service = require('../core/base_service');

class AnswerService extends Service {
  constructor(ctx){
    super(ctx);
  }
  get modelName(){
    return 'Answer'
  }
  async create(userId,{main}){
    let p1 = this.getService('user').findById(userId);
    let p2 = this.getService('question').findById(main.question_id);
    let [user,question] = await Promise.all([p1,p2]);
    if(question == null){
      this.throwError('找不到对应问题！');
    }
    this.merge(main,{user_id:userId});
    let answer = await this.dao.create(main);

    // await answer.setAuthor(user); //使用OO 会产生多条update sql
    // await answer.setQuestion(question);

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
