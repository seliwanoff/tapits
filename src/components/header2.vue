<template>
    <div class="container">
        <header>
            <div class="nav">
                <div class="left-side-con">
                    <div class="hidden-icon onhover-show">
                        <span class="fa fa-angle-left hiddenicon"  @click="closeDrop"></span>
                    </div>
                   
                    <div class="image-home">
                     <router-link to="/" class="router">
                        <img src="../assets/image/logo.png" alt="">
                        <h3>TAPIT</h3>
                    </router-link>
                    </div>
                 
                    <div class="hidden-icon onhover-show">
                        <span class="fa fa-refresh  hiddenicon"></span>
                    </div>
                </div>
                <div class="right-side-con">
                    <div class="main-head-nav">
                        <div class="left-main-icon">
                            <i class="fa fa-angle-left" @click="closeDrop"></i>
                        </div>
                        <div class="right-main-icon">
                            <i class="fa fa-refresh" @click="refreshPage"></i>
                        </div>

                    </div>
                </div>
            </div>
        </header>
         
    </div>
</template>
<script>
export default {
    name:'Header2-App',
     components:{
       
       
        
    },
    data() {
        return {
            showDrop:true ,
        }
    },
    methods: {
        closeDrop(){
           this.$router.go(-1)
        },
        refreshPage(){
             window.location.reload();
        }
    },
}
</script>
<style scoped>
    .container{
        max-width:1519.20px;
        margin:0px auto;
    }
    header{
        width:100% !important;
       
        background: #fff;
        box-shadow: 0px 2px 30px 2px rgb(0 0 0 / 10%);
        height: 70px;
    }
    .nav{
        box-sizing: border-box;
      display: flex;
      justify-content: space-between;
    }
    .left-side-con{
        width:260px;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        height: 100%;
        padding: 10px;
    }
    .right-side-con{
        background: #0A1AA8 ;
        height:100%;
        width: calc(100% - 260px);
        display: flex;
        justify-content: space-between;
        flex-direction: row;

    }
     .hidden-icon{
        display: none;
        padding: 10px;
    }
    .image-home img{
        width:36px;
        float: left;
        
    }
    .image-home{
      
      
       width:100%;
        animation: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s normal forwards 1 fadein;
        vertical-align: middle;
        
    }
    h3{
       
        float: left;
       
        animation: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) 0s normal forwards 1 fadein;
        vertical-align: middle;
        font-size:1.51rem;
        margin: 6px;
    }
   .main-head-nav{
    padding:10px;
    
    width:100%;
    display: flex;
    justify-content: space-between;
   }
   .left-main-icon{
   
    place-items: center;
    align-content: center;
    padding:10px;
   }
   .right-main-icon{
        display: flex;
        justify-content: space-between;
        padding: 10px;
       
   }
   i{
    font-size:1.3rem;
    color:#fff !important
   }
   .grtuser{
    color:#fff;
    font-weight: 800;
    margin-right:20px;
   
   
   }
  @media screen  and (max-width:490px){
    .left-side-con{
        width:100%;
      
        display: flex;
        justify-content: space-between;
    }
    .right-side-con{
        display: none;
    }
    .image-home{
        width:100%;
        justify-content: center;
        display: flex;
    }
    .hidden-icon{
        display: inline;
     
        padding: 10px;

    }
    
    
  }
  
  .hiddenicon{
    font-size:1.3rem;
    margin:10px;
  }
  .fa{
    cursor: pointer;
  }
 
</style>