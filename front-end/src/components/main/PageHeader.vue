<template>
  <header v-bind="$props" class="page-header shadow">
    <div ref="mainHeader" class="main-header">
      <div class="flex-container">
        <router-link class='logo hidden-xs-only' :to="{name:'timeline'}">
          <i class="fa fa-cube"></i> CC
        </router-link>
        <router-link class='small-logo hidden-sm-and-up' :to="{name:'timeline'}">
          <i class="fa fa-home"></i>
        </router-link>
        <nav class="main-nav flex1">
          <ul class="nav-list">
            <li class="flex1 hidden-xs-only"></li>
            <li class="nav-item search" :class="{'is-focus':searchFocus}">
              <el-input @keyup.enter.native="search" @blur="searchFocus=false" @focus="searchFocus=true"
                        v-model="keywords" size="small" placeholder="搜索">
                <i slot="suffix" class="el-icon-search" @click="search"></i>
              </el-input>
            </li>
            <li class="nav-item ask">
              <el-button type="primary" size="small" @click="ask">提问</el-button>
            </li>
            <li class="nav-item notification" @click="toNotification">
              <el-badge  :value="loggedInUser.notificationCount" :max="99">
                <i class="el-icon-bell"></i>
              </el-badge>
            </li>
            <li class="nav-item menu">
              <el-dropdown trigger="click">
                <img :src="$options.filters.formatAvatarUrl(loggedInUser.avatarUrl)"
                     class="el-dropdown-link avatar-40" alt="">
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="toUserProfile">我的主页</el-dropdown-item>
                  <el-dropdown-item @click.native="toTag">标签管理</el-dropdown-item>
                  <el-dropdown-item @click.native="toSetting">设置</el-dropdown-item>
                  <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <nav-header>
    </nav-header>
  </header>
</template>
<script>
  import {mapGetters, mapState} from 'vuex'
  import NavHeader from './NavHeader'

  export default {
    data() {
      return {
        searchFocus: false,
        keywords: "",
      }
    },
    computed: {
      ...mapGetters([
        'loggedInUserId',
      ]),
      ...mapState(['loggedInUser'])
    },
    methods: {
      toUserProfile() {
        this.$router.push({name: 'userProfile', params: {userId: this.loggedInUserId}})
      },
      toTag() {
        this.$router.push({name: 'tagManagement'})
      },
      toSetting() {
        this.$router.push({name: 'userSetting'})
//        this.$router.push({name: 'signup'})
      },
      ask() {
        this.$router.push({name: "questionAsk"})
      },
      logout() {
        this.$store.dispatch('UserLogout');
      },
      search() {
        this.$router.push({name: "questionSearch", query: {keywords: this.keywords}})
      },
      async toNotification() {
        // 点击清零
        this.$store.commit('USER_CHANGE', Object.assign({}, this.loggedInUser, {notificationCount: 0}));
        this.$router.push({name: "userNotification"})
      },
      created() {
      }
    },
    components: {
      NavHeader
    }

  }
</script>
<style scoped>
  .page-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2001;
  }

  .main-header {
    height: 60px;
    background: #fff;
    border-bottom: 1px solid #dfdfdf;
  }

  .logo {
    height: 40px;
    color: #333;
    font-size: 32px;
    text-decoration: none;
  }
  .small-logo{
    color: #555;
    margin-left: 10px;
    font-size: 28px;
    text-decoration: none;
  }

  .menu .nav-icon:hover {
    color: #333;
  }

  .search {
    flex: 0 0 25%;
    transition: all 0.1s ease-in;
  }

  .search.is-focus {
    flex: 0 0 40%;
  }

  .notification {
    padding: 0 5px;
    font-size: 24px;
  }

  .ask {
    margin-right: 20px;
  }

  .el-icon-search {
    width: 24px;
    height: 24px;
    font-size: 24px;
    margin-top: 4px;
  }
</style>


