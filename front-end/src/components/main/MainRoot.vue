<template>
  <div class="clearfix bg">
    <page-header ref="mainHeader" style="position: fixed"></page-header>
    <!--<transition name="slide">-->
      <!--<page-header style="position: fixed" v-show="showFiexedHeader"></page-header>-->
    <!--</transition>-->
    <div class="main">
      <!--<keep-alive include="TagManagement,Timeline">-->
        <router-view>
        </router-view>
      <!--</keep-alive>-->
    </div>
    <div v-show="showFixedTools" class="hidden-xs-only">
      <a class="backtop" href="#">
        回到顶部
      </a>
    </div>
  </div>
</template>
<script>
  import store from '@/store'
  import PageHeader from './PageHeader'

  export default {
    data() {
      return {
        showFiexedHeader: false,
        showFixedTools: false,
      }
    },
    async beforeRouteEnter(to, from, next) {
      await store.dispatch('GetLoggedInUser');
      next();
    },
    mounted() {
      let headerHeight = this.$refs.mainHeader.$el.offsetHeight;
      let fn = (e) => {
        let scrollTop = window.pageYOffset;
        this.showFiexedHeader = scrollTop > headerHeight * 10;
        this.showFixedTools= scrollTop > headerHeight * 6;
      };
      this.scrollFn = this.$util.throttleFn(fn)
      window.addEventListener('scroll', this.scrollFn);
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollFn);
    },
    components: {
      PageHeader
    }
  }
</script>
<style lang="scss">
  .bg {
    background-color: #f9f9f9;
  }
  .backtop{
    box-sizing: border-box;
    width: 36px;
    position: fixed;
    right: 30px;
    bottom: 30px;
    padding: 10px;
    border: 1px solid #ddd;
    color: #999;
    cursor: pointer;
    &:hover{
      background: #f3f3f3;
    }
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .15s linear;
  }

  .slide-enter, .slide-leave-to {
    /*opacity: 0;*/
    transform: translate3d(0, -100%, 0);
  }
</style>

