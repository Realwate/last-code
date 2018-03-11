<template>
  <main>
    <div class="container panel profile-header mb10">
      <el-row type="flex" :gutter="20">
        <el-col :xs="8" :md="4">
          <div class="user-avatar mb10">
            <img class="avatar-140" :alt="user.name"
                 :src="$options.filters.formatAvatarUrl(user.avatarUrl)">
          </div>
        </el-col>
        <el-col :xs="16" :md="8">
          <h1 class="user-name" v-text="user.name"></h1>
          <div class="user-info mt10">
            <div class="user-com"> 工作地：<span v-text="user.company"></span></div>
            <div class="user-site"> 个人主页：
              <a target="_blank" v-text="user.site" class="link" :href="user.site"></a></div>
            <div class="action-button-group mt10">
              <div v-if="isSelf">
                <el-button class="user-action-button" size="mini" plain @click="toUserEdit">编辑</el-button>
              </div>
              <user-follow-button :user.sync="user"></user-follow-button>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :md="12">
          <div class="user-desc" v-text="user.description">

          </div>
        </el-col>
      </el-row>
    </div>
    <div class="flex-container align-start ">
      <user-profile-activity @followingCountChange="followingCountChange"
                             :panel="panel" :viewingUserId="userId">
      </user-profile-activity>
      <aside class="profile-sidebar panel">
        <div class="side-inner">
          <div> 关注了</div>
          <strong v-text="user.followingCount"></strong>
        </div>
        <div class="side-inner follower">
          <div>关注者</div>
          <strong v-text="user.followerCount"> </strong>
        </div>
      </aside>
    </div>
  </main>
</template>
<script>
  import UserFollowButton from './UserFollowButton'
  import UserProfileActivity from './UserProfileActivity'
  import api from '@/api'
  import {mapGetters} from 'vuex'

  export default {
    name: 'UserProfile',
    data() {
      return {
        panel: null,
        user: {},
        questions: [],
        answeredQuestions: [],
        following: {}
      }
    },
    computed: {
      ...mapGetters([
        'loggedInUserId'
      ]),
      isSelf() {
        return this.user.id === this.loggedInUserId;
      }
    },
    props: ['userId'], // route
    methods: {
      followingCountChange(diffValue) {
        if (!this.isSelf) {
          return;
        }
        this.user.follwoingCount += diffValue;
      },
      toUserEdit() {
        this.$router.push({name: 'userSetting'})
      },
      async init() {
        this.$store.dispatch('ChangeNavHeader', {type: 'title', title: '主页'})
        let {panel} = this.$route.query;
        if (panel) {
          this.panel = panel;
        }
      },
    },
    async beforeRouteEnter(to, from, next) {
//      console.log('enter')
      // 先获取user
      let user = await api.getUserProfile(to.params.userId);
      next(vm => {
        vm.user = user;
      })
    },
    async beforeRouteUpdate(to, from, next) {
      // 先获取user
      this.user = await api.getUserProfile(to.params.userId);
      next();
    },
    created() {
      this.init();
    },
    components: {
      UserProfileActivity, UserFollowButton
    }

  }
</script>
<style scoped>
  .action-button-group {
    margin: 5px 0;
  }

  .user-desc {
    border-radius: 5px;
    padding: 20px;
    background-color: #e5e5e5;
    font-size: 15px;
    overflow: auto;
    height: 100%;
    box-sizing: border-box;
  }

  .profile-sidebar {
    background-color: #fff;
    padding: 10px 5px;
    width: 160px;
    margin-left: 10px;
    text-align: center;
    font-size: 0;
  }

  .side-inner {
    width: 50%;
    font-size: 15px;
    display: inline-block;
    box-sizing: border-box;
  }

  .follower {
    border-left: 1px solid #ccc;
  }
</style>
