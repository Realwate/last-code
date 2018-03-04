<template>
<div class="clearfix">
  <page-header></page-header>
  <div class="main">
    <router-view>
    </router-view>
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

