'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/model/user.test.js', () => {
  let User ;
  before(()=>{
    User = app.model.User;
  })
  it('create user', async () => {
    let user = await User.create({name:"aa",password:"1"})
    app.logger.log(user);
    const ctx = app.mockContext();
  });

});
