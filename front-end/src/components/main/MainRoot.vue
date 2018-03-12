<template>
  <div class="clearfix bg">
    <page-header></page-header>
    <div class="main">
      <keep-alive include="TagManagement,Timeline">
        <router-view>
        </router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  import store from '@/store'
  import PageHeader from './PageHeader'

  export default {
    data() {
      return {}
    },
    async beforeRouteEnter(to, from, next) {
      await store.dispatch('GetLoggedInUser');
      next();
    },
    components: {
      PageHeader
    }
  }
</script>
<style>
  .bg {
    background-color: #f9f9f9;
  }
</style>

