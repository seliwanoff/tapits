<template>
<div>
<div style="max-height:800px">
  <router-view :key="$route.path"></router-view>
</div>
  <Footer />
</div>
</template>

<script>
 import Footer from './components/footer.vue'
export default {

  name:'app',
  component:{
    Footer
  },
  data: function(){
    return{
      events:['click','mousemove','mousedown','scroll','keypress','load'],
      logoutTimer:null
    }
  },
  mounted(){
    this.events.forEach(function(event){
      window.addEventListener(event,this.resetTimer)
    },this)
    this.setTimers();
  },
  methods: {
    setTimers:function(){
      this.logoutTimer = setTimeout(this.logoutUser,1200000)
    },
    logoutUser:function(){
      localStorage.removeItem('user')
      localStorage.removeItem('sub')
      localStorage.removeItem('bill')
      this.$router.push('/panel/login')
    },
    resetTimer:function(){
      clearTimeout(this.logoutTimer)
      this.setTimers()
    }

  },
  async beforeCreate(){
    const user = localStorage.getItem('user')
    if(user!=null && this.$route.path!='/panel/login' && this.$route.path!='/panel/register'){
      this.$route.path
    }else if(user!=null && this.$route.path=='/panel/login' && this.$route.path=='/panel/register'){
        this.$router.push('/account/dashboard')
    }else{
      this.$router.push('/panel/login')
    }
  }
  
}
</script>
<style>
*{
  text-decoration: none;
  padding: 0px;
  margin:0px;
  color:#464855;
  font-weight: 500;
}
body{
      font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.45;
}
h3{
  font: size 1.51rem
}
body{
  background-color: #F4F5FA;
}

</style>
