<template>
    <div>
     <loading v-model:active="isLoading"
                 :can-cancel="false"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"
                 :color='color'/>
        <Header2 />

        <div class="rg-c">
            <div class="gc-x">
               
            
                <main>
                <div class="rfer-col">
            
                    <div class="ech-refer">
                        <div class="tet-refer">
                            <span style="color:#0A1AA8;font-weight:800">Total Reward</span>
                          <h6>&#8358;{{length }}</h6>
                        </div>
                        
                    </div>
               
                </div>
              
                </main>
                
            </div>
          
        </div>
        <div class="rg-c">
            <div class="gc-xl">
             
                <main>
                <Message :status="status" :message="message"/>
                <div class="rfer-colx">
                    <div class="gbc-lkj" style="display:flex;justify-content:space-between;padding:10px">
                    <h6 > referral</h6>  <h6> Reward</h6> 
                     </div>
                    <div class="inf-ref">
                       <div v-if="length>0">
                            <div class="info-rfer-user" v-for="item in refferds" :key="item.id">
                                <div class="info-pix-name">
                                    <span class="fa fa-user"></span>
                                    <span class="nhy-ck">{{item.name}}</span>
                                </div>
                                <span class="nhy-ck" style="display:inline-block;margin-top:10px">&#8358;{{item.price}}</span>
                            </div>
                       </div>
                       <div v-else  style="text-align:center;font-size:1rem">{{text}}</div>
                    </div>
                </div>
              
                </main>
                
            </div>
          
        </div>
        
    </div>
</template>
<script>
import Header2 from '../../components/header.vue'
import Message from '../../components/message.vue'
import axios from 'axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    name:'Reward-app',
    components:{Header2,Message,Loading},
    data() {
        return {
            id:'',
            password:'',
            status:null,
            message:'',
            btnText:'Sign In',
            isDisabled:false,
            username:'',
            length:0,
            refferds:[],
            text:'No referral yet',
            isLoading: true,
            fullPage: true,
            color:'#0A1AA8'

        }
    },
    methods: {
         copyText(){
       try{
        navigator.clipboard.writeText(this.username)
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
    async mounted(){
          const data  = JSON.parse(localStorage.getItem('user'));
          this.token = data.data.token
        try{
            const user = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getdatils`,{
               headers: {
                    Authorization:"Bearer "+ this.token
                }
            })
           
            this.username = user.data.data.username
         }
        catch(e){
            console.log(e)
        }
         try{
            const refer = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getrefer`,{
               headers: {
                    Authorization:"Bearer "+ this.token
                }
            })
          
          this.length = refer.data.data.length
          this.refferds = refer.data.data
         }
        catch(e){
            if(e.response.status==400 || e.response.status==422){
                   this.text = 'Error Fetching Referral, Kindly refresh'
                 
            }else{
                 this.text = 'Error Fetching Referral, Kindly refresh'   
            }
        }
         this.isLoading= false
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
.rg-c .gc-xl{
    
    max-width:420px;
    width:100%;
    margin:0px auto;
    background: #fff;
    box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
    padding:10px;
    border-radius: 15px;
    margin-top:-80px;
    box-sizing: border-box;
}
.rfer-col{
     display:flex;
    justify-content: space-between;
  
}
  @media screen  and (max-width:490px){

   .rg-c .gc-x {
    margin-top:60px;
        width:100%;
        
        box-sizing: border-box;
         border-radius: 20px;
         margin-top:100px;

    }
   }
   .hc-x{
    font-size: 1.2rem;
    padding: 10px;;
    margin:0px;
    color:#222;
    font-weight: 700;
   }
  
  .xl-f{
    display: flex;
    justify-content: space-between;
    padding:10px;
      padding-top:0px !important;
      padding-bottom:0px !important;
   
    
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
    width:100%;
    padding:10px;
      padding-top:0px !important;
      padding-bottom:0px !important;
    
   }
    .xdir,.vdir{
   
    font-size: 0.9rem;
   
  }
  .ech-refer{
   
    justify-content: space-between;
    display: flex;
    width:100%;
  }
   .fa-angle-right{
    font-size:1rem;
   
    border-radius: 100%;
    padding:5px;
    height:10px;
    margin:10px;
    align-items: center;
    
   
   }
   .tet-refer span{
    font-size:1rem
   }
   .rtb{
    width:100%;
    margin:5px;
    
   }
   .tet-refer h6{
   color:#000;
    margin:0px;
   }
   .gbc-lkj h6{
        color:#0A1AA8;
        font-weight: 500;
        font-size:1rem;
        color:#000 !important
   }
   .inp-ref{
    display:flex;
    justify-content: space-between;
   
    border:1px solid #0A1AA8;
    border-radius:10px;
    padding:0px;
    margin-top:10px !important;
     background: #aeb3df !important;
    
    
   }
   .inp-ref input{
        width:100%;
        border:none;
        background: none;
        padding:5px;
        border-radius:0px !important;
        color:#000 !important
   }
   .inp-ref button{
    max-width:90px;
    border:none !important;

    
   }
   .inf-ref{
    border:1px solid #ccc;
    background: #d1d2d4;
    padding:10px;
    margin-top:5px;
    border-radius:10px;
    min-height: 300px;
   }
   .ech-spc-link{
   
    padding: 10px;
    display: flex;
    justify-content: space-between;
   }
   .lcho{
    background: #aeb3df;
    border-radius: 100%;
    font-size:.8rem;
    text-align: center;
    padding:3px;
    align-items: center;
    color:#222;
    height:20px;
    width:20px;
    margin-right:15px
   }
   .p-thc{
    font-size:.8rem;
     color:#222
   }
   @media screen  and (max-width:490px){

    h2{
        font-size:1rem
    }
   }
   .info-rfer-user{
    display:flex;
    justify-content: space-between;;
    background: #fff;
    padding:10px
   }
   .nhy-ck{
    font-size:1rem
   }
   .fa-user{
    font-size:1rem;
    margin-right:15px
   }
</style>