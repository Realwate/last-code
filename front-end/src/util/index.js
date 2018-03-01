import Msg from './msg'
import api from '../api'

function formatDate(date) {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 30;

  if(typeof date === "string"){ // isoStr
    date = new Date(date).getTime();
  }
  let diffValue = Date.now() - date;
  if (diffValue < 0) {
    return;
  }
  let yearC = diffValue / year;
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  let result;
  if (yearC >= 1) {
    result = "" + parseInt(monthC) + "年前";
  }
  else if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  }
  else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else
    result = "刚刚";
  return result;
}

export default {
  install(Vue){
    let extend = {
      $api:api,
      $util:{
        formatDate
      }
    }
    Object.assign(Vue.prototype,Msg,extend);
  }
}
