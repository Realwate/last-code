
const { app, assert } = require('egg-mock/bootstrap');

// const ctx = app.mockContext({
//     // 模拟 ctx 的 headers
//     headers: {
//       'Accept-Language': 'zh-CN,zh;q=0.5',
//     },
//   });

describe('test/app/service/user.test.js', () => {
    
    it('should get exists user', async () => {
      // 创建 ctx
      const ctx = app.mockContext();
      const user = await ctx.service.common.model('User').findOneByFilter({name:'yiyong'});
      assert(user);
      assert(user.name === 'yiyong');
    });
  
    it('should get null when user not exists', async () => {
      const ctx = app.mockContext();
      const user = await ctx.service.common.model('User').findOneByFilter({name:'yiyong2'});
      assert(user == null);
    });
    
  });