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
  import requestByPage from '@/mixins/requestByPage'

  export default {
    name: 'TagManagement',
    mixins: [requestByPage],
    data() {
      return {
        activeName: "followed",
        keywords: "",
        tags: [],
      }
    },
    computed: {
      ...mapGetters([
        'loggedInUserId'
      ]),
    },
    methods: {
      async search() {
        if (this.keywords.trim() === "") {
          return;
        }
        this.initRequestByPage({
          datasetKey: 'tags',
          request: function (...args) {
            return this.$api.searchTag(this.keywords, ...args)
          },
        })
      },
      request(...args) {
        if (this.activeName === 'all') {
          return this.$api.getAllTag(...args);
        } else {
          return this.$api.getTagByUser(this.loggedInUserId, ...args);
        }
      },
      async toggleTag() {
        this.initRequestByPage({
          datasetKey: 'tags',
          request: this.request,
        })
      },
    },
    created() {
      let activeName = this.$route.params.activeName;
      if(activeName){
        this.activeName = activeName;
      }
      this.toggleTag();
      this.$on('update:tag', ({tag, index}) => {
        this.$set(this.tags, index, tag)
      });
      this.$store.dispatch('ChangeNavHeader', {type: 'title', title: '标签管理'})
    },
    activated() {

    },
    components: {
      TagList, NavHeader
    },
  }
</script>
<style scoped>
  .search-input {
    margin-left: 20px;
    width: 200px;
    margin-bottom: 20px;
  }
</style>


