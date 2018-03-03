<template>
  <header>
    <div class="panel nav-header">
      <div class="container">
        <div v-if="$slots.title">
          <h3 class="nav-header-title">
            <slot name="title"></slot>
          </h3>
        </div>
        <div v-else>
          <tag-inline-list :tags="tags">
            <span class="follow" slot="before">我关注的:</span>
          </tag-inline-list>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
  import {mapState} from 'vuex'
  import TagInlineList from './question/TagInlineList'

  export default {
    data() {
      return {
        tags: []
      }
    },
    computed: {
      ...mapState([
        'userId'
      ]),
      showFollowTag() {
        return !this.$slots.title;
      }
    },
    methods: {},
    created() {
      if (this.showFollowTag) {
        this.tags = [{id: 'ff', name: 'javasciprt'}, {id: 'faf', name: 'Spring'},]
      }
    },
    components: {
      TagInlineList
    }

  }
</script>
<style scoped>
  .nav-header {
    margin-bottom: 8px;
  }
  .panel{
    padding: 7px;
  }
  .nav-header-title {
    font-size: 15px;
    padding-left: 20px;
    font-weight:normal;
    text-align: center;
    color: #0084ff;
  }
  .follow {
    font-size: 15px;
    color: #888;
    margin-right: 15px;
  }
</style>


