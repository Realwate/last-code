
const { app, assert } = require('egg-mock/bootstrap');

let ctx;
const fs = require('fs')
const path = require('path')

describe('test model', () => {
  before(async () => {
    ctx = app.mockContext();
  })
  it.only('return cameCase ', async () => {
    let test = await ctx.model.Test.create({content:'fad',voteCount:1998});
    console.log(test)
    console.log('end')
  });
});
