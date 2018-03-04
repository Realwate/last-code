<template>
  <main class="main-container flex-container">
    <div class="panel flex1 view">
      <header class="mb10">
        <nav>
          <ul class="nav-list">
            <li class="nav-item" :class="{active:currentTab === 'rencentItem'}"
                @click="getRecentItems">最新
            </li>
            <li class="nav-item">热门</li>
            <li class="nav-item" :class="{active:currentTab === 'recommendedItem'}" @click="getRecommendedItems">推荐</li>
          </ul>
        </nav>
      </header>
      <div>
        <timeline-entry :questions="questions"/>
      </div>
    </div>
    <timeline-sidebar/>
  </main>
</template>
<script>
  import TimelineEntry from './TimelineEntry'
  import TimelineSidebar from './TimelineSidebar'

  export default {
    data() {
      return {
        currentTab: "rencentItem",
        questions: [
          {
            id: 'fff', author: {name: 'aa'}, createdAt: 1519509611477,
            title: "如何学习javascript?",
            tags: [{id: 'g', name: '前端'}, 'javascipt'],
            answerCount: 12, voteCount: 3, followerCount: 4
          },
          {
            author: {name: 'aa'}, createdAt: 1519909611477,
            title: "如何学习javascript?",
            tags: ['前端', 'javascipt'],
            answerCount: 12, voteCount: 3, followerCount: 4
          },
          {
            author: {name: 'aa'}, createdAt: 1519909611477,
            title: "如何学习javascript?",
            tags: ['前端', 'javascipt'],
            answerCount: 12, voteCount: 3, followerCount: 4
          },
          {
            author: {name: 'aa'}, createdAt: 1519909611477,
            title: "如何学习javascript?",
            tags: ['前端', 'javascipt'],
            answerCount: 12, voteCount: 3, followerCount: 4
          },
        ]
      }
    },
    methods: {
      getRecommendedItems() {
        this.currentTab = "recommendedItem";
      },
      getRecentItems() {
        this.currentTab = "rencentItem";
      }
    },
    created() {
      this.$store.dispatch('ChangeNavHeader')
    },
    components: {
      TimelineEntry, TimelineSidebar
    },
  }
</script>
<style scoped>
  .main-container {
    align-items: flex-start;
  }

  .nav-list {
    justify-content: flex-end;
  }
</style>


