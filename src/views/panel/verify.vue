<template>
    <div>
        <Header2 />

        <div class="rg-c">
            <div class="gc-x">
              <h2 class="hc-x">Verification</h2>
                <main>
                <Message :status="status" :message="message"/>

                <form @submit.prevent="handleSubmit">
                    
                    <div class="ml-xf">
                        <label for="email">Enter Code</label> <br>
                         <input type="id" placeholder="Enter the code sent" v-model="code" required maxlength="4">
                    </div>
                    
                     
                    <div class="ml-xf">
                      <button :disabled="isDisabled">{{btnText}}</button>
                    </div>
                    
                    </form>
                </main>
            </div>
        
        </div>
    </div>
</template>
<script>
import Header2 from '../../components/header2.vue'
import Message from '../../components/message.vue'
import axios from 'axios'
export default {
    name:'Register-app',
    components:{Header2,Message},
    data() {
        return {
           code:'',
            status:null,
            message:'',
            btnText:'Verify',
            isDisabled:false

        }
    },
    methods: {
        
        async handleSubmit(){
            this.btnText = 'Loading'
            this.isDisabled =true
             const getdata  = JSON.parse(localStorage.getItem('data'));
           
            const data = {
               code:this.code,
               phone:getdata.phone
              
           }
            try{
              const response = await axios.post(`${process.env.VUE_APP_BASE_URL}api/auth/confirm_phone`,data);
               console.log(response)
                this.status = true,
                this.message = response.data.message
                  this.interval = setTimeout(()=>{
                    this.status = null,
                        this.$router.push('/panel/login')
                     },3000)
            }catch(e){
               if(e.response.status==400 || e.response.status==422){
                     this.isDisabled =false
                    this.status= false
                     this.message = e.response.data.message
                  this.btnText = 'Verify'
                   this.interval = setTimeout(()=>{
                    this.status = null
                       
                     },3000)
                }else{
                    this.status= false
                     this.message = 'Connection problem, try checking your network'
                       this.interval = setTimeout(()=>{
                    this.status = null
                       
                     },3000)
                }
              

               
            }

        }
    },
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
    width:100%;
    padding:10px;
    
   }
    .xdir,.vdir{
   
    font-size: 0.9rem;
   
  }
  
   
</style>