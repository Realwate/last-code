<template>
  <div class="container main-panel pd20">
    <div class="question-header bb1">
      <div class="clearfix mb10">
        <span class="question-icon">问</span>
        <h1 class="lg-font" v-text="question.title"></h1>
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
    <div class="question-detail section-block">
      <vote :voteCount="question.voteCount"></vote>
      <div class="content-wrapper" v-html="question.content"></div>
    </div>
    <div class="answer-area">
      <h4 class="area-title">
        <span v-text="question.answers.length"></span> 个回答
      </h4>

      <ul v-if="question.answers.length > 0">
        <li class=" section-block" v-for="answer in question.answers">
          <vote :voteCount="answer.voteCount"></vote>
          <div class="content-wrapper">
            <div v-html="answer.content"></div>
          </div>
          <div class="answer-bottom">
            <div class="dib">
              <!--<img class="avatar-32" :src="answer.author.avatarUrl" alt="">-->
              <router-link class="author" :to="{name:'userProfile',
                params:{userId:answer.author.id}}" v-text="answer.author.name">
              </router-link>
            </div>
            <div class="date dib">
              <span v-text="$util.formatDate(answer.createdAt)"></span>回答
            </div>
          </div>

        </li>
      </ul>
    </div>
    <div class="mt10">
      <h4 class="area-title">撰写答案</h4>
      <answer-editor v-model="answer"></answer-editor>
      <el-button class="mt10" size="medium" type="primary">提交回答</el-button>
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
      this.$store.dispatch('ChangeNavHeader')
      let {questionId} = this.$route.params;
    },
    components: {
      TagInlineList, Vote, AnswerEditor
    },
  }
</script>
<style scoped>
  .question-header {
    padding-bottom: 10px;
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
    padding: 20px 0 10px;
    min-height: 100px;
    border-bottom: 1px solid #ccc;
    position: relative;
  }

  .question-detail {
    border-bottom: none;
  }

  .content-wrapper {
    margin-left: 70px;
    font-size: 14px;
  }

  .area-title {
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  .answer-bottom{
    position: absolute;
    right: 10px;
    bottom: 2px;
  }

</style>


