<template>
    <div>
        <Header2 />

        <div class="rg-c">
            <div class="gc-x">
              <h2 class="hc-x">Reset Password</h2>
                <main>
                <Message :status="status" :message="message"/>

                <form @submit.prevent="handleSubmit">
                    
                    <div class="ml-xf">
                        <label for="email">Password</label> <br>
                         <input type="password" placeholder="Enter your Email or Username" v-model="password" required>
                    </div>
                    
                     <div class="ml-xf">
                        <label for="number"> ComfirmPassword</label>
                         <input type="password" placeholder="********" v-model="cpassword" required autocomplete="" 
                         @blur="confirmPaswword"
                         >
                         
                    </div>
                     <div class="ml-xf">
                        <label for="number"> PIN (sent  to your email or Phone Number</label>
                         <input type="password" placeholder="********" v-model="pin" required autocomplete="">
                         
                    </div>
                    <div class="ml-xf" >
                      <button :disabled="isDisabled" style="margin-top:10px !important">{{btnText}}</button>
                    </div>
                     <div class="ml-xf xdir" style="margin-top:20px">
                        <router-link to="/panel/register" class="vdir">Do not have an account? Register</router-link>
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
            cpassword:'',
            pin:'',
            password:'',
            status:null,
            message:'',
            btnText:'Reset',
            isDisabled:true,

        }
    },
    methods: {
        confirmPaswword(){
            if(this.password == this.cpassword){
                this.isDisabled =false
            }else{
                this.isDisabled =true
                this.status = false
                this.message = 'Password doesnt match'
                  this.interval = setTimeout(()=>{
                    this.status = null
                       
                },3000)
            }
        },
        async handleSubmit(){
            this.btnText = 'Loading'
            this.isDisabled =true
            const datas  = JSON.parse(localStorage.getItem('pass'));
            console.log(datas)

            const data = {
                code:this.pin,
                password:this.password,
                phone:datas.phone
            }
            try{
                const response = await axios.post(`${process.env.VUE_APP_BASE_URL}api/resetpasswordwithcode`,data);
               this.p_status =response.data.data.p_status
              
                if(this.p_status == "true"){
                 

                   this.status = true,
                  this.message = response.data.message
                    this.interval = setTimeout(()=>{
                    this.status = null,
                        this.$router.push('/panel/login')
                     },3000)
                }else{
                  this.status=false,
                  this.message = 'Your Phone number has not been verified'
                   const getdata  = JSON.parse(localStorage.getItem('data'));
                    const datas = {
                      phone:getdata.phone
                    }
                     await axios.post(`${process.env.VUE_APP_BASE_URL}api/auth/verifyphone`,datas);
                      this.$router.push('/panel/verify')

                }
                  
            }catch(e){
             if(e.response.status==400 || e.response.status==422){
                     this.isDisabled =false
                    this.status= false
                     this.message = e.response.data.message
                  this.btnText = 'Reset'
                   this.isDisabled=false
                   this.interval = setTimeout(()=>{
                    this.status = null
                       
                     },3000)
                }else{
                    this.status= false
                     this.message = 'Connection problem, try checking your network'
                      this.isDisabled=false
                      this.btnText = 'Reset'
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
  .forget{
    font-size:0.9rem;
    width:100%;
    text-align: right !important;
    color:#0A1AA8 !important;
    
    font-weight:800;
    float:right;
    margin:10px
  }
  
   
</style>