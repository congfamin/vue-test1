<template>
    <div class="tree">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <br><br>
        <el-tree 
        class="filter-tree"
        :data="treeData"
        :props="defaultProps" 
        :filter-node-method="filterNode"
        :expand-on-click-node="false"
        :highlight-current="true"
        default-expand-all
        @node-click="show"
        ref="tree">
        </el-tree>
    </div>
</template>

<script>
  export default {
    props: ['treeData'],
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      show(node) {
        // console.log(node.label);
        this.$emit('nodeEvent', node.label);
      }
    },
    data() {
      return {
        // router:[],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>

<style>
.el-tree{
    max-height: 350px; 
    overflow-y: auto; 
} 
</style>
