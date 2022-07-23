<template>
    <div class="mcl">
        <div class="success" v-if="status==true">
        {{message}}
        </div>
         <div class="fail" v-if="status==false">
        {{message}}
        </div>
    </div>
</template>
<script>
export default {
    name:'Message-app',
    props:[
        'status',
        'message'
    ]
}
</script>
<style>
.mcl{
    width:100%;
  
}
.success{
    padding:10px;
    background: lightgreen;
    color:#fff;
    font-size: .9rem;
    border-radius:10px
}
.fail{
    padding:10px;
    background: crimson;
    color:#fff;
    font-size: .9rem;
    border-radius:10px   
}
</style>