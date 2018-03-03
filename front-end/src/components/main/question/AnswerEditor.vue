<template>
      <el-input
        type="textarea"
        @input="handleInput"
        :autosize="{ minRows: 5}"
        placeholder="请输入内容">
      </el-input>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      handleInput(val){
        this.$emit('input',val);
      }
    },
    components: {},
  }
</script>
<style scoped>
</style>


