<template>
  <div>
    <div class="info-box">
      <div class="follow"><span v-text="tag.followerCount"></span>关注 </div> &nbsp;
      <div class="question"><span v-text="tag.itemCount"></span>问答 </div>
    </div>
    <div class="action-box">
      <el-button class="login-button" v-if="tag.hasFollowed" type="primary" size="small" @click="cancelFollowTag">
        已关注
      </el-button>
      <el-button v-else plain size="small" @click="followTag">
        关注
      </el-button>
    </div>
  </div>
</template>
<script>
  import Emitter from '@/mixins/emitter'

  export default {
    mixins: [Emitter],
    data() {
      return {}
    },
    methods: {
      async followTag() {
        let newTag = await this.$api.tagAddFollower(this.tag.id);
        this.changeTag(newTag);
      },
      async cancelFollowTag() {
        let newTag = await this.$api.tagRemoveFollower(this.tag.id);
        this.changeTag(newTag);
      },
      changeTag(newTag) {
        if (this.index === undefined) {
          this.dispatch('TagDetail', 'update:tag', {tag: newTag});
        } else {
          this.dispatch('TagManagement', 'update:tag', {tag: newTag, index: this.index});
        }

      }
    },
    props: ['tag', 'index'],
    created() {

    },
  }
</script>
<style scoped>
  .info-box {
    display: flex;
    justify-content: center;
    margin: 5px 0;
    color: #888;
  }
</style>


