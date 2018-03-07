<template>
  <el-row type="flex" justify="center">
    <el-col :xs="18" :sm="10" :md="8">
      <el-form class="login-form" :model="user" :rules="rules" ref="user" v-loading="isLoading" label-position="left"
               label-width="70px" element-loading-text="正在登录...">
        <h2 class="title">登录</h2>

        <el-form-item prop="name" label="帐号">
          <el-input type="text" v-model="user.name" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>


        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <span style="color:#888;float:right;"> 还没有账号? <el-button @click="toSignUp" type="text">注册</el-button> </span>

        </el-form-item>
        <el-form-item>
          <el-button class="login-button" type="primary" style="width:100%;" @click="handleSubmit">登录</el-button>
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
        checked: !!this.$util.getCookie("checked"),
        user: {
          name: this.$util.getCookie("name") || "",
          password: this.$util.getCookie("password") || ""
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
    created() {
      if (this.$route.query.redirect) {
        this.$router.replace({name: "login"});
        this.alertError('请先登录!')
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

          // 如果正确 返回token 保存到 localstorage
          this.$api.login(this.user)
            .then((data) => {//返回对象中的data为真实返回结果
              this.isLoading = false;
              if (this.checked) {
                let user = this.user;
                //将date设置为10天以后的时间
                let expireDays = 10;
                //将userId和name两个cookie设置为10天后过期
                let date = new Date((Date.now() + expireDays * 24 * 3600 * 1000));
                this.$util.setCookie('name', user.name, date);
                this.$util.setCookie('password', user.password, date);
                this.$util.setCookie('checked', true, date);
              }
              // 存储token到vuex
              this.$store.dispatch('UserLogin', data);
              this.$router.push({path: '/'});
            })
            .catch(() => {   //登录失败
              this.isLoading = false;
            })  //api login end

        });
      },
      toSignUp() {
        this.$router.push({name: 'signup'});
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
    padding: 20px 30px;
    border: 1px solid $--color-primary-light-1;
    border-radius: 5px;
    margin: 130px auto;
    background-color: #f9fafc;
  }
</style>
