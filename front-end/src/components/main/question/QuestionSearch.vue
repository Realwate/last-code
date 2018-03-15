<template>
  <div class="container main-panel pd20">
    <div class="empty-text" v-if="questions.length == 0">
      暂无结果~
    </div>
    <div v-else>
      <timeline-entry :keywords="keywords" :questions="questions"/>
    </div>
  </div>
</template>
<script>
  import TimelineEntry from '../timeline/TimelineEntry'
  import {mapGetters} from 'vuex'
  import requestByPage from '@/mixins/requestByPage'
  export default {
    data() {
      return {
        questions: []
      }
    },
    mixins: [requestByPage],
    props: ['keywords'],
    methods: {
      request(...args){
        return this.$api.searchQuestion(this.keywords,...args)
      },
      async search() {
        if (this.keywords == null || this.keywords.trim() === "") {
          return;
        }
        this.initRequestByPage({
          datasetKey: 'questions',
          request: this.request,
          onload: () => {
            this.$store.dispatch('ChangeNavHeader',
              {type: 'title', title: `关键字：${this.keywords}`});
          }
        })

      }
    },
    watch: {
      keywords() {
        this.search();
      }
    },
    created() {
      this.search();
    },
    components: {
      TimelineEntry
    },
  }
</script>
<style scoped>
</style>


