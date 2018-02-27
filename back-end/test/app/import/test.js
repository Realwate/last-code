const questions = require('./questions.json')
let tagNames = new Set();
for(let question of questions){ // 记录tagName
  for(let tagName of question.tags){
    tagNames.add(tagName)
  }
}
console.log(tagNames.size);
console.log(tagNames);
