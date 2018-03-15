<template>
  <main class="main-container flex-container">
    <div class="main-panel flex1" v-loading="loading">
      <header class="mb10">
        <nav>
          <ul class="nav-list">
            <li class="nav-item" :class="{active:currentTab === 'recent'}"
                @click="getRecentItems">最新
            </li>
            <!--<li class="nav-item">热门</li>-->
            <li class="nav-item" :class="{active:currentTab === 'recommend'}"
                @click="getRecommendedItems">推荐
            </li>
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
  import requestByPage from '@/mixins/requestByPage'

  export default {
    name: 'Timeline',
    mixins: [requestByPage],
    data() {
      return {
        currentTab: "recent",
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
      request(...args) {
        return this.$api.timeline(this.currentTab, ...args)
      },
      async changeTab() {
        this.initRequestByPage({
          datasetKey: 'questions',
          request: this.request,
          beforestart: () => {
            this.loading = true;
          },
          onload: () => {
            this.loading = false;
          }
        })
      }
    },
    created() {
      this.$store.dispatch('ChangeNavHeader');
      this.changeTab();
    },
    destroyed() {
      this.requestSub.unsubscribe();
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


