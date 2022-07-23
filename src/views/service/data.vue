<template>
    <div>
        <Header />

        <div class="rg-c">
            <div class="gc-x">
              <h2 class="hc-x">Select  Preference</h2>
                <main>
                <Message :status="status" :message="message"/>

               
                     <router-link to="/service/single-data">
                    <div class="ml-xf">
                       <div class="lcl-xj">
                           <div class="icox-col">
                                <span class="fa fa-user icox"></span>
                             </div>
                            <div class="each-pre">
                                <h4>Single Subscription</h4>
                                <span>Subscribe for one user at a time</span>
                            </div>
                       </div>
                    </div>
                     </router-link>
                    <router-link to="/service/multiple-multiple">
                     <div class="ml-xf">

                       <div class="lcl-xj">
                       <div class="icox-col">
                         <span class="fa fa-users icox"></span>
                       </div>
                        
                          <div class="each-pre">
                                <h4>Multipe Subscription</h4>
                                <span>Subscribe for multiple at a time</span>
                            </div>
                       </div>
                    </div>
                    </router-link>
                     
                    
                     
                  
                     
                  
                </main>
            </div>
        
        </div>
    </div>
</template>
<script>
import Header from '../../components/header.vue'
import Message from '../../components/message.vue'
import axios from 'axios'
export default {
    name:'Data-app',
    components:{Header,Message},
    data() {
        return {
            phone:'',
            password:'',
            amount:'',
            status:null,
            message:'',
            btnText:'Transfer',
            isDisabled:true,
            receiver:''

        }
    },
    methods: {
        
        async handleSubmit(){
            this.btnText = 'Loading'
           
            const data = {
                phone:'234'+this.phone,
                amount:this.amount
            }
            console.log(data)
           /* try{
               
               
                  
            }catch(e){
                console.log(e)
               

               
            }*/
          

        },
          async getUser(){
              const data  = JSON.parse(localStorage.getItem('user'));
              this.token = data.data.token
            try{
              const resp = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getuser?phone=${234+this.phone.slice(1)}`,{
                headers:{
                  Authorization:"Bearer "+ this.token
                }
              });
             this.receiver = resp.data.data.fname +" "+  resp.data.data.lname

            }catch(e){
              console.log(e)
            }
              
          },
         
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
    
    max-width:500px;
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
      
        box-sizing: border-box;
         border-radius: 20px;
         margin-top:90px;

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
    background:#ccc;
    border:1px solid #2222;
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
  .lcl-xj{
   
    display: flex;
    justify-content: flex-start;
    

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

  }
  .icox-col{
    height:30px;
    width:30px;
    border-radius:100%;
   
  }
  .lcl-xj .icox{
    font-size: 1rem;
    background:#0A1AA8;
    border-radius: 100%;
     padding:5px;
     color:#fff
  }
 
</style>