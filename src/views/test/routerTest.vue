<template>
    <div>
        <h4>Hello World</h4>
        {{ $route.params.id }}
    </div>
</template>

<script>
export default {
    created() {
        // 一个 key/value 对象，包含了 动态片段 和 全匹配片段，如果没有路由参数，就是一个空对象。
        console.log(this.$route.params);
        // 一个 key/value 对象，表示 URL 查询参数。
        // 例如，对于路径 /foo?user=1，则有 $route.query.user == 1，如果没有查询参数，则是个空对象。
        console.log(this.$route.query);
        // 完成解析后的 URL，包含查询参数和 hash 的完整路径。
        console.log(this.$route.fullPath);
    }
}
</script>

<style>

</style>