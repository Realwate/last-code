<template>
  <div class="container main-panel">
    <el-tabs v-model="activeName" @tab-click="toggleTag">
      <el-tab-pane label="已关注标签" name="followed">
        <tag-list :tags="tags"></tag-list>
      </el-tab-pane>
      <el-tab-pane label="全部标签" name="all">
        <el-input class="search-input" @keyup.enter.native="search" v-model="keywords" size="small" placeholder="搜索">
        </el-input>
        <tag-list :tags="tags"></tag-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import TagList from './TagList'
  import NavHeader from '../NavHeader'
  import {mapGetters} from 'vuex'

  export default {
    name: 'TagManagement',
    data() {
      return {
        activeName: "followed",
        keywords:"",
        tags: [],
      }
    },
    computed: {
      ...mapGetters([
        'loggedInUserId'
      ]),
    },
    methods: {
      async search(){
        if(this.keywords.trim() === ""){
          return;
        }
        this.tags = await this.$api.searchTag(this.keywords);
      },
      async toggleTag() {
        let res;
        if (this.activeName === 'all') {
          res = await this.$api.getAllTag();
        } else {
          res = await this.$api.getTagByUser(this.loggedInUserId);
        }
        this.tags = res;
      },
    },
    created() {
      this.$on('update:tag', ({tag, index}) => {
        this.$set(this.tags, index, tag)
      });
      this.$store.dispatch('ChangeNavHeader', {type: 'title', title: '标签管理'})
    },
    activated(){
      this.toggleTag();
    },
    components: {
      TagList, NavHeader
    },
  }
</script>
<style scoped>
.search-input{
  margin-left: 20px;
  width: 200px;
  margin-bottom: 20px;
}
</style>


