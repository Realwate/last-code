<template>
  <div>
    <nav-header></nav-header>
    <div class="container panel">
      <div class="question-header section-block">
        <div class="clearfix title-wrapper">
          <span class="question-icon">问</span>
          <h1 class="title">移动端适配问题?</h1>
        </div>

        <div class="info">
          <tag-inline-list :tags="question.tags"></tag-inline-list>
          <router-link class="author" :to="{name:'userProfile',params:{userId:question.author.id}}"
                       v-text="question.author.name"></router-link>
          <div class="date">
            <span v-text="$util.formatDate(question.createdAt)"></span>提问
          </div>
        </div>
      </div>
      <div class="section-block content-block">
        <vote :voteCount="question.voteCount"></vote>
        <div class="content-box" v-html="question.content"></div>
      </div>
      <div class="answer-box">
        <h4 class="box-title">
          <span v-text="question.answers.length"></span> 个回答
        </h4>

        <ul v-if="question.answers.length > 0">
          <li class="content-block section-block" v-for="answer in question.answers">
            <vote :voteCount="answer.voteCount"></vote>
            <div class="content-box">
              <div class="answer-content" v-html="answer.content"></div>
              <div class="answer-bottom clearfix">
                <div class="date fl">
                  <router-link class="answer-author" :to="{name:'userProfile',
                params:{userId:answer.author.id}}" v-text="answer.author.name">
                  </router-link>
                  <span v-text="$util.formatDate(answer.createdAt)"></span> 回答 </div>
                <div class="user fr">

                </div>
              </div>
            </div>
          </li>
        </ul>

      </div>
      <div class="write-box">
        <h4 class="box-title">撰写答案</h4>
        <answer-editor v-model="answer"></answer-editor>
        <el-button class="answer-btn" size="medium" type="primary">提交回答</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import TagInlineList from '../question/TagInlineList'
  import Vote from './Vote'
  import AnswerEditor from './AnswerEditor'
  import NavHeader from '../NavHeader'

  export default {
    data() {
      return {
        question: {
          voteCount: 4, content: 'faaaaaaaaaaaaa不知道',
          id: 'fff', author: {id: 'qwe', name: 'aa'}, createdAt: 1519509611477,
          title: "如何学习javascript?", answers: [{
            author: {name: 'Realwate', id: 'da'}, id: 'ad',
            voteCount: 43, content: 'qhqiwop'
          }],
          tags: [{id: 'g', name: '前端'}, {id: 'gf', name: 'javascipt'},]
        },
        answer: ''
      }
    },
    methods: {},
    created() {
      let {questionId} = this.$route.params;

    },
    components: {
      TagInlineList, Vote, AnswerEditor,NavHeader
    },
  }
</script>
<style scoped>
  .panel {
    padding: 10px 20px 20px;
  }

  .question-icon {
    color: #0084ff;
    border: 1px solid #0084ff;
    border-radius: 50%;
    float: left;
    font-size: 16px;
    margin-right: 8px;
    width: 32px;
    height: 32px;
    box-sizing: border-box;
    line-height: 32px;
    text-align: center;
  }

  .title-wrapper {
    margin-bottom: 10px;
  }

  .title {
    font-weight: normal;
    font-size: 20px;
  }

  .author {
    font-size: 18px;
    margin: 0 3px 0 15px;
    text-decoration: none;
    color: #333;
  }

  .author:hover {
    text-decoration: underline;
  }

  .date {
    display: inline-block;
    color: #888;
  }

  .section-block {
    padding: 12px 0;
    border-bottom: 1px solid #ccc;
  }

  .content-block {
    min-height: 100px;
  }

  .content-box {
    padding: 15px;
    margin-left: 50px;
  }

  .answer-btn {
    margin-top: 5px;
  }

  .box-title {
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 10px;
    padding: 10px 0;
    border-bottom:2px solid #ccc;
  }
  .answer-content{
    margin-bottom: 10px;
  }
  .write-box {
    margin-top: 20px;
  }

</style>


