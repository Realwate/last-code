<template>
 <div>
   <h1>WelCome~ </h1>
 </div>
</template>
<script>
  import {mapState} from "vuex"
  import router from "../router"

  export default {
    data(){
      return {

      }
    },
    computed:{
          ...mapState([ //检测是否登陆
      "token"
    ])
    },
    created(){
         if(!this.token){
            router.replace({path:"/login"});
            return;
        }
    }
    
  }
</script>

