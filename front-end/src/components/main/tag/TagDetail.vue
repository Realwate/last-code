<template>
  <div class="container main-panel">
    <header class="tag-info">
      <h2 class="lg-font" v-text="tag.name"></h2>
      <tag-info :tag="tag"></tag-info>
    </header>
    <timeline-entry :questions="questions">
    </timeline-entry>
  </div>
</template>
<script>
  import TimelineEntry from '../timeline/TimelineEntry'
  import TagInfo from './TagInfo'

  export default {
    data() {
      return {
        tag: {
          id: '2f',
          name: '前端框架',
          followerCount: 12,
          questionCount: 48,
        },
        questions: [
          {
            id: 'fff', creator: {name: 'aa'}, createdAt: 1519509611477,
            title: "如何学习javascript?",
            tags: ['前端', 'javascipt'],
            answerCount: 12, voteCount: 3, followerCount: 4
          },

        ]
      }
    },
    methods: {},
    created() {
      this.$store.dispatch('ChangeNavHeader', {type: 'title', title: '标签详情'})
      let {tagId} = this.$route.params;
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


