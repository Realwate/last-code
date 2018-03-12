<template>
  <div class="container pd30 main-panel">
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <el-form ref="question" :model="question" label-width="80px">
          <el-form-item label="标题">
            <el-input class="title-input" autofocus v-model="question.title"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-tag v-for="tag in question.tags" :disable-transitions="true"
                    :key="tag.id" type="small" @close="removeTag(tag)"
                    closable>
              {{tag.name}}
            </el-tag>
            <el-autocomplete
              :value-key="'name'"
              :fetch-suggestions="queryTags"
              placeholder="请选择标签"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="内容">
            <answer-editor v-model="question.content"></answer-editor>
          </el-form-item>

          <el-form-item style="text-align: center">
            <el-button type="primary" size="medium" @click="save">提 交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import AnswerEditor from './AnswerEditor'
  import NavHeader from '../NavHeader'

  export default {
    data() {
      return {
        selectedTag: {},
        question: {
          title: '',
          tags: [],
          content: ''
        },
        allTags: null,
      }
    },
    methods: {
      queryTags(queryString, cb) {
        let results = this.allTags;
        if (queryString) {
          results = results.filter((tag) => tag.name.includes(queryString));
        }
        cb(results);

      },
      handleSelect(item) {
        let name = item.name;
        if (this.selectedTag[name] != null) { // 已存在
          return;
        }
        let len = this.question.tags.push({id:item.id,name:item.name});
        this.selectedTag[name] = len - 1; // name,index
      },
      removeTag(item) {
        let name = item.name;
        let index = this.selectedTag[name];
        this.selectedTag[name] = null;
        this.question.tags.splice(index, 1)
      },
      async save() {
        let res = await this.$api.saveQuestion(this.question);
        this.alertSuccess('发布成功!');
        await this.$util.sleep();
        this.$router.push({name:'questionDetail',params:{questionId:res.id}})
      },
    },
    async created() {
      this.$store.dispatch('ChangeNavHeader', {type: 'title', title: '提问'})
      this.allTags = await this.$api.getAllTag();

    },
    components: {
      AnswerEditor
    },
  }
</script>
<style scoped>
  .title-input {
    font-size: 18px;
  }

  .el-tag+.el-tag {
    margin-left: 10px;
  }
</style>


