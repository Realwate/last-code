<template>
  <div class="container main-panel pd20">
    <div class="question-header bb1">
      <div class="clearfix mb10">
        <span class="question-icon">问</span>
        <h1 class="lg-font" v-text="question.title"></h1>
      </div>

      <div class="info">
        <tag-inline-list :tags="question.tags"></tag-inline-list>
        <router-link class="author" :to="{name:'userProfile',params:{userId:question.creator.id}}"
                     v-text="question.creator.name"></router-link>
        <div class="date">
          <span>{{question.createdAt | formatDate}}</span>提问
        </div>
        <div class="follower-box fr">
          <el-button class="follow-btn" @click="removeQuestionFollower" v-if="question.hasFollowed" type="primary"
                     size="mini">已关注
          </el-button>
          <el-button class="follow-btn" @click="addQuestionFollower" v-else plain size="mini">关注</el-button>
          <span> <strong v-text="question.followerCount">5</strong> 关注 </span>
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
        <li class="section-block" v-for="answer in question.answers">
          <vote :voteCount="answer.voteCount"></vote>
          <div class="content-wrapper">
            <div v-html="answer.content"></div>
          </div>
          <div class="answer-bottom">
            <div class="dib">
              <img class="avatar-28" :alt="answer.author.name"
                   :src="$options.filters.formatAvatarUrl(answer.author.avatarUrl)">
              <router-link class="author" :to="{name:'userProfile',
                params:{userId:answer.author.id}}" v-text="answer.author.name">
              </router-link>
            </div>
            <div class="date dib">
              <span>{{answer.createdAt | formatDate}}</span>回答
            </div>
          </div>

        </li>
      </ul>
    </div>
    <div class="mt10">
      <div v-if="hasAnswered">
        <h4 class="area-title">这个问题你已经提交过回答了~</h4>
      </div>
      <div v-else>
        <h4 class="area-title">撰写答案</h4>
        <answer-editor v-model="answerContent"></answer-editor>
        <el-button class="mt10" size="medium" type="primary" @click="commitAnswer">提交回答</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import TagInlineList from '../question/TagInlineList'
  import Vote from './Vote'
  import AnswerEditor from './AnswerEditor'
  import NavHeader from '../NavHeader'
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        question: {
          creator: {},
          answers: []
        },
        answerContent: ''
      }
    },
    computed: {
      ...mapGetters([
        'loggedInUserId'
      ]),
      hasAnswered() {
        return this.question.answers.map((answer) => answer.author.id).includes(this.loggedInUserId)
      }
    },
    methods: {
      async addQuestionFollower() {
        let res = await this.$api.addQuestionFollower(this.question.id);
        this.question.followerCount += 1;
        this.question.hasFollowed = true;
      },
      async removeQuestionFollower() {
        let res = await this.$api.removeQuestionFollower(this.question.id);
        this.question.followerCount -= 1;
        this.question.hasFollowed = false;
      },
      async commitAnswer() {
        let answer = {question_id: this.question.id, content: this.answerContent};
        let newAnswer = await this.$api.addAnswer(answer);
        this.question.answers.push(newAnswer);
        this.alertSuccess('发布答案成功!');
      }
    },
    async created() {
      this.$store.dispatch('ChangeNavHeader')
      let {questionId} = this.$route.params;
      this.question = await this.$api.getQuestion(questionId);
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

  .date {
    display: inline-block;
    color: #888;
  }

  .follower-box {
    margin-right: 20px;
  }

  .follow-btn {
    min-width: 55px;
    padding: 7px;
    margin-right: 3px;
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

  .answer-bottom {
    position: absolute;
    right: 10px;
    bottom: 4px;
  }

  .answer-bottom .author {
    margin: 0 3px;
  }
</style>


