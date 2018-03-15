function getCookie(sKey) {
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

function setCookie(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
    return false;
  }
  var sExpires = "";
  if (vEnd) {
    switch (vEnd.constructor) {
      case Number:
        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
        break;
      case String:
        sExpires = "; expires=" + vEnd;
        break;
      case Date:
        sExpires = "; expires=" + vEnd.toUTCString();
        break;
    }
  }
  document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
  return true;
}

function sleep(t = 800) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t)
  })
}

function debounceFn(fn, t = 100) {
  let id = null;
  let executeFn = (args) => {
    id = setTimeout(fn.bind(this, ...args), t);
  }
  return (...args) => {
    if (id === null) {
      executeFn(args);
    } else {
      clearTimeout(id);
      executeFn(args);
    }
  }
}

function throttleFn(fn, t = 200) {
  let id = null;
  return (...args) => {
    if (id === null) {
      id = setTimeout(() => {
        fn.call(this, ...args);
        id = null;
      }, t)
    }
  }

}

import Rx from 'rxjs/Rx'
import config from '../config'

function isScrollingDown([prePosition, curPosition]) {
  return prePosition['st'] < curPosition['st']
}

function isScrollExpectedPercent({sh, st, ch}) {
  // 滚动条到达底部时 有 sh = st + ch
  return (st + ch) / sh >= config.requestPercent
}

function scrollObservable() {
  let source = Rx.Observable.fromEvent(window, 'scroll')
    .throttleTime(100)
    .map(e => ({
      sh: e.target.scrollHeight || document.documentElement.scrollHeight,
      st: e.target.scrollTop || document.documentElement.scrollTop,
      ch: e.target.clientHeight || document.documentElement.clientHeight
    }))
    .pairwise() // 返回前一个和现在的值
    .filter((positions) => {
      return isScrollingDown(positions) && isScrollExpectedPercent(positions[1])
    })
  // .do(() => console.log('scroll expected'))
  let subject = new Rx.Subject();
  return source.multicast(subject).refCount();
}

let scroll$ = scrollObservable()

function scrollRequest({request, beforestart, onload}) {
  let init$ = Rx.Observable.fromPromise(request()).take(1);
  let request$ = scroll$.exhaustMap(() => { // 发送请求的期间再次滚动 会忽略
    beforestart && beforestart();
    return Rx.Observable
      .fromPromise(request())
  })
    .do(() => {
      onload && onload();
    })
    .takeWhile((items) => {
      return items.length !== 0;
    })
  return init$.concat(request$);
}


export default {
  getCookie, setCookie, sleep,
  throttleFn, debounceFn, scrollRequest
}
