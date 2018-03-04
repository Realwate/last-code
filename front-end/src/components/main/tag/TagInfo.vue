<template>
  <div>
    <div class="info-box">
      <div class="follow"><span v-text="tag.followerCount"></span>关注 </div> &nbsp;
      <div class="question"><span v-text="tag.questionCount"></span>问答 </div>
    </div>
    <div class="action-box">
      <el-button class="login-button" v-if="tag.isFollowed" type="primary" size="small" @click="cancelFollowTag">
        已关注
      </el-button>
      <el-button v-else plain type="primary" size="small" @click="followTag">
        关注
      </el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      followTag() {
      },
      cancelFollowTag() {
      }
    },
    props: ['tag'],
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


