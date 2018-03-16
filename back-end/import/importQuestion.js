
const questions = require('./questions.json')
const mock = require('egg-mock');

let ctx;
const fs = require('fs')
const path = require('path')

const fileName = path.join(__dirname, './import.json')
const userNames = 'Admin,Jack,Mike,Rose,Peter,Tom,Lucy,Lily,Momo,August'.split(',');
let tagNames = new Set();
for (let question of questions) { // 记录tagName
  for (let tagName of question.tags) {
    tagNames.add(tagName)
  }
}
function getRandomUser(count) {
  let indics = new Set();
  while (indics.size != count) {
    let num = getRandom(0, 10); // [ )
    indics.add(num)
  }
  return Array.from(indics).map((i) => userNames[i]);
}
function getRandom(start, end) {
  return Math.floor(Math.random() * end + start);
}

let userModelMap = {};
let tagModelMap = {};
async function createUser() {
  let User = ctx.model.User;
  for (let name of userNames) {
    let user = await User.create({ name, password: "a" });
    userModelMap[user.name] = user.id;
  }
}
async function createTag() {
  let Tag = ctx.model.Tag;
  for (let name of tagNames) {
    let tag = await Tag.create({ name, description: name })
    tagModelMap[tag.name] = tag.id;
  }
}
let questionService;
let answerService;
let userService;
let timelineService;
const ANSWER_COUNT = 3;
let questionIds = [];

async function init() {
  app = mock.app();
  await app.ready();
  ctx = app.mockContext();
  questionService = ctx.service.question;
  answerService = ctx.service.answer;
  userService = ctx.service.user;
  timelineService = ctx.service.timeline;
}

async function createUsersIfNotExist() {
  if (fs.existsSync(fileName)) {
    let content = fs.readFileSync(fileName);
    content = JSON.parse(content);
    userModelMap = content.userModelMap;
    tagModelMap = content.tagModelMap;
  } else {
    // await app.model.sync({force:true});
    await createUser();
    await createTag();
    fs.writeFileSync(fileName, JSON.stringify({ userModelMap, tagModelMap }));
  }
}

async function createQuestions() {
  let ans = [];
  for (let question of questions) {
    if (!question.answer) {
      continue
    }
    let randUsers = getRandomUser(ANSWER_COUNT + 1).map(name => userModelMap[name]);
    let tags = question.tags.map((tagName) => { return { id: tagModelMap[tagName] } });

    let createdQues = await questionService.create(randUsers[0], {
      title: question.title,
      content: question.content,
      tags
    })

    let len = Math.min(question.answer.length, ANSWER_COUNT); // 最多3个回答

    for (let i = 0; i < len; i++) {
      let answer = question.answer[i];
      ans.push(answerService.create(randUsers[i + 1], { // 创建完后再推荐
        question_id: createdQues.id,
        content: answer
      }));
    }
  }
  await Promise.all(ans);
}

async function refreshRecommedItems() {
  await app.runSchedule('update_recommend');
  let userName = getRandomUser(1)[0];
  let userId = userModelMap[userName];
  let items = await timelineService.getRecommendedItem(userId, { offset: 0, limit: 100 })
}

async function main() {
  try {
    await init();
    await createUsersIfNotExist();
    await createQuestions();
    await refreshRecommedItems();
    console.log('import succes')
  } catch (e) {
    console.error(e);
    throw e;
  }
}

if (require.main === module) {
  main();
}
module.exports = main

