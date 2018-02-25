
const { app, assert } = require('egg-mock/bootstrap');

// const ctx = app.mockContext({
//     // 模拟 ctx 的 headers
//     headers: {
//       'Accept-Language': 'zh-CN,zh;q=0.5',
//     },
//   });

describe('test/app/service/question.test.js', () => {

    it.only('create question', async () => {
      const ctx = app.mockContext();
      let question = await ctx.service.question.create('2fee2e2016cf11e895f0bda99c7c2758',{main:{
        title:"text",
        content:'test ccc'
      }})
      console.log(question.get({'plain': true}))
      // console.log(question.get('created_at'));
    });

  });
