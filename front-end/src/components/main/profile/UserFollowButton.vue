<template>
  <div>
    <div v-if="user.hasFollowed">
      <el-button class="user-action-button" size="mini" type="primary" @click="removeUserFollower">取消关注
      </el-button>
    </div>
    <div v-else-if="user.hasFollowed === false">
      <el-button class="user-action-button" size="mini" plain @click="addUserFollower">关注</el-button>
    </div>
  </div>

</template>
<script>

  export default {
    name: 'UserFollowButton',
    data() {
      return {}
    },
    props: ['user', 'index'], // 可能是数组user 更新需要index
    methods: {
      async removeUserFollower() {
        let removedUserId = this.user.id;
        let res = await this.$api.removeUserFollower(removedUserId);
        let user = Object.assign({}, this.user, {
          hasFollowed: false,
          followerCount: this.user.followerCount - 1
        });
        this.updateUser(user);
      },
      async addUserFollower() {
        let toFollowedUserId = this.user.id;
        let res = await this.$api.addUserFollower(toFollowedUserId);
        let user = Object.assign({}, this.user, {
          hasFollowed: true,
          followerCount: this.user.followerCount + 1
        });
        this.updateUser(user);
      },
      updateUser(user) {
        this.$emit('update:user', user, this.index)// sync只接受user
      },
    },
    created(){
    }
  }
</script>
<style scoped>


</style>
