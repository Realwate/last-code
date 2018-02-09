'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  before(function () {
    console.log('before:');
});

after(function () {
    console.log('after.');
});

beforeEach(function () {
    console.log('  beforeEach:');
});

afterEach(function () {
    console.log('  afterEach.');
});

  it('should return user name duplicate', () => {
    return app.httpRequest()
      .post('/api/signup')
      .send({
        name: 'yiyong',
        password: '12',
      })
      .expect(200)
      .then(res => {
        assert.strictEqual(res.body.error.message, '用户名已存在！');
      });

  });
  it('should return password empty', () => {
    return app.httpRequest()
      .post('/api/signup')
      .send({
        name: '2',
        password: '',
      })
      .expect(200)
      .then(res => {
        assert.strictEqual(res.body.error.message, '密码不能为空！');
      });

  });
  it('should return illegal password', () => {
    return app.httpRequest()
      .post('/api/signup')
      .send({
        name: '2',
        password: '2',
      })
      .expect(200)
      .then(res => {
        assert.strictEqual(res.body.error.message, '密码必须由字母数字组成！');
      });

  });
});
