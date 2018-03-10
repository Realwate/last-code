<template>
  <div class="main-panel pd30 container">
    <el-row type="flex" justify="center">
      <el-col :xs="20" :sm="16" :md="12">
        <el-form ref="user" :model="user" label-width="80px">
          <el-form-item label="头像">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input auto-complete="off" type="password" v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item label="工作地">
            <el-input v-model="user.company"></el-input>
          </el-form-item>
          <el-form-item label="个人主页">
            <el-input v-model="user.site"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="textarea" v-model="user.description"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        isLoading: false,
        user: {},
        rules: {
          /*对应prop*/
          name: [{
            required: true, message: "请输入账号", trigger: "blur"
          }],
          password: [{
            required: true, message: "请输入密码", trigger: "blur"
          }],
        }
      }
    },
    computed: mapGetters([
      'loggedInUserId'
    ]),
    methods: {
      save() {
        this.$refs.user.validate(async (valid) => {
          if (!valid) {
            return;
          }
          await this.$api.updateUserProfile(this.loggedInUserId,this.user);
          this.alertSuccess('更新成功！');
          setTimeout(()=>{
            this.$router.push({name:'userProfile',params:{userId:this.user.id}})
          },800)
        });
      },
    },
    async created() {
      this.$store.dispatch('ChangeNavHeader', {type: 'title', title: '个人资料'});
      this.user = await this.$api.getUserProfile(this.loggedInUserId);
    },
    components: {}
  }
</script>

<style scoped>
</style>
