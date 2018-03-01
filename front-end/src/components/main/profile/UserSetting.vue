<template>
  <el-row  type="flex" justify="center">
    <el-col :xs="20" :sm="16" :md="12">

      <el-form class="signup-form" ref="user" :model="user" label-width="80px">
        <h2>个人资料</h2>
        <el-form-item label="昵称">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password"></el-input>
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
        <el-form-item>
          <el-button type="primary" @click="signup">注册</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        isLoading: false,
        user: {
          name: "",
          password: ""
        },
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
    methods: {
      signup() {
        this.$refs.user.validate((valid) => {
          if (!valid) {
            return;
          }


          this.$router.push({name: 'login'});
        });

      },
    }
  }
</script>

<style scoped>
.signup-form{
  background-color: #fff;
  border: 1px solid #339dff;
  margin-top: 50px;
}
</style>
