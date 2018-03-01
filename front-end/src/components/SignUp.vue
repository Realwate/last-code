<template>
  <el-row type="flex" justify="center">
    <el-col :xs="18" :sm="10" :md="8">
      <el-form class="login-form" :model="user" :rules="rules" ref="user" v-loading="isLoading" label-position="left"
               label-width="70px" element-loading-text="正在注册...">
        <h2 class="title">注册</h2>

        <el-form-item prop="name" label="帐号">
          <el-input type="text" v-model="user.name" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>


        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="primary" style="width:100%;" @click="handleSubmit">注册</el-button>
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
      handleSubmit() {
        //找到user el-form组件实例 调用验证方法
        this.$refs.user.validate((valid) => {
            if (!valid) {
              return;
            }
            this.isLoading = true;

            this.$api.signup(this.user)
              .then(({success, error}) => {//返回对象中的data为真实返回结果
                if (!success) {
                  //登录失败
                  this.alertError(error.message)
                  this.isLoading = false;
                  return;
                }
                this.alertSuccess('注册成功！')
                setTimeout(()=>{
                  this.$router.push({name: 'login'});
                },1500);
              })
              .catch((e) => {   //登录失败
                this.alertError(e.message)
                this.isLoading = false;
              })  //api login end
          }
        )
        ;

      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/var";
  .title {
    text-align: center;
    margin-bottom: 20px;
  }

  .login-form {
    /*width: 400px;*/
    padding: 20px 30px;
    border: 1px solid $--color-primary-light-1;
    border-radius: 5px;
    margin: 130px auto;
    background-color: #f9fafc;
  }
</style>
