<template>
  <div class="nav-header panel">
    <div class="container nav-header-content">
      <div v-show="navHeader.type === 'title'">
        <h3 class="nav-header-title">
          {{navHeader.title}}
        </h3>
      </div>
      <div v-show="navHeader.type == null">
        <div v-if="navHeader.tags && navHeader.tags.length">
          <tag-inline-list :tags="navHeader.tags">
            <span class="follow" slot="before">我关注的:</span>
          </tag-inline-list>
        </div>
        <div v-else>
          暂未关注任何标签，点击前往 <router-link class="link" :to="{name:'tagManagement'}">标签管理</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState,mapGetters} from 'vuex'
  import TagInlineList from './question/TagInlineList'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['loggedInUserId',]),
      ...mapState([
         'navHeader'
      ]),
    },
    components: {
      TagInlineList
    }

  }
</script>
<style scoped>
  .nav-header {
    padding: 5px;
    height: 35px;
    box-sizing: border-box;
    background: rgba(255,255,255,.9);
  }
  .nav-header-content{
    max-height:25px;
    overflow: hidden;
  }
  .nav-header-title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #555;
  }

  .follow {
    font-size: 15px;
    color: #888;
    margin-right: 15px;
  }
</style>


