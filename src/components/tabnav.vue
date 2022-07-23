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
    name:'Tab-nav',
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
    font-size:0.8rem
}
.active {
    border-bottom:2px solid #0A1AA8;

}

</style>