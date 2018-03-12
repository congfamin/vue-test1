<template>
    <div>
        <h2>我是子组件的标题</h2>
        <slot>
            只有在没有要分发的内容时才会显示。
        </slot> 
        <slot name="never">
            never forget
        </slot> 
        <h4>{{ myValue }}</h4>
    </div>  
</template>

<script>
export default {
    props: [ 'value' ],
    data(){
        return {
            myValue: this.value
        }
    }

}
</script>

<style>


</style>
