<template>
    <div>
        <Header2 />

        <div class="rg-c">
            <div class="gc-x">
              <h2 class="hc-x">Deposit Fund</h2>
                <main>
                <Message :status="status" :message="message"/>

                <form @submit.prevent="payWithMonnify">
                    
                    <div class="ml-xf">
                        <label for="email">Enter Amount</label> <br>
                         <input type="id" placeholder="Enter Amount" v-model="amount" required>
                    </div>
                    
                    
                    <div class="ml-xf" >

                     <vue-monnify
        ref="vueMonnifyButton"
        :amount="amount"
        :api-key="monnifyAPIKey"
        :contract-code="monnifyContractCode"
        :customer-email="email"
        :is-test-mode="monnifyIsTest"
        :metadata="payMetadata"
        :on-close="monnifyClose"
        :on-complete="monnifyComplete"
        :reference="payRef"
        :payment-description="'Payment reference'"
    >
      <!-- This could be an html template -->
       Make Payment
    </vue-monnify>
                    </div>
                   
                    </form>
                </main>
            </div>
        
        </div>
    </div>
</template>
<script>
import Header2 from '../../components/header.vue'
import Message from '../../components/message.vue'
//import axios from 'axios'
export default {
    name:'Register-app',
    components:{Header2,Message},
    data() {
        return {
            id:'',
            password:'',
            status:null,
            message:'',
            btnText:'Proceed to make payment',
            isDisabled:false,

        }
    },
    methods: {
       
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
    margin:150px auto;
    background: #fff;
    box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
    padding:10px;
    border-radius: 15px;
}
  @media screen  and (max-width:490px){

   .rg-c .gc-x {
    margin-top:60px;
        width:100%;
        
        box-sizing: border-box;
         border-radius: 20px;
         margin-top:120px;

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
  
   
</style>