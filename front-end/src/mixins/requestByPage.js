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

export default {
  data() {
    return {
      requestSubscription: null,
      page: {
        pageNum: 0,
        limit: this.$config.pageLimit,
      }
    }
  },
  methods: {
    initRequestByPage({beforestart, onload, datasetKey, request, adapter}) {
      this.page.pageNum = 0;
      let datasetFn = datasetKey;
      if (typeof datasetFn !== 'function') {
        datasetFn = () => datasetKey;
      }
      this.requestSubscription && this.requestSubscription.unsubscribe();
      request = request.bind(this, this.page);

      let init$ = Rx.Observable.fromPromise(request())
        .do(() => {
          this[datasetFn()] = [];
        })
        .take(1);

      let request$ = scroll$
        .exhaustMap(() => { // 发送请求的期间再次滚动 会忽略
          beforestart && beforestart();
          return Rx.Observable
            .fromPromise(request())
        })
        .do(() => {
          onload && onload();
        })
        .takeWhile((items) => {
          return items && items.length !== 0;
        })
      let scrollRequest$ = init$.concat(request$);

      this.requestSubscription = scrollRequest$
        .subscribe((items) => {
          if (adapter) {
            items = adapter(items)
          }
          this[datasetFn()].push(...items);
          this.page.pageNum++;
        })
    }
  },
  beforeDestroy() {
    this.requestSubscription && this.requestSubscription.unsubscribe();
  }
};
