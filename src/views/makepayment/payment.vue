<template>
    <div>
     <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      :color="color"
    />
        <Header />

        <div class="rg-c">
            <div class="gc-x">
              <h2 class="hc-x" style="text-align:center">&#8358;{{Intl.NumberFormat().format(redam)}}</h2>
               
                <main>
                <Message :status="status" :message="message"/>
                <form action="" @submit.prevent="handleSubmit">
                <div class="ml-xf">
                       <div class="lcl-xj" >
                        <div class="acc-de">
                            <div class="each-de">
                                <p>Meter Name</p>
                                <p>{{metername}}</p>
                            </div>
                            <div class="each-de">
                                <p>Amount</p>
                               <p>&#8358;{{Intl.NumberFormat().format(amount)}}</p>
                            </div>
                            <div class="each-de">
                                <p>Transaction Fee</p>
                               <p>&#8358;{{Intl.NumberFormat().format(tfee)}}</p>
                            </div>
                            <div class="each-de">
                                <p>Meter Number</p>
                               <p>{{billersCode}}</p>
                            </div>
                            <div class="each-de">
                                <p>Service</p>
                               <p>{{service}}</p>
                            </div>
                            <div class="each-de">
                                <p>Meter Type</p>
                                <p>{{variation_code}}</p>
                            </div>
                            <div class="each-de">
                            <input type="hidden" name="" v-model="billersCode">
                            <input type="hidden" name="" v-model="serviceID">
                            <input type="hidden" name="" v-model="variation_code">
                            <input type="hidden" name="" v-model="amount">
                            <input type="hidden" name="" v-model="phone">
                               <button :disabled="isDisabled" style="width:100%;margin-top:20px">{{btnText}}</button>
                            </div>
                        </div>
                          

                       
                        </div>
                        
                    </div>
                    </form>
                </main>
            </div>
        
        </div>
    </div>
</template>
<script>
import Header from '../../components/header.vue'
import moment from 'moment'
import Message from '../../components/message.vue'
import axios from 'axios'

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
    name:'Account-app',
    components:{Header,Message,Loading},
    data() {
        return {
           
            password:'',
           
            status:null,
            message:'',
            btnText:'Payment',
            isDisabled:false,
            receiver:'',
            token:'',
            accountNumber:'',
            bankName:'',
            accountName:'',
             isLoading: true,
            fullPage: true,
            balance:'',
            request_id:'',
            serviceID:'',
            billersCode:'',
            variation_code:'',
            amount:0,
            phone:'',
            service:'',
            ename:'',
            type:'',
             usertype:'',
            redam:0,
            tfee:0.00,
             color: "#0A1AA8",

        }

    },
    methods: {
      
    
     async  handleSubmit(){
       
            this.btnText ='Loading'
            if(this.balance >= this.amount+parseInt(this.tfee)){
               const current = new Date();
                 const data = {
                reciever:this.billersCode,
                type:this.type,
                status:1,
                ref: moment(current).format('YYYYMMDDHHm')+ (Math.random()*1000),
                amount:this.redam,
                plan:this.variation_code,
                name: this.metername,
                network:this.ename,
                cref:moment(current).format('YYYYMMDDHHm'),
                serveid:this.serviceID,
                ph:this.phone,
                am:this.amount,
                bi:this.billersCode,
                variationcode:this.variation_code,
                requestid:moment(current).format('YYYYMMDDHHm')+ (Math.random()*1000),
                fr:'',
                st:this.ename
              


            }
          const datas  = JSON.parse(localStorage.getItem('user'));
          this.token = datas.data.token
             try{
               const response = await axios.post(`${process.env.VUE_APP_BASE_URL}api/transaction`,data,{
                    headers:{
                    Authorization: "Bearer "+ this.token
                  }
                  })
                   if(response.data.data.code > '000' ){
                  this.status = false
                  this.message = response.data.data.response_description
                   this.setTimeout = setTimeout(()=>{
                    this.status = null
                      this.btnText = 'Payment'
                   this.isDisabled=false
                
             },3000)

               }else{

              
               
                 this.status = true
                    this.message = response.data.data.response_description
                this.setTimeout = setTimeout(()=>{
                    this.$router.push('/account/dashboard')
                    
                },3000)
               }   
                   
                   
              }catch(e){
              if(e.response.status==400 || e.response.status==422){
                     this.isDisabled =false
                    this.status= false
                     this.message = e.response.data.message
                  this.btnText = 'Payment'
                   this.isDisabled=false
                   this.interval = setTimeout(()=>{
                    this.status = null
                       
                     },3000)
                }else{
                    this.status= false
                     this.message = 'Connection problem, try checking your network'
                      this.isDisabled=false
                       this.interval = setTimeout(()=>{
                    this.status = null
                      this.btnText = 'Payment'
                       
                     },3000)
                }
            }
            }else{
              this.status = false
              this.message = 'Insufficient Balance, Kindly fund your wallet.'
            }
             this.interval = setTimeout(()=>{
                    this.status = null
                      this.btnText = 'Payment'
                       
                     },3000)
            //const current = new Date();
            /*
            const data ={
                request_id: moment(current).format('YYYYMMDDHHm'),
                serviceID:this.serviceID,
                billersCode :this.billersCode,
                variation_code:this.variation_code,
                amount:this.amount,
                phone:this.phone,
              
            }
          
           
             const string = 'Basic ' + btoa('iy6935781@gmail.com:1234567')
            try{
                const response = await axios.post(`https://sandbox.vtpass.com/api/pay`,data,
                 {
                        headers: {
                            Authorization: string
                        }
                    }
                )
              
             if(response.data.code=='000'){
              */
               

         
            /*
             }else{
                 this.status= false,
                this.message = 'Something went wrong'
                this.isDisabled =false
                 this.interval = setTimeout(()=>{
                    this.status = null
                      this.btnText = 'Payment'
                      
                       
                  },3000)
             }
           
            }
            catch(e){
              if(e.response.status==400 || e.response.status==422){
                     this.isDisabled =false
                    this.status= false
                     this.message = e.response.data.message
                  this.btnText = 'Payment'
                   this.isDisabled=false
                   this.interval = setTimeout(()=>{
                    this.status = null
                       
                     },3000)
                }else{
                    this.status= false
                     this.message = 'Connection problem, try checking your network'
                      this.isDisabled=false
                       this.interval = setTimeout(()=>{
                    this.status = null
                      this.btnText = 'Payment'
                       
                     },3000)
                }
            }

        
        
        }*/
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
          
        
           this.usertype = user.data.data.type
        
        }catch(e){
            e
        }
        const billdata  = JSON.parse(localStorage.getItem('bill'));
            this.amount =parseInt(billdata.amount)
            this.serviceID = billdata.serviceID
            this.billersCode = billdata.billersCode
            this.variation_code = billdata.variation_code
            this.phone = billdata.phone
            this.service = billdata.ename
            this.metername = billdata.metername
            this.ename= billdata.ename
            this.type = billdata.type
            try{
                 const response =  await  axios.get(`${process.env.VUE_APP_BASE_URL}api/getmanagement`)
                if(this.usertype=='1' && this.type=='5'){
                  this.redam  =parseInt(this.amount) + parseInt(response.data.data.nelect ) 
                  this.tfee = response.data.data.nelect

                  
                }else if(this.usertype=='2' && this.type=='5'){
                  this.redam = parseInt(this.amount) + parseInt(response.data.data.melect ) 
                    this.tfee = response.data.data.melect
                                      

                }else if(this.usertype == '1' && this.type=='3'){
                  this.redam  =parseInt(this.amount) + parseInt(response.data.data.ncable )
                  this.tfee = response.data.data.ncable
                                    

                }else if(this.usertype =='2' && this.type=='3'){
                  this.redam  =parseInt(this.amount) + parseInt(response.data.data.mcable )
                  this.tfee = response.data.data.mcable
                }
                  this.isLoading = false
            }catch(e){
                e.response
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
         this.bankName = user.data.data.bankname
          this.accountName = user.data.data.accountName
           this.accountNumber = user.data.data.bank
           this.balance = parseInt(user.data.data.balance)
          
           this.usertype = user.data.data.type
         
          
        }catch(e){
            e
        }
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
    max-width:500px;
    width:100%;
    margin:120px auto;
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
         margin-top:100px

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
   
  
     padding:10px;
     color:#fff;
     
  }
 p{
    font-size:1rem !important
 }
 .each-de{
  
    padding:3px;
    font-size:1rem;
    display:flex;
    justify-content: space-between;
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