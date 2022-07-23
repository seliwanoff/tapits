<template>
    <div v-if="isSelected">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'Ccc-app',
    props:{
        isSelected:{
            type:Boolean
        }
    }
}
</script>