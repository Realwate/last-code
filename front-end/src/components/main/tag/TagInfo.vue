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
  .tag-box {
    text-align: center;
    margin-bottom: 15px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 20px 10px;

  }

  .desc a {
    text-decoration: none;
  }

  .tag-icon {
    height: 34px;
    width: 100%;
  }

  .tag-name {
    color: #333;
    font-weight: normal;
  }

  .info-box {
    display: flex;
    justify-content: center;
    margin: 5px 0;
    color: #888;
  }
</style>


