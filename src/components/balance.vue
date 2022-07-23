<template>
    <div class="main">
        <div class="mlc-dcd">
            <div class="xl-plc" @show="hideme"></div>
            <div class="shw-lft-col">
                <div class="bal-col">
                    <div class="hl-depo">
                        <div class="main-bal-col">
                            <span class="bal-tp">Your Tap Balance</span> <br>
                             <span  class="bal-tp" style="font-weight:bold">&#8358;{{Intl.NumberFormat().format(balance)}}.00</span>
                        </div>
                        <div>
                            <button>Fund <span class="fa fa-paper-plane"></span> </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="mlc-dcd">
            <div class="xl-plc"  @show="hideme"></div>
            <div class="shw-lft-col">
                <div class="item-col">
                    <div class="service-col">
                   
                        <div class="ech-ser">
                         <router-link to="/service/transfer">
                            <div class="icon-ch">
                                <span class="fa fa-exchange"></span>
                            </div>
                            <div class="text-ch">
                                Transfer
                            </div>
                            </router-link>
                           <h4></h4>
                        </div>
                        
                         <div class="ech-ser">
                         <router-link to="/service/airtime">
                            <div class="icon-ch">
                                <span class="fa fa-phone"></span>
                            </div>
                            <div class="text-ch">
                                Buy Airtime
                            </div>
                            </router-link>
                           <h4></h4>
                        </div>
                         <div class="ech-ser">
                         <router-link to="/service/data">
                            <div class="icon-ch">
                                <span class="fa fa-wifi"></span>
                            </div>
                            <div class="text-ch">
                                Buy Data
                            </div>
                            </router-link>
                           <h4></h4>
                        </div>
                        
                    </div>
                    <div class="service-col">
                        <div class="ech-ser">
                         <router-link to="/service/cable">
                            <div class="icon-ch">
                                <span class="fa fa-tv"></span>
                            </div>
                            <div class="text-ch">
                                Cable & Tv
                            </div>
                            </router-link>
                           <h4></h4>
                        </div>
                         <div class="ech-ser">
                         <router-link to="/service/bill">
                            <div class="icon-ch">
                                <span class="fa fa-phone"></span>
                            </div>
                            <div class="text-ch">
                                Bill Payment
                            </div>
                            </router-link>
                           <h4></h4>
                        </div>
                         <div class="ech-ser">
                         <router-link to="/service/refer">
                            <div class="icon-ch">
                                <span class="fa fa-sack-dollar"></span>
                            </div>
                            <div class="text-ch">
                                Refer and Earn
                            </div>
                            </router-link>
                           <h4></h4>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
    
    </div>
</template>
<script>
export default {
    name:'Balance-app',
    data() {
        return {
            balance:0,
            hideme:''
        }
    },
     props:[
        'hideme'
    ]

}
</script>
<style scoped>
    .main{
       width:100%;
       
        
    }
    .mlc-dcd{
        margin:10px;
        padding: 10px;
       
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
    }
    .xl-plc{
      border:1px solid red;
      width: 254px;
    }
    .shw-lft-col{
       
        margin:10px;
        padding:10px;
       
        width:calc(100% - 244px)
    }
    .bal-col{
        color:#fff;
        font-size: 1.2rem;
        background: #0A1AA8 ;
        border: 1px solid #0A1AA8 ;
        border-radius: 10px;
        padding:10px
    }
    .item-col{
        
        font-size: 1.2rem;
        background: #fff ;
        border: 1px solid #fff ;
        border-radius: 10px;
        padding:10px;
        box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
}
    .hl-depo{
        height:60px;
        margin:10px;
        padding:10px;
        border:1px solid black;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }
    .bal-tp{
        font-size: 1rem;
        color:#ccc;
    }
    button{
        padding:5px;
        outline:none;
        color:#0A1AA8;
        font-weight: 600;
    }
    .fa-paper-plane{
        color:#0A1AA8 !important
    }
    .service-col{
        display: flex;
        justify-content: space-between;
        margin:10px;
        padding:10px;
       
    }
    .ech-ser{
        padding:10px;
        border:1px solid #ccc;
        border-radius: 20px;
        min-height:70px;
        width:calc(100% / 2.5);
        margin:10px
    }
    .icon-ch{
        align-content: center;
        display: flex;
       
        place-content: center;
        padding:10px;
        line-height: 2;
        
    }
    .text-ch{
        font-size: 0.9rem;
        text-align: center;
        margin-top:5px
    }
     @media screen  and (max-width:490px){
    .xl-plc{
        display: none;
    }
    .shw-lft-col{
        width:100%
    }
    .text-ch{
        font-size:0.7rem
    }
    
  }
</style>