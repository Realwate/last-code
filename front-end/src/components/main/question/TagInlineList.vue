<template>
  <ul class="tag-inline-list" >
    <li class="item"><slot name="before"></slot></li>
    <li class="item tag-inline" v-for="tag in tags" :key="tag.id" @click="toTagDetail(tag.id)" v-text="tag.name"></li>
    <li class="item"><slot name="after"></slot></li>
  </ul>

</template>
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      toTagDetail(tagId){
        this.$router.push({path:`/tag/${tagId}`})
      },
    },
    props:['tags'],

  }
</script>
<style scoped>
  .tag-inline-list{
    display: inline-block;
  }
  .item{
    display: inline-block;
  }
  .tag-inline{
    cursor: pointer;
    padding: 2px 3px;
    color: #409eff;
    border-radius: 2px;
    background-color: rgba(64,158,255,.1);
  }
  .tag-inline+.tag-inline{
    margin-left: 5px;
  }
  .tag-inline:hover {
    background-color: rgba(64, 158, 255, .3);
  }

</style>
