<template>
  <main class="main-container flex-container">
    <div class="main-panel flex1" v-loading="loading">
      <header class="mb10">
        <nav>
          <ul class="nav-list">
            <li class="nav-item" :class="{active:currentTab === 'recent'}"
                @click="getRecentItems">最新
            </li>
            <li class="nav-item">热门</li>
            <li class="nav-item" :class="{active:currentTab === 'recommend'}" @click="getRecommendedItems">推荐</li>
          </ul>
        </nav>
      </header>

      <timeline-entry :questions="questions"/>
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
        currentTab: "recentItem",
        loading: false,
        questions: []
      }
    },
    methods: {
      getRecommendedItems() {
        this.currentTab = "recommend";
        this.changeTab();
      },
      getRecentItems() {
        this.currentTab = "recent";
        this.changeTab();
      },
      async changeTab() {
        this.loading = true;
        this.questions = await this.$api.timeline(this.currentTab);
        this.loading = false;
      }
    },
    created() {
      this.$store.dispatch('ChangeNavHeader');
      this.getRecentItems();
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


