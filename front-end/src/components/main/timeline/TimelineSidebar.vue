<template>
  <aside class="sidebar hidden-sm-and-down">
    <section class="sidebar-block">
      <ul class="nav-list vertical">
        <router-link :to="{ name: 'userProfile',params:{userId},query: { panel: 'question' }}" class="nav-item" tag="li"> 我的提问 </router-link>
        <router-link :to="{ name: 'userProfile',params:{userId},query: { panel: 'answer' }}" class="nav-item" tag="li"> 我的回答 </router-link>
        <router-link :to="{ name: 'userProfile',params:{userId},query: { panel: 'follow' }}" class="nav-item" tag="li"> 我的关注 </router-link>
      </ul>
    </section>
    <section class="sidebar-block">
      <h4 class="title">可能感兴趣的人</h4>
    </section>
    <section class="sidebar-block">
      <h4 class="title">社区运行情况</h4>
      <ul class="list vertical">
        <li class="list-item">用户数： <span v-text="userCount"></span></li>
        <li class="list-item">问题数： <span v-text="questionCount"></span></li>
        <li class="list-item">回复数： <span v-text="answerCount"></span></li>
      </ul>
    </section>
    <footer>
      ©Realwate 作品
    </footer>
  </aside>
</template>
<script>
  import { mapState } from 'vuex'
  import UserProfile from '@/components/main/profile/UserProfile'
  export default {
    data() {
      return {
        currentTab: "rencentItem",
        userCount: 10,
        questionCount: 150,
        answerCount: 200,
      }
    },
    computed: mapState([
      'userId'
    ]),
    methods: {
      getRecommendedItems() {
        this.currentTab = "recommendedItem";
      },
      getRecentItems() {
        this.currentTab = "rencentItem";
      }
    },
    created() {
    },
  }
</script>
<style scoped lang="scss">
  .sidebar {
    width: 160px;
    margin-left: 20px;
  }
  .sidebar-block {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 15px;
    box-shadow: 2px 2px 5px rgba(153, 153, 153, 0.4);
    .title{
      margin-bottom: 10px;
    }
  }
  .list {
    justify-content: flex-start;
  }
</style>


