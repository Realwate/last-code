<template>
  <div class="container main-panel">
    <header class="tag-info">
      <h2 class="lg-font" v-text="tag.name"></h2>
      <tag-info :tag="tag"></tag-info>
    </header>
    <timeline-entry :questions="tag.questions">
    </timeline-entry>
  </div>
</template>
<script>
  import TimelineEntry from '../timeline/TimelineEntry'
  import TagInfo from './TagInfo'

  export default {
    name: 'TagDetail',
    data() {
      return {
        tag:{
          questions:[]
        }
      }
    },
    methods: {},
    async created() {
      this.$store.dispatch('ChangeNavHeader', {type: 'title', title: '标签详情'});
      this.$on('update:tag', ({tag}) => {
        this.tag = tag;
      });
      let {tagId} = this.$route.params;
      this.tag = await this.$api.getTagDetail(tagId);
    },
    components: {
      TimelineEntry, TagInfo
    },
  }
</script>
<style scoped>
  .tag-info {
    padding: 10px;
    background-color: rgba(232, 232, 232, 0.5);
    border-radius: 4px;
    text-align: center;
    margin-bottom: 10px;
  }
</style>


