<template>
<div class="clearfix bg">
  <page-header></page-header>
  <div class="main">
    <keep-alive include="TagManagement,Timeline">
    <router-view :key="$route.fullPath">
    </router-view>
    </keep-alive>
  </div>
</div>
</template>
<script>
import PageHeader from './PageHeader'
  export default {
    data(){
      return {
      }
    },
    components:{
      PageHeader
    }
  }
</script>
<style>
  .bg{
    background-color: #f9f9f9;
  }
</style>

