<template>
  <aside class="sidebar hidden-sm-and-down">
    <section class="sidebar-block shadow">
      <ul class="nav-list vertical">
        <router-link :to="{ name: 'userProfile',params:{userId:loggedInUserId},query: { panel: 'questions' }}" class="nav-item" tag="li"> 我的提问 </router-link>
        <router-link :to="{ name: 'userProfile',params:{userId:loggedInUserId},query: { panel: 'answeredQuestions' }}" class="nav-item" tag="li"> 我的回答 </router-link>
        <router-link :to="{ name: 'userProfile',params:{userId:loggedInUserId},query: { panel: 'following' }}" class="nav-item" tag="li"> 我的关注 </router-link>
      </ul>
    </section>
    <section class="sidebar-block shadow" v-show="similarUsers && similarUsers.length > 0">
      <h3 class="section-title mb10">可能感兴趣的人</h3>
      <ul class="list vertical align-start">
        <li class="list-item" v-for="user in similarUsers">
          <router-link :to="{name: 'userProfile',params:{userId: user.id}}">
            <img class="avatar-24" :alt="user.name"
                 :src="$options.filters.formatAvatarUrl(user.avatarUrl)">
            <span class="small-author">{{user.name}}</span>
          </router-link>

        </li>
      </ul>
    </section>
    <section class="sidebar-block shadow">
      <h3 class="section-title">社区运行情况</h3>
      <ul class="list vertical align-start">
        <li class="list-item">用户数： <span v-text="systemInfo.userCount"></span></li>
        <li class="list-item">问题数： <span v-text="systemInfo.questionCount"></span></li>
        <li class="list-item">回复数： <span v-text="systemInfo.answerCount"></span></li>
      </ul>
    </section>
    <footer>
      ©Realwate 作品
    </footer>
  </aside>
</template>
<script>
  import { mapGetters } from 'vuex'
  import UserProfile from '@/components/main/profile/UserProfile'
  export default {
    data() {
      return {
        systemInfo:{
        },
        similarUsers:[]
      }
    },
    computed: mapGetters([
      'loggedInUserId'
    ]),
    methods: {
    },
    async created() {
      let [sys,similarUsers] = await this.$api.parallel(this.$api.getSystemInfo(),this.$api.getSimilarUsers());
      this.systemInfo = sys;
      this.similarUsers = similarUsers;
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
  }
  .section-title{
    margin-bottom: 10px;
  }
</style>


