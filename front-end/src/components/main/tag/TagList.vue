<template>
  <el-row :gutter="24">
    <el-col :sm="12" :md="6" v-for="(tag,index) in tags" :key="tag.id">
      <div class="tag-box">
        <div class="desc">
          <router-link :to="{path:`tag/${tag.id}`}">
            <img class="avatar-40" src="../../../assets/image/tag-default.png" >
            <h3 class="tag-name" v-text="tag.name"></h3>
          </router-link>
        </div>
        <tag-info :tag="tag" :index="index"></tag-info>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import TagInfo from './TagInfo'
  export default {
    data() {
      return {
        activeName:"followed",
      }
    },
    methods:{
      toTagDetail(){
        this.$router.push({name:'tagDetail'})
      },
      followTag(){
      },
      cancelFollowTag(){
      }
    },
    props:['tags'],
    created() {
    },
    components:{
      TagInfo
    }
  }
</script>
<style scoped>
  .tag-box{
    text-align: center;
    margin-bottom: 15px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding:20px 10px;

  }
  .tag-name{
    color: #555;
    font-weight:normal;
  }
  .desc:hover .tag-name{
    color: #111;
  }
</style>


