<template>
  <div>
    <nav-header></nav-header>
    <main class="main-container flex-container">
      <div class="view">
        <header class="view-nav">
          <nav>
            <ul class="nav-list">
              <li class="nav-item" :class="{active:currentTab === 'rencentItem'}"
                  @click="getRecentItems">最新</li>
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
  </div>
</template>
<script>
  import TimelineEntry from './TimelineEntry'
  import TimelineSidebar from './TimelineSidebar'
  import NavHeader from '../NavHeader'
  export default {
    data() {
      return {
        currentTab: "rencentItem",
        questions:[
          {id:'fff',author:{name:'aa'},createdAt:1519509611477,
          title:"如何学习javascript?",
          tags:[{id:'g',name:'前端'},'javascipt'],
          answerCount:12,voteCount:3,followerCount:4},
          {author:{name:'aa'},createdAt:1519909611477,
          title:"如何学习javascript?",
          tags:['前端','javascipt'],
          answerCount:12,voteCount:3,followerCount:4},
          {author:{name:'aa'},createdAt:1519909611477,
          title:"如何学习javascript?",
          tags:['前端','javascipt'],
          answerCount:12,voteCount:3,followerCount:4},
          {author:{name:'aa'},createdAt:1519909611477,
          title:"如何学习javascript?",
          tags:['前端','javascipt'],
          answerCount:12,voteCount:3,followerCount:4},
          ]
      }
    },
    methods:{
      getRecommendedItems(){
        this.currentTab = "recommendedItem";
      },
      getRecentItems(){
        this.currentTab = "rencentItem";
      }
    },
    created() {
    },
    components:{
      TimelineEntry,TimelineSidebar,NavHeader
    },
  }
</script>
<style scoped>
  .main-container {
    align-items: flex-start;
  }
  .view {
    flex: 1;
    padding: 10px;
    background-color: #fff;
    box-shadow: 2px 2px 5px rgba(153, 153, 153, 0.4);
  }
  .view-nav{
    margin-bottom: 10px;
  }
  .nav-list {
    justify-content: flex-end;
  }
</style>


