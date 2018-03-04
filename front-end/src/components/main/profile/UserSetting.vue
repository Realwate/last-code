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
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        isLoading: false,
        user: {
          name: "",
          password: "",
          company: "BigBen",
          site: "https://ddd",
          description: 'f',
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
    computed: mapState([
      'userId'
    ]),
    methods: {
      save() {
        this.$refs.user.validate((valid) => {
          if (!valid) {
            return;
          }
        });
      },
    },
    created() {
      this.$store.dispatch('ChangeNavHeader', {type: 'title', title: '个人资料'})
    },
    components: {}
  }
</script>

<style scoped>
</style>
