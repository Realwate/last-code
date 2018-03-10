<template>
  <a class="small-author" target="_blank"
     :href="$router.resolve({name:'userProfile',params:{userId:user.id}}).href">
    {{user.name}}
  </a>
</template>
<script>

  export default {
    name: 'UserLink',
    data() {
      return {}
    },
    props: ['user'],

  }
</script>
<style scoped>

</style>
