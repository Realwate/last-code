<template>
  <header class="main-header">
    <div class="container">
      <router-link class='logo' :to="{name:'timeline'}">
        <i class="fa fa-cube"></i> CC
      </router-link>
      <nav class="main-nav">
        <ul class="nav-list">
          <li class="main-nav"></li>
          <li class="nav-item search">
            <el-input v-model="keywords" size="small" placeholder="搜索">
              <i slot="suffix" class="el-icon-search" @click="search"></i>
            </el-input>
          </li>
          <li class="nav-item ask">
            <el-button type="primary" size="small" >提问</el-button>
          </li>
          <li class="nav-item notification">
            <el-badge :value="notificationCount" :max="10">
              <i class="fa fa-bell" @click="showNotification"></i>
            </el-badge>
          </li>
          <li class="nav-item menu">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link"><i class='nav-icon fa fa-user-circle'></i>  </span>
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
  </header>
</template>
<script>

  export default {
    data() {
      return {
        keywords: "",
        notificationCount: 99,
      }
    },
    methods: {
      toUserProfile() {
        this.$router.push({name:'userProfile'})
      },
      toTag() {
        this.$router.push({name:'tagManagement'})
      },
      toSetting() {
        this.$router.push({name:'setting'})
      },
      logout() {
        this.$store.dispatch('UserLogout');
      },
      search() {

      },
      showUserDropDown() {

      },
      showNotification() {

      },
    },
    created() {
    }

  }
</script>
<style scoped>
  .main-header {
    height: 65px;
    background: #fff;
    box-shadow: 1px 1px 3px rgba(200, 200, 200, 0.4);
  }
  .main-nav {
    flex: 1;
  }
  .logo {
    height: 40px;
    color: #333;
    font-size: 32px;
    text-decoration: none;
  }
  .menu .nav-icon:hover {
    color: #333;
  }
  .search {
    flex: 0 0 30%;
  }
  .notification{
    font-size: 24px;
  }
  .ask{
    margin-right: 20px;
  }
  .el-icon-search {
    width: 24px;
    height: 24px;
    font-size: 24px;
    margin-top: 4px;
  }
</style>


