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
      this[datasetFn()] = [];
      this.requestSubscription && this.requestSubscription.unsubscribe();

      this.requestSubscription = this.$util.scrollRequest({
        request: request.bind(this, this.page),
        beforestart: () => {
          beforestart && beforestart();
        },
        onload: () => {
          onload && onload()
        }
      }).subscribe((items) => {
        if (adapter) {
          items = adapter(items)
        }
        this[datasetFn()].push(...items);
        this.page.pageNum++;
      })
    }
  },
  created() {
  },
  beforeDestroy() {
    this.requestSubscription && this.requestSubscription.unsubscribe();
  }
};
