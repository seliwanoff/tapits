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
              <h2 class="hc-x">Schedule Details</h2>
               
                <main>
                <form action="" @submit.prevent="handleSubmit">
                <div class="ml-xf">
                       <div class="lcl-xj" >
                        <div class="acc-de">
                            
                            <div class="each-de">
                                <p  class="bfn">Amount</p>
                               <p>&#8358;{{Intl.NumberFormat().format(amount)}}</p>
                            </div>
                            
                            <div class="each-de">
                                <p  class="bfn">Receiver</p>
                               <p>{{receiver}}</p>
                            </div>
                            <div class="each-de" >
                                <p  class="bfn">Network</p>
                               <p v-if="network==1">MTN</p>
                               <p v-else-if="network==2">Airtel</p>
                               <p v-else-if="network==3">9mobile</p>
                                <p v-else-if="network==4">GLO</p>
                               
                            </div>
                            <div class="each-de" v-if="plan!=null">
                                <p  class="bfn">Service/Plan</p>
                               <p >{{plan}}</p>
                               
                            </div>
                            <div class="each-de">
                                <p  class="bfn">Start</p>
                               <p>{{moment.unix(start).format('DD-MM-YYYY')}}</p>
                            </div>
                             <div class="each-de">
                                <p  class="bfn">End</p>
                               <p>{{moment.unix(end).format('DD-MM-YYYY')}}</p>
                            </div>
                             <div class="each-de">
                                <p  class="bfn">Time</p>
                               <p>{{time}}</p>
                            </div>
                             <div class="each-de">
                                <p  class="bfn">Occurrence</p>
                               <p>{{occurence}}</p>
                            </div>

                            <div class="each-de">
                                <p  class="bfn">Status</p>
                               <p v-if="status==1">Successful</p>
                                <p v-else>Failed</p>
                            </div>
                            <div class="each-de">
                                <p class="bfn">Date</p>
                               <p>{{moment(date).format('DD-MM-YYYY')}}</p>
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
 
export default {
    name:'Details-app',
    components:{Header,Loading},
    data() {
        return {
            message:'',
            ref:this.$route.params.ref,
            date:'',
            amount:0.00,
            status : '',
            network:'',
            receiver :'',
            moment:moment,
            name:'',
            isLoading: true,
            fullPage: true,
            color:'#0A1AA8',
            time:'',
            start:'',
            fr:'',
            occurence:'',
            plan:''
        }

    },
    methods: {
      
    
    
    },
    async mounted(){
     
            const data  = JSON.parse(localStorage.getItem('datas'));
           this.ref= data.ref,
           this.amount = data.amount,
           this.receiver = data.receiver,
           this.status = data.status,
           this.date = data.date,
           this.network = data.network,
           this.end =parseInt(data.end),
           this.start =parseInt(data.start),
           this.time = data.time,
           this.occurence = data.occurence
           this.plan =data.plan,
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
    font-size:0.8rem !important
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