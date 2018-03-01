<template>
  <aside class="sidebar">
    <section class="sidebar-block">
      <ul class="nav-list vertical">
        <li class="nav-item">
          我的提问
        </li>
        <li class="nav-item">
          我的回答
        </li>
        <li class="nav-item">
          我的关注
        </li>
      </ul>
    </section>
    <section class="sidebar-block">
      <h4 class="title">可能感兴趣的人</h4>
    </section>
    <section class="sidebar-block">
      <h4 class="title">社区运行情况</h4>
      <ul class="list vertical">
        <li class="list-item">用户数： <span v-text="userCount"></span></li>
        <li class="list-item">问题数： <span v-text="questionCount"></span></li>
        <li class="list-item">回复数： <span v-text="answerCount"></span></li>
      </ul>
    </section>
    <footer>
      ©Realwate 作品
    </footer>
  </aside>
</template>
<script>

  export default {
    data() {
      return {
        currentTab: "rencentItem",
        userCount: 10,
        questionCount: 150,
        answerCount: 200,
      }
    },
    methods: {
      getRecommendedItems() {
        this.currentTab = "recommendedItem";
      },
      getRecentItems() {
        this.currentTab = "rencentItem";
      }
    },
    created() {
    },
  }
</script>
<style scoped lang="scss">
  .sidebar {
    width: 160px;
    margin-left: 20px;
  }
  .sidebar-block {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 15px;
    box-shadow: 2px 2px 5px rgba(153, 153, 153, 0.4);
    .title{
      margin-bottom: 10px;
    }
  }
  .list {
    justify-content: flex-start;
  }
</style>


