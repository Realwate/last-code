<template>
  <ul class="entry-list" >
    <li class="entry-list-item" v-for="question in questions" :key="question.id">
      <div class="meta">
        <span v-text="question.creator.name"></span> &nbsp;
        <span>{{question.createdAt | formatDate}}</span>提问
      </div>
      <div class="clearfix">
        <div class="vote fl">
          <div v-text="question.voteCount"></div>
          <div>得票</div>
        </div>
        <div class="info">
          <div class="title-box">
            <h1 class="title" @click="toQuestionDetail(question.id)"
                v-html="$options.filters.highlightText(question.title,keywords)">

            </h1>
            <tag-inline-list :tags="question.tags"></tag-inline-list>
          </div>
          <ul class="list bottom-list">
            <li class="list-item">
              <i class="fa fa-eye"></i>
              <span v-text="question.followerCount"></span>关注
            </li>
            <li class="list-item">
              <i class="fa fa-comment"></i>
              <span v-text="question.answerCount"></span>回答
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  import TagInlineList from '../question/TagInlineList'
  export default {
    data() {
      return {
      }
    },
    methods: {
      toQuestionDetail(questionId){
        this.$router.push({path:`/question/${questionId}`})
      },
      toTagDetail(tagId){
        this.$router.push({path:`/tag/${tagId}`})
      },
    },
    props:['questions','keywords'],
    components:{
      TagInlineList
    }

  }
</script>
<style scoped>
  .entry-list-item{
    padding: 5px 15px;
    border: 1px dashed #ccc;
    border-radius: 3px;
    margin-bottom: 10px;
  }
  .meta{
    padding-left:8px;
    color: #999;
  }
  .vote{
    margin-right: 10px;
    padding: 10px 0;
    text-align: center;
    font-size: 15px;
    color: #666;
  }
  .info{
    overflow: auto;
  }
  .title-box{
    margin: 5px 10px;

  }
  .title{
    display: inline;
    font-size: 18px;
    cursor: pointer;
    font-weight: normal;
    margin-right:10px;
  }
  .title:hover{
    color: #0084ff;
  }
  .bottom-list{
    justify-content: flex-start;
  }
</style>


