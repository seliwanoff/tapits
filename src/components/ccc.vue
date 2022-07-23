<template>
    <div style="width:100%">
        <ul class="ul">
        <li v-for="tab in tabs" :key="tab" >
            <a :class="{active:tab===selected}" @click="setTab(tab)">
                {{tab}}
            </a>
        
        </li>
        </ul>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'Ccc-nav',
    props:{
        tabs:{
            type:Array,
            required:true
        },
        selected:{
            type:String,
            required:true
        }
    },
    methods: {
        setTab(tab){
            this.$emit('selected',tab)
        }
    },
}
</script>
<style scoped>
ul{
    display: flex;
    justify-content: space-around;

}
ul li{
   
    padding:10px;
    border-radius: 10px;
    cursor: pointer;
    font-size:0.8rem;
    border: none !important;
    height: auto !important;
   
   

}
li:hover {
    background: none !important;
}
a{
    padding:10px;
    box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
    min-width:130px;
    border-radius: 10px;
    text-align: center;
    color:#000;
    background:#fff
}
.active {
    border-bottom:2px solid #0A1AA8;
    background:#0A1AA8;
    width:100%;
    padding:10px;
    color:#fff;
   box-shadow: 0px 1px 15px 1px rgb(62 57 107 / 7%);
   min-width:130px;
   border-radius: 10px;
   text-align: center;

}
@media screen and (max-width:499px) {
    a{
        max-width:100px;
        min-width:100px
    }
}
</style>