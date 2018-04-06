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

export default {
  getCookie, setCookie, sleep,
  throttleFn, debounceFn
}
