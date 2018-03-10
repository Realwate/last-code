<template>
  <div class="profile-main panel">
    <el-tabs v-model="activePanel" @tab-click="togglePanel">
      <el-tab-pane label="提问" name="questions">
        <div class="empty-text" v-if="questions == null || questions.length == 0">
          还没有提问~
        </div>
        <timeline-entry :questions="questions">
        </timeline-entry>
      </el-tab-pane>
      <el-tab-pane label="回答" name="answeredQuestions">
        <div class="empty-text" v-if="answeredQuestions == null || answeredQuestions.length == 0">
          还没有回答~
        </div>
        <timeline-entry :questions="answeredQuestions">
        </timeline-entry>
      </el-tab-pane>
      <el-tab-pane label="关注" name="following">
        <el-tabs type="card">
          <el-tab-pane label="我关注的问题">
            <div class="empty-text" v-if="following.questions == null || following.questions.length == 0">
              还没有关注问题~
            </div>
            <timeline-entry :questions="following.questions">
            </timeline-entry>
          </el-tab-pane>
          <el-tab-pane label="我关注的人">
            <div class="empty-text" v-if="following.users == null || following.users.length == 0">
              还没有关注任何人~
            </div>

            <ul>
              <li class="user-item" v-for="(followingUser,index) in following.users">
                <img class="avatar-60"
                     src="https://sfault-avatar.b0.upaiyun.com/364/787/3647877757-58c236fe63c80_huge256" alt="">
                <div class="info-box flex1">
                  <user-link :user="followingUser"></user-link>
                  <div class="following-info">
                    <span> 关注者 <span>{{followingUser.followerCount}}</span> </span>
                    <span> 回答数 <span>{{followingUser.questionCount}}</span> </span>
                  </div>
                </div>
                <user-follow-button :index="index" :user="followingUser"
                                    @update:user="updateFollowingUser"></user-follow-button>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import TimelineEntry from '../timeline/TimelineEntry'
  import UserFollowButton from './UserFollowButton'
  import UserLink from './UserLink'
  import {mapGetters} from 'vuex'

  export default {
    name: 'UserProfileActivity',
    data() {
      return {
        activePanel: this.panel || "questions",
        questions: [],
        answeredQuestions: [],
        following: {}
      }
    },
    computed: {
      ...mapGetters([
        'loggedInUserId'
      ]),
    },
    props: {
      viewingUserId: {type: String, required: true}, // 正在浏览的用户
      panel: {type: String}
    },
    methods: {
      async togglePanel() {
        let curPanel = this.activePanel;
        let api = this.getActivityAPI(curPanel);
        this[curPanel] = await api(this.viewingUserId);
      },
      getActivityAPI(panel) {
        let map = {
          questions: 'getUserQuestion',
          answeredQuestions: 'getUserAnswer',
          following: 'getUserFollow',
        }
        return this.$api[map[panel]];
      },
      updateFollowingUser(followingUser, index) {
        let diffValue = followingUser.followerCount - this.following.users[index].followerCount;
        this.$set(this.following.users, index, followingUser);
        this.$emit('followingCountChange', diffValue);  // 关注者数量变化
      },
    },
    created() {
      this.togglePanel();
    },
    components: {
      TimelineEntry,
      UserFollowButton,
      UserLink
    }

  }
</script>
<style scoped>
  .profile-main {
    padding-left: 20px;
    flex: 1;
    min-height: 50vh;
  }
  .info-box{
    margin-left: 10px;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-self: stretch;
  }
  .following-info{
    color: #888;
  }
  .user-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-bottom:1px solid #ccc;
    padding-bottom:10px;
  }

</style>
