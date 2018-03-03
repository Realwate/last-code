<template>
  <div class="main">
    <nav-header>
      <template slot="title">
        标签详情
      </template>
    </nav-header>
    <div class="container panel">
      <header class="tag-info">
        <h2 class="title" v-text="tag.name"></h2>
        <tag-info :tag="tag"></tag-info>
      </header>
      <timeline-entry :questions="questions">
      </timeline-entry>
    </div>
  </div>

</template>
<script>
  import TimelineEntry from '../timeline/TimelineEntry'
  import TagInfo from './TagInfo'
  import NavHeader from '../NavHeader'
  export default {
    data() {
      return {
        tag:{
          id:'2f',
          name:'前端框架',
          followerCount: 12,
          questionCount: 48,
        },
        questions:[
          {id:'fff',author:{name:'aa'},createdAt:1519509611477,
          title:"如何学习javascript?",
          tags:['前端','javascipt'],
          answerCount:12,voteCount:3,followerCount:4},
          {id:'ffd',author:{name:'aa'},createdAt:1519509611477,
          title:"如何学习javascript?",
          tags:['前端','javascipt'],
          answerCount:12,voteCount:3,followerCount:4},
          {id:'ffhf',author:{name:'aa'},createdAt:1519509611477,
          title:"如何学习javascript?",
          tags:['前端','javascipt'],
          answerCount:12,voteCount:3,followerCount:4},
        ]
      }
    },
    methods:{
    },
    created() {
      let {tagId} = this.$route.params;
    },
    components:{
      TimelineEntry,TagInfo,NavHeader
    },
  }
</script>
<style scoped>
  .tag-info{
    padding: 10px;
    background-color: rgba(232,232,232,0.5);
    border-radius: 4px;
    text-align: center;
    margin-bottom: 10px;
  }
  .title{
    font-weight:normal;
  }
</style>


