<template>
    <div>
        {{ myMessage }}
        <br>
        <el-button @click="chilCall()">点击触发</el-button>
    </div>
</template>

<script>
export default {
    props: { 
        myMessage: {
            type: String,
            default: '我勒个去'
            //必传
            //required: true
        } 
    },
    data(){
        return {
            msg: '我是子组件传过来的',
        }
    },
    methods: {
        chilCall(){
            // 子组件通过$emit来触发事件，将参数传递出去。
            this.$emit('newNodeEvent', this.msg)
        }
    }

}
</script>

<style>


</style>
