<template>
    <div>
     <loading v-model:active="isLoading"
                 :can-cancel="false"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"
                 :color='color'/>
        <Header />

        <div class="rg-c">
            <div class="gc-x">
              <h2 class="hc-x" style="text-align:center">Bank Transfer</h2>
                <p style="text-align:center">Your personalized bank account details is shown below</p>
                <p style="text-align:center">Copy the account details to fund your wallet</p>
                <main>
                <Message :status="status" :message="message"/>
                <div class="ml-xf">
                       <div class="lcl-xj" >
                        <div class="acc-de">
                            <div class="each-de">
                                <p>Account Name</p>
                                <h3>{{accountName}}</h3>
                            </div>
                            <div class="each-de">
                                <p>Account Number</p>
                                <h3>{{accountNumber}}</h3>
                                <input type="hidden" v-model="accountNumber" id="input">
                            </div>
                            <div class="each-de">
                                <p>Bank</p>
                                <h3>{{bankName}}</h3>
                            </div>
                        </div>
                          

                        <div>
                            <span class="fa fa-copy" @click="copyText"></span>
                        </div>
                        </div>
                        
                    </div>
                </main>
            </div>
        
        </div>
    </div>
</template>
<script>
import Header from '../../components/header.vue'

import Message from '../../components/message.vue'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
 
import axios from 'axios'
export default {
    name:'Account-app',
    components:{Header,Message,Loading},
    data() {
        return {
            phone:'',
            password:'',
            amount:'',
            status:null,
            message:'',
            btnText:'Transfer',
            isDisabled:true,
            receiver:'',
            token:'',
            accountNumber:'',
            bankName:'',
            accountName:'',
            isLoading: true,
            fullPage: true,
            color:'#0A1AA8'

        }
    },
    methods: {
        
      copyText(){
       try{
        navigator.clipboard.writeText(this.accountNumber)
        this.status =true,
        this.message= 'Copied to clipboard'
        this.interval = setInterval(()=>{
            this.status = null
        },2000)
       }
       catch(e){
      e
       }
    
      }
         
    },
     async beforeCreate(){
          const data  = JSON.parse(localStorage.getItem('user'));
          this.token = data.data.token
       
        try{
            const user = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`,{
               headers: {
                    Authorization:"Bearer "+ this.token
                }
            })
            console.log(user)
         this.bankName = user.data.data.bankname
          this.accountName = user.data.data.accountName
           this.accountNumber = user.data.data.bank
         console.log(user.data.data.bank)
        }catch(e){
            e
        }
        this.isLoading =false

     }
}
</script>
<style scoped>
.rg-c{
   
    font-family: "Quicksand", Georgia, "Times New Roman", Times, serif;
    font-size: 1.6rem;
    padding:10px
}
.rg-c .gc-x{
    margin:50px;
    max-width:400px;
    width:100%;
    margin:100px auto;
    background: #fff;
    box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
    padding:10px;
    border-radius: 15px;
}
  @media screen  and (max-width:490px){

   .rg-c .gc-x {
        width:100%;
        margin:0px;
        box-sizing: border-box;
         border-radius: 20px;
         margin-top:90px

    }
   }
   .hc-x{
    font-size: 1.2rem;
    padding: 10px;;
    margin:0px;
    color:#222;
    font-weight: 700;
   }
   main{
    margin-top: 20px;
   }
  .xl-f{
    display: flex;
    justify-content: space-between;
    padding:10px;
   
    
  }
  .rm-bl{
    margin-left: 5px;
  }
  
  label{
    font-size:1rem;
    width:100%;
    color:#000
   

  }
  input{
   
    outline: none;
    box-sizing: border-box;
    height:50px;
    border-radius: 10px;
    border:1px solid #ccc;
    width:96%;
    padding:10px
  

  }
   button{
    padding:10px;
    color:#fff;
    font-size: 1rem;
    background: #0A1AA8;
    border: 1px solid #0A1AA8;
    border-radius: 10px;
    width:96%;
     box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
   }
 input::-webkit-input-placeholder{
      font-family: "Quicksand", Georgia, "Times New Roman", Times, serif;
    }
    .xdir,.vdir{
    color:#0A1AA8;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
  }
 @media screen  and (max-width:490px){
    label{
        font-size: 0.9rem;
        margin:5px;
    }
    input{
        width:95%;
        margin:5px
    }
    button{
        width:95%;
        font-size:0.9rem;
    }
    .rm-bl{
        margin-left: 12px;
    }
   }
   .ml-xf{
    border-radius:10px;
    padding:10px;
    background:#fff;
      border:1px dashed #0A1AA8;
    margin-top:15px;
     box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
   }
    .xdir,.vdir{
   
    font-size: 0.9rem;
   
  }
  .disableClass{
    background:#ccc !important;
    border:1px solid #ccc;
  }
  .activeClass{
     background:#0A1AA8 !important;
    border:1px solid #0A1AA8;
  }
 
  .each-pre {
     margin-left:20px
  }
  .each-pre h4{
    font-weight:800;
    font-size:1rem;
    color:#000;
    margin:0px !important;
    padding:0px
  }
  .each-pre span{
    font-weight: 500;
    font-size: 0.7rem;
    line-height: 1.3px;

  }
  .icox-col{
    height:30px;
    width:30px;
    border-radius:100%;
   
  }
  .lcl-xj{
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
  
     padding:10px;
     color:#fff;
     
  }
 p{
    font-size:0.9rem
 }
 .each-de{
  
    padding:3px;
    font-size:1rem
 }
 .each-de p{
    color:#000;
    font-size:0.7rem
 }
 .each-de h3{
    font-weight: 800;
    color:#000;
    font-size:1rem;
    width:100%
 }
 .fa-copy{
    color:#0A1AA8;
    cursor:pointer
 }
</style>