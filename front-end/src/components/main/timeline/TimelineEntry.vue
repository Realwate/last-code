<template>
  <ul class="entry-list" >
    <li class="entry-list-item" v-for="question in questions" :key="question.id">
      <div class="meta">
        <span v-text="question.author.name"></span> &nbsp;
        <span v-text="$util.formatDate(question.createdAt)"></span>提问
      </div>
      <div class="clearfix">
        <div class="vote">
          <div v-text="question.voteCount"></div>
          <div>得票</div>
        </div>
        <div class="info">
          <div class="title-box">
            <h1 class="title" @click="toQuestionDetail(question.id)" v-text="question.title"></h1>
            <div class="tag-list" >
              <div class="tag" v-for="tag in question.tags" :key="tag.id" @click="toTagDetail(tag.id)" v-text="tag"></div>
            </div>
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
  export default {
    data() {
      return {
      }
    },
    methods: {
      toQuestionDetail(questionId){
      },
      toTagDetail(tagId){

      },
    },
    props:['questions'],

  }
</script>
<style scoped>
  .entry-list-item{
    padding: 10px;
    border: 1px dashed #ccc;
    margin-bottom: 10px;
  }
  .meta{
    padding-left:8px;
    color: #999;
  }
  .info,.vote{
    float: left;
  }
  .vote{
    margin-right: 10px;
    padding: 10px 0;
    text-align: center;
    font-size: 15px;
    color: #666;
  }
  .tag-list{
    display: inline-block;
  }
  .title-box{
    margin: 5px 10px;

  }
  .title{
    display: inline-block;
    font-size: 20px;
    cursor: pointer;
    font-weight: normal;
  }
  .tag-list{
    margin-left: 10px;
  }
  .tag{
    display: inline-block;
    cursor: pointer;
    padding: 2px 3px;
    margin: 0 5px;
    color: #409eff;
    border-radius: 2px;
    background-color: rgba(64,158,255,.1);
  }
  .tag:hover{
    background-color: rgba(64,158,255,.3);
  }
  .bottom-list{
    justify-content: flex-start;
  }
</style>


