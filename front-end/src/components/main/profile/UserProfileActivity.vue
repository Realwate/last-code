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
        <el-tabs type="card" v-model="followingPanel" @tab-click="togglePanel">
          <el-tab-pane label="我关注的问题" name="followingQuestions">
            <div class="empty-text" v-if="followingQuestions == null || followingQuestions.length == 0">
              还没有关注问题~
            </div>
            <timeline-entry :questions="followingQuestions">
            </timeline-entry>
          </el-tab-pane>
          <el-tab-pane label="我关注的人" name="followingUsers">
            <div class="empty-text" v-if="followingUsers == null || followingUsers.length == 0">
              还没有关注任何人~
            </div>

            <ul>
              <li class="user-item" v-for="(followingUser,index) in followingUsers">
                <img class="avatar-60" :alt="followingUser.name"
                     :src="$options.filters.formatAvatarUrl(followingUser.avatarUrl)">
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
  import requestByPage from '@/mixins/requestByPage'

  export default {
    name: 'UserProfileActivity',
    mixins: [requestByPage],
    data() {
      return {
        activePanel: this.panel || "questions",
        followingPanel: 'followingQuestions',
        questions: [],
        answeredQuestions: [],
        followingUsers: [],
        followingQuestions: []
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
        this.initRequestByPage({
          datasetKey: this.getCurrentPanel,
          request: this.request,
        })
      },
      request(...args) {
        let curPanel = this.getCurrentPanel();
        return this.getActivityAPI(curPanel)(this.viewingUserId, ...args);
      },
      getCurrentPanel() {
        let curPanel = this.activePanel;
        if (curPanel === 'following') {
          curPanel = this.followingPanel;
        }
        return curPanel;
      },
      getActivityAPI(panel) {
        let map = {
          questions: 'getUserQuestion',
          answeredQuestions: 'getUserAnswer',
          followingUsers: 'getFollowingUsers',
          followingQuestions: 'getFollowingQuestions',
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
    watch: {
      viewingUserId() { // 浏览的用户变化 更新activity
        this.togglePanel();
      }
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

  .info-box {
    margin-left: 10px;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-self: stretch;
  }

  .following-info {
    color: #888;
  }

  .user-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }

</style>
