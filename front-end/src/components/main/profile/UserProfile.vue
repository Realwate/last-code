<template>
  <div class="main">
    <nav-header>
      <template slot="title">
        主页
      </template>
    </nav-header>
    <main>
      <div class="container panel profile-header">
        <el-row type="flex" :gutter="20">
          <el-col :xs="8" :md="4">
            <div class="user-avatar-wrapper">
              <img class="user-avatar" :src="user.avatarUrl" alt="">
            </div>
          </el-col>
          <el-col :xs="16" :md="8">
            <h1 class="user-name" v-text="user.name"></h1>
            <div class="user-info">
              <div class="user-com"> 工作地：<span v-text="user.company"></span></div>
              <div class="user-site"> 个人主页： <a v-text="user.site" :href="user.site"></a></div>
              <div class="action-button">
                <div v-if="user.isSelf">
                  <el-button size="mini" plain type="primary" @click="toUserEdit">编辑</el-button>
                </div>
                <div v-else-if="user.hasFollowed">
                  <el-button type="primary" @click="cancelFolloweUser">取消关注</el-button>
                </div>
                <div v-else>
                  <el-button plain type="primary" @click="followUser">关注</el-button>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :md="12">
            <div class="user-desc" v-text="user.description">

            </div>
          </el-col>
        </el-row>
      </div>
      <div class="flex-container">
        <div class="profile-main panel">
          <el-tabs v-model="activePanel" @tab-click="togglePanel">
            <el-tab-pane label="提问" name="question">
            </el-tab-pane>
            <el-tab-pane label="回答" name="answer">
            </el-tab-pane>
            <el-tab-pane label="关注" name="follow">

            </el-tab-pane>
          </el-tabs>
        </div>
        <aside class="profile-sidebar panel">
          <div>
            关注了 <strong v-text="user.followingCount"></strong>
          </div>
          <div class="follower">
            关注者 <strong v-text="user.followerCount"> </strong>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>
<script>
  import NavHeader from '../NavHeader'
  export default {
    data() {
      return {
        activePanel: 'question',
        user: {
          avatarUrl: 'https://sfault-avatar.b0.upaiyun.com/364/787/3647877757-58c236fe63c80_huge256',
          name: 'Realwate',
          company: 'Realwate',
          site: 'Realwate',
          description: '我命由我不由天',
          followingCount: 877,
          followerCount: 812,
          isSelf:true,
        }
      }
    },
    methods: {
      togglePanel() {

      },
      toUserEdit() {
        this.$router.push({name:'userSetting'})
      },
      cancelFolloweUser() {

      },
      followeUser() {
      },
    },
    created(){
      let {panel} = this.$route.query;
      if(panel){
        this.activePanel = panel;
      }
    },
    components:{
      NavHeader
    }

  }
</script>
<style scoped>
  .flex-container {
    align-items: flex-start;
  }

  .profile-header {
    margin-bottom: 10px;
  }

  .profile-main {
    padding-left: 20px;
    flex: 1;
  }

  .user-avatar {
    width: 100%;
    border-radius: 4px;
  }

  .user-name {
    margin: 10px 0;
  }
  .action-button{
    margin:5px 0 0 10px;
  }

  .user-desc {
    border-radius: 5px;
    padding: 20px;
    background-color: #dcdcdc;
    font-size: 15px;
    overflow: auto;
    height: 100%;
    box-sizing: border-box;
  }

  .profile-sidebar {
    width: 160px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 15px;
  }

  .follower {
    border-left: 1px solid #ccc;
  }
</style>
