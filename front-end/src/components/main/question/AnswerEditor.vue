<template>
  <div class="answer-editor">
    <div class="editor-toolbar">
      <i title="预览" class="el-icon-view tool" @click="togglePreview" v-show="!showPreview"></i>
      <i title="返回" class="el-icon-back tool" @click="togglePreview" v-show="showPreview"></i>
    </div>
    <el-input v-show="!showPreview"
              class="raw-text"
              type="textarea"
              @input="debounceInput"
              placeholder="输入markdown内容，点击右上角预览">
    </el-input>
    <div v-show="showPreview" class="markdown-body markdown-text"
         v-highlight v-html="markdownText"></div>
  </div>

</template>
<script>
  import marked from 'marked'

  export default {
    data() {
      return {
        showPreview: false,
        markdownText: '',
        debounceInput: this.$util.debounceFn(this.handleInput, 1000)
      }
    },
    methods: {
      togglePreview() {
        this.showPreview = !this.showPreview;
      },
      handleInput(val) {
        this.markdownText = marked(val, {sanitize: true})
        this.$emit('input', this.markdownText)
      }
    },
    components: {},
  }
</script>
<style scoped>
  .answer-editor {
    position: relative;
    padding-top: 30px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .editor-toolbar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    border-bottom: 1px solid #ccc;
    background: rgba(230, 230, 230, .3);
    font-size: 18px;
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;
    align-items: center;
  }
  .editor-toolbar .tool{
    cursor: pointer;
  }

  .markdown-text {
    padding: 10px;
    box-sizing: border-box;
    height: 200px;
    overflow: auto;
  }
</style>


