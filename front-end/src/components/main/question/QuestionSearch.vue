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

  export default {
    data() {
      return {
        questions: []
      }
    },
    props: ['keywords'],
    methods: {
      async search() {
        if (this.keywords == null || this.keywords.trim() === "") {
          return;
        }
        this.questions = await this.$api.searchQuestion(this.keywords);
        this.$store.dispatch('ChangeNavHeader',
          {type: 'title', title: `关键字：${this.keywords}`});
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


