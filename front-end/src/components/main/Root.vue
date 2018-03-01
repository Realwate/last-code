<template>
<div>
  <the-header></the-header>
  <router-view>
  </router-view>
</div>
</template>
<script>
import TheHeader from './TheHeader'
  export default {
    data(){
      return {

      }
    },
    components:{
      TheHeader
    }
  }
</script>

