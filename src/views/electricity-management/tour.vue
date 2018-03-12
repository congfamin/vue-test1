<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>性别</th>
        <th>身高</th>
        <th>选择</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index, key) in tableData" :key="key">
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.sex }}</td>
        <td>{{ item.height }}</td>
        <td><input type="checkbox" :value="index" v-model="selectArr"></td>
      </tr>
      <tr>
        <td colspan="5">
          <el-button type="warning" @click="delRow">删除勾选</el-button>
        </td>
      </tr>
      <tr>
        <td colspan="5">{{ selectArr }}</td>
      </tr>
      </tbody>
    </table>
    <!-- <ul> <li v-for="(item, index) in proData"> 
    <label for=""> 
    <input type="checkbox" :value="index" v-model="selectArr"> 
    </label>{{item.name}} 
    </li>： 
    </ul> 
    <button type="" @click="del">删除</button>{{selectArr}} 
    <label> 
    <input type="checkbox" class="checkbox" @click="selectAll" />全选 
    </label>  -->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [
          {
            name: '小明',
            age: '14',
            sex: '男',
            height: '165'
          }, {
            name: '小明',
            age: '14',
            sex: '男',
            height: '165'
          }, {
            name: '小明',
            age: '14',
            sex: '男',
            height: '165'
          }, {
            name: '小明',
            age: '14',
            sex: '男',
            height: '165'
          }, {
            name: '小明',
            age: '14',
            sex: '男',
            height: '165'
          }, {
            name: '小明',
            age: '14',
            sex: '男',
            height: '165'
          }
        ],
        selectArr: []
      }
    },
    methods: {
      delRow () {
        let arr = []
        var len = this.tableData.length
        for (var i = 0; i < len; i++) {
          if (this.selectArr.indexOf(i) != -1) {
            console.log(this.selectArr.indexOf(i))
          } else {
            arr.push(this.tableData[i])
          }
        }
        this.tableData = arr
        this.selectArr = []
      },
      // selectAll(event) {
      //   var _this = this;
      //   console.log(event.currentTarget)
      //   if (!event.currentTarget.checked) {
      //     this.selectArr = [];
      //   } else { //实现全选
      //     _this.selectArr = [];
      //     _this.tableData.forEach(function(item, i) {
      //       _this.selectArr.push(i);
      //     });
      //   }
      // }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  table {
    width: 100%;
    text-align: center;
  }

  tr, th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }

  th {
    background-color: rgb(238, 241, 246);
    min-width: 50px
  }

  .tr:hover {
    background-color: rgb(238, 241, 246);
  }
</style>