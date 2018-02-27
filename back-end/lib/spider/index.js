
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path')

const baseUrl = "https://segmentfault.com"
const url = "/questions/hottest/";
const COUNT = 140;
let questionUrls = [];
let questionDetails = [];
const headers = {
  // ':authority': 'segmentfault.com',
  // ':method': 'GET',
  // ':path': '/questions/hottest',
  // ':scheme': 'https',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'accept-encoding': 'gzip',
  'accept-language': 'zh-CN,zh;q=0.9',
  'cache-control': 'no-cache',
  'cookie': '_ga=GA1.2.587871908.1512388661; __jsluid=439b4457458b1487a5aa79e49fea120a; PHPSESSID=web2~ff23af880a801cfa1ac507e64acf647e; last-url=/; io=igJl5hJ7IMgenlhBE7C9; _gid=GA1.2.1188870082.1519549791; Hm_lvt_e23800c454aa573c0ccb16b52665ac26=1519225754,1519635252,1519658122,1519659067; Hm_lpvt_e23800c454aa573c0ccb16b52665ac26=1519708222',
  'referer': 'https://segmentfault.com/questions/hottest/weekly',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36'
};
function request(path) {
  return rp({ url:parseUrl(path), headers, gzip: true });
}
function parseHtml(html){
  return cheerio.load(html,{decodeEntities: false})
}
function parseUrl(path){
  return `${baseUrl}${path}`
}
async function getUrls(path) {
  let res;
  try {
    res = await request(path);
  }
  catch (e) {
    console.log(e)
    throw e
  }
  let $ = parseHtml(res);
  let questions = $('div.stream-list.question-stream div.summary h2 a');
  questionUrls = questionUrls.concat(questions.map((i, el) => $(el).attr('href')).get());
  let next = $('ul.pagination a[rel="next"]');
  if (next.length > 0) {
    var nextUrl = next.attr('href');
    await getUrls(nextUrl)
  }
}
async function getQuestionDetail(path) {
  let res = await request(path)
  let $ = parseHtml(res);
  let title = $('#questionTitle').text().trim();
  let tags = $('ul.taglist--inline a').map((i,el)=>{
    return $(el).text().trim();
  }).get();
  let content = $('.question').html().trim();
  let answer = $('.answer').map((i,el)=>{
    return $(el).html().trim();
  }).get();
  let data = {
    title, tags, content, answer
  }
  questionDetails.push(data);
}
function getFileName(name) {
  var date = new Date();
  var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  let fileName = `${name}${time}.json`
  return path.join(__dirname, fileName)
}
async function main() {
  let start = Date.now();
  let questionUrlFile = getFileName('questionUrl');
  if (!fs.existsSync(questionUrlFile)) {
    await (getUrls(url));
    fs.writeFileSync(questionUrlFile, JSON.stringify(questionUrls))
  }
  let urls = JSON.parse(fs.readFileSync(questionUrlFile));
  let len = Math.min(COUNT, urls.length);
  for (let i = 0; i < len; i++) {
    console.log(`开始爬取第${i+1}个`);
    await getQuestionDetail(urls[i])
    if(i % 10 == 0){
      saveDetail();
    }
    await sleep(1000)
  }
  saveDetail();
  let end = Date.now();
  let spend = ((end - start)/1000).toFixed(2);
  console.log(`添加完毕！花费时间${spend}s`)
}
function saveDetail(){
  console.log(`保存数据`);
  let detailFile = getFileName('questionDetails');
  fs.writeFileSync(detailFile, JSON.stringify(questionDetails))
}
function sleep(delay){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>resolve(),delay)
  })
}
main();


