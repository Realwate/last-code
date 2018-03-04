<template>
  <div class="nav-header panel">
    <div class="container">
      <div v-if="navHeader.type === 'title'">
        <h3 class="nav-header-title">
          {{navHeader.title}}
        </h3>
      </div>
      <div v-else-if="navHeader.tags">
        <tag-inline-list :tags="navHeader.tags">
          <span class="follow" slot="before">我关注的:</span>
        </tag-inline-list>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import TagInlineList from './question/TagInlineList'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState([
        'userId', 'navHeader'
      ]),
    },
    components: {
      TagInlineList
    }

  }
</script>
<style scoped>
  .nav-header {
    padding: 7px 5px 5px;
    height: 40px;
    box-sizing: border-box;
    background: rgba(255,255,255,.9);
  }

  .nav-header-title {
    font-size: 15px;
    padding-left: 20px;
    font-weight: normal;
    text-align: center;
    color: #0084ff;
  }

  .follow {
    font-size: 15px;
    color: #888;
    margin-right: 15px;
  }
</style>


