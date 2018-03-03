<template>
<div>
  <main-header></main-header>
  <router-view>
  </router-view>
</div>
</template>
<script>
import MainHeader from './MainHeader'
  export default {
    data(){
      return {
      }
    },
    components:{
      MainHeader
    }
  }
</script>

