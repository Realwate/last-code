<template>
  <div class="vote-box">
    <div class="vote-btn vote-up"></div>
    <div class="vote-count"> <span v-text="currentVote"></span> </div>
    <div class="vote-btn vote-down"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentVote: this.voteCount,
      }
    },
    methods: {
      handleInput(val){
        this.$emit('input',val);
      }
    },
    props: ['voteCount',],
  }
</script>
<style scoped lang="scss">
  .vote-box{
    position: absolute;
    color:#0084ff;
    background: rgba(0,132,255,.1);
    width: 40px;
    height: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 3px;
  }
  .vote-count{
    font-weight:bold;
    font-size: 20px;
    margin: 3px 0;
  }
  $vote-color:#0084ff;
  .vote-btn{
    border:6px solid transparent;
    cursor: pointer;
    border-bottom-color:$vote-color ;
    &:hover{
      border-bottom-color:darken($vote-color,20%);
    }
  }
  .vote-up{

  }
  .vote-down{
   transform: rotate(180deg);
  }
  .active{

  }
</style>


