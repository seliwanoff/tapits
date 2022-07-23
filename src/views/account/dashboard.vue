<template>
    <div class="container-main">
    <loading v-model:active="isLoading"
                 :can-cancel="false"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"
                 :color='color'/>
        <header style="margin-bottom:200px">
            <nav>
                <div class="left-side-con">
                    <div class="hidden-icon onhover-show" >
                        <span class="fa fa-bars hiddenicon"  @click="closeDrop"></span>
                    </div>
                   
                    <div class="image-home">
                     <router-link to="/" class="router">
                        <img src="../../assets/image/logo.png" alt="">
                        <h3>TAPIT</h3>
                    </router-link>
                    </div>
                 
                    <div class="hidden-icon onhover-show" >
                       <div class="pic-nl" v-if="image!=null" style="margin-top:-7px !important">
                           <img :src="url+image" alt="" class="img">
                         </div>
                          <div class="pic-nl" v-else>
                          {{fn}}
                         </div> 
                       
                    </div>
                </div>
                <div class="right-side-con">
                    <div class="main-head-nav">
                        <div class="left-main-icon">
                            <i class="fa fa-bars" @click="closeDrop"></i>
                        </div>
                        <div class="right-main-icon" >
                           <div class="pic-nl" v-if="image!=null">
                           <img :src="url+image" alt="" class="img">
                         </div>
                          <div class="pic-nl" style="color:#000 !important" v-else>
                          {{fn}}
                         </div>  
                            <span class="grtuser">Hi,{{username}}</span> 
                        </div>

                    </div>
                </div>
            </nav>
        </header>
        <transition name="slide">


    <aside v-show="hidemes">
        <div class="side-main-bar">
            <ul>
                  <li class="width:100%;height:80px !important;border:1px solid black" >
               
                </li>
                <li class="width:100%;border:1px solid black;margin-top:40px" >
                <router-link to="/account/dashboard" style="width:100%;display:flex;justify-content:space-between" active-class="bd-l">
                 <span class="menu-item">
                  <span class="chl-ck">
                      <span class="fa fa-home icon-menu"></span>
                 </span>
                
                 
                  Home </span>
                
                <span class="fa fa-angle-right icon-menu"></span>
                   
                </router-link>
                </li>
                <li class="width:100%;border:1px solid black">
                <router-link to="/user/transaction" style="width:100%;display:flex;justify-content:space-between"  active-class="bd-l">
                 <span class="menu-item">
                  <span class="chl-ck">
                     <span class="fa fa-right-left icon-menu"></span>
                 </span>
                 
                 
                  Transaction</span>
                
                <span class="fa fa-angle-right icon-menu"></span>
                   
                </router-link>
                </li>
                <li class="width:100%;border:1px solid black">
                <router-link to="/user/refer" style="width:100%;display:flex;justify-content:space-between" active-class="bd-l">
                 <span class="menu-item">
                 <span class="chl-ck">
                      <span class="fa fa-sack-dollar icon-menu"></span> 
                 </span>
                
                 
                 Refer & Earn</span>
                
                <span class="fa fa-angle-right icon-menu"></span>
                   
                </router-link>
                </li>
                <li class="services">Services</li>
                <li class="width:100%;border:1px solid black">
                <router-link to="/service/transfer" style="width:100%;display:flex;justify-content:space-between" active-class="bd-l">
                 <span class="menu-item"> 
                 <span class="chl-ck">
                     <span class="fa fa-bank icon-menu"></span>  
                 </span>
                 
                  
                  Transfer</span>
              
                <span class="fa fa-angle-right icon-menu"></span>
                   
                </router-link>
                </li>
                <li class="width:100%;border:1px solid black">
                <router-link to="/service/single-data" style="width:100%;display:flex;justify-content:space-between" active-class="bd-l">
                 <span class="menu-item">
                 
                
                  <span class="chl-ck">
                    <span class="fa fa-wifi icon-menu"></span> 
                 </span>
                  Data subscription</span>
                
                <span class="fa fa-angle-right icon-menu"></span>
                   
                </router-link>
                </li>
                <li class="width:100%;border:1px solid black">
                <router-link to="/service/single-airtime" style="width:100%;display:flex;justify-content:space-between" active-class="bd-l">
                 <span class="menu-item"> 
                  <span class="chl-ck">
                   <span class="fa fa-phone icon-menu"></span> 
                 </span>
                 
                  
                  Airtime</span>
              
                <span class="fa fa-angle-right icon-menu"></span>
                   
                </router-link>
                </li>
                <li class="width:100%;border:1px solid black">
                <router-link to="/service/bill" style="width:100%;display:flex;justify-content:space-between" active-class="bd-l">
                 <span class="menu-item"> 
                  <span class="chl-ck">
                   <span class="fa fa-lightbulb icon-menu"></span>
                 </span>
                  
                  
                   Bill payment</span>
               
                <span class="fa fa-angle-right icon-menu"></span>
                   
                </router-link>
                </li>
                <li class="width:100%;border:1px solid black">
                <router-link to="/service/cable" style="width:100%;display:flex;justify-content:space-between" active-class="bd-l">
                 <span class="menu-item"> 
                  <span class="chl-ck">
                    <span class="fa fa-tv icon-menu"></span>
                 </span>
                 
                 
                  cable & Tv</span>
               <span class="fa fa-angle-right icon-menu"></span>
                   
                </router-link>
                </li>
                 <li class="services">Account</li>
                     <li class="width:100%;border:1px solid black">
                <router-link to="/setting/user-settings" style="width:100%;display:flex;justify-content:space-between" active-class="bd-l">
                 <span class="menu-item">  
                   <span class="chl-ck">
                     <span class="fa fa-cog icon-menu"></span>
                 </span>
                
                 
                 Account Settings</span>
                  <span class="fa fa-angle-right icon-menu"></span>
                
                   
                </router-link>
                </li>
               
                <li class="width:100%;border:1px solid black">
                <a href="javascript:void(0)" @click="logOut" style="width:100%;display:flex;justify-content:space-between">
                 <span class="menu-item">
                 <span class="chl-ck">
                    <span class="fa fa-sign-out icon-menu"></span>
                 </span>
                 
                 
                  Sign out</span>
                   <span class="fa fa-angle-right icon-menu"></span>
               
                   
                </a>
                </li>
                
            </ul>
        </div>
    </aside>
    </transition>
        
        
            <Balance  :balance="balance" :showme="hidemes"/>
        
        
       
       
    </div>
</template>
<script>

import Balance from '../../components/balance2.vue'
import axios from 'axios'
 //import moment from 'moment'
 import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    
    name:'Dashboard-app',
    components:{
       
        Balance,
        Loading
       
       
        
    },
    data() {
        return {
            hidedrop:true,
            token:'',
            balance:'',
            accessToken:"",
            letdrops:'',
            hidemes:true,
             image:null,
            url:'https://tap.150psi.com/public/storage/images/',
              isLoading: true,
            fullPage: true,
            color:'#0A1AA8',
            fn:''
        }
    },
    methods: {
        hideme(){
           
            this.hidedrop = false
        },
        customDrop(){
            this.showDrop = !this.showDrop
         
        },
        closeDrop(){
                this.hidemes = !this.hidemes
        },
         async logOut(){
            try{
                    const data  = JSON.parse(localStorage.getItem('user'));
                    this.token = data.data.token
                 await axios.get(`${process.env.VUE_APP_BASE_URL}api/logout`,{
                        headers: {
                            "Authorization":"Bearer "+this.token
                        }
                    })
                    localStorage.removeItem('user')
                    this.$router.push('/panel/login')

            }catch(e){
                console.log(e)
            }
           
        }
      
 },

     async mounted(){
         if (screen.width <= 600) {
      this.hidemes = false;
    } else {
      this.hidemes = true;
    }
          const data  = JSON.parse(localStorage.getItem('user'));
          this.token = data.data.token
          this.username = data.data.data.username
          
       
       
        try{
            const user = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`,{
               headers: {
                    Authorization:"Bearer "+ this.token
                }
            })
         this.balance = user.data.data.balance
        this.username = user.data.data.username
        this.fn = user.data.data.username.charAt(0)
        this.image = user.data.data.image
          this.balance = user.data.data.balance
        
           
             
            
           
            if(user.data.data.bank==null){
                const data  = JSON.parse(localStorage.getItem('user'));
                 this.token = data.data.token
             await axios.get(`${process.env.VUE_APP_BASE_URL}api/createbank`,{
                 headers: {
                        Authorization: "Bearer "+this.token
                },
             })
          /*   this.accessToken = auth.data.data.responseBody.accessToken

                
               
                const current = new Date()
                const bankdata = {
                    accountReference: moment(current).format('YYYYMMDDHHm'),
                    accountName: user.data.data.fname +" "+  user.data.data.lname,
                    customerEmail: user.data.data.email,
                    currencyCode: "NGN",
                    contractCode: "444802260620",
                    customerName:  user.data.data.fname + " "+ user.data.data.lname,
                    getAllAvailableBanks: "false",
                    preferredBanks: ["035"]
                }
                const bank = await axios.post('https://api.monnify.com/api/v2/bank-transfer/reserved-accounts',bankdata,{
                    headers:{
                       Authorization:"Bearer "+ this.accessToken
                    }
                })
              
                */
               /* if(bank.data.requestSuccessful){
                    const bankp = {
                    accountName: bank.data.responseBody.accounts[0].accountName,
                    bank: bank.data.responseBody.accounts[0].accountNumber,
                    mref:bank.data.responseBody.reservationReference,
                    ref:bank.data.responseBody.accountReference,
                    bankcode: bank.data.responseBody.accounts[0].bankCode,
                    bankname:bank.data.responseBody.accounts[0].bankName,
                }
                 const data  = JSON.parse(localStorage.getItem('user'));
                 this.token = data.data.token
              
                 await axios.post(`${process.env.VUE_APP_BASE_URL}api/updatebank`,bankp,{
                        headers: {
                        Authorization:"Bearer "+ this.token
                    }
                })
             
                }*/
             
            }
        }
        catch(e){
            console.log(e)
        }
        this.isLoading = false
    },
   
    
}
</script>

<style>
    .container-main{
        max-width: 1519.20px;
        margin:0px auto;
       width:100%;
       position:relative;
    }
    main{
      
        width:100%;
    }
     header{
        width:100% !important;
        position:fixed;
        background: #fff;
        box-shadow: 0px 2px 30px 2px rgb(0 0 0 / 10%);
        height: 70px;
        z-index:100000;
    }
    nav{
    
     
      height:100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
    }
    .left-side-con{
        width:250px;
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
    font-size:1rem
  }
  aside{
    transition: 300ms ease all;
    backface-visibility: hidden;
    width:246px;
    background: #fff;
    box-shadow: 1px 0px 30px rgb(0 0 0 / 10%);
    padding: 10px;
    margin: top 0px;
    float:left;
    height:100%;
    position:fixed;
    top:50;
    left:0;
   
}
.side-main-bar{
    touch-action: none;
    overflow: hidden !important;
    height: 100%;
    position: relative;
   
   
}
ul{
    font-size: 1.1rem;
    letter-spacing: 0.2px;
    font-family: "Quicksand", Georgia, "Times New Roman", Times, serif;
    font-weight: 400;
    overflow-y: hidden;
    margin-top:40px
}
ul li{
   
    display:flex;
    justify-content:space-between;
    height:45px
}
.menu-item{
    font-size: 0.9rem;
    display: inline-block;
    text-align: center;
    align-content: center;
    align-self: center;
}
.icon-menu{
    font-size: 0.9rem !important ;
    
}
li:hover {
  
    transition-duration: 0.5s;
    transition-delay: 0.5s;
}
.services{
    font-weight: 700;
    font-size: 1.2rem;
}
.slide-enter-active{
    transition: all 0.3s ease-out;
}
.slide-leave-active{
    transition: all 0.3s ease-out;
}
.slide-enter-from,
.slide-leave-to{
    opacity: 0;
    transform: translate(20px);
}
@media screen and (max-width:996px) {
    aside{
        position:fixed;
        height:100%;
    }
}
@media screen and (max-width:755px) {
     aside{
        position:fixed;
        height:100%;
    }
}

 .pic-nl{
    height:40px;
    width:40px;
    border-radius: 100%;
    border:1px solid #ccc;
    margin-top:-10px;
    margin-right:10px;
    color:#fff;
      text-align:center;
    font-size:1.5rem
 }
 .img{
    height:40px;
    width:40px;
    border-radius:100%;
 }
 @media screen and (max-width:755px) {
     .pic-nl{
       color:#000 !important
    }
}
.fa-angle-right{
   
    display:inline-block;
    text-align:center;
    align-self:center
}

</style>