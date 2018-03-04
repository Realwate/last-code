<template>
    <div class="container main-panel">
      <el-tabs v-model="activeName" @tab-click="toggleTag">
        <el-tab-pane label="已关注标签" name="followed">
          <tag-list :tags="followedTags"></tag-list>
        </el-tab-pane>
        <el-tab-pane label="全部标签" name="all">
          <tag-list :tags="allTags"></tag-list>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>
  import TagList from './TagList'
  import NavHeader from '../NavHeader'
  export default {
    data() {
      return {
        activeName: "followed",
        allTags: [
          {
            id:'f4',isFollowed:true,name:'javascript',
            iconUrl:'/assets/image/user-default.png',
            followerCount:10,questionCount:45
          },
          {
            id:'f3',isFollowed:true,name:'javascript',
            iconUrl:'/assets/image/user-default.png',
            followerCount:10,questionCount:45
          },
          {
            id:'f2',isFollowed:false,name:'javascript',
            iconUrl:'/assets/image/user-default.png',
            followerCount:10,questionCount:45
          },
          {
            id:'f1',isFollowed:true,name:'javascript',
            iconUrl:'/assets/image/user-default.png',
            followerCount:10,questionCount:45
          },
          {
            id:'f',isFollowed:true,name:'javascript',
            iconUrl:'/assets/image/user-default.png',
            followerCount:10,questionCount:45
          },
          ],
        followedTags: [ {
          id:'fa',isFollowed:true,name:'javascript',
          iconUrl:'/assets/image/user-default.png',
          followerCount:10,questionCount:45
        },]
      }
    },
    methods: {
      toggleTag() {
//        this.activeName;
      },
    },
    created() {
      this.$store.dispatch('ChangeNavHeader',{type:'title',title:'标签管理'})
    },
    components: {
      TagList,NavHeader
    },
  }
</script>
<style scoped>

</style>


