<template>
    <div>
         <template v-if="ok">
            <ul :style="{ marginBottom: distance }">
                <li :class="{active: isActive}"><h1 class="common">我是模块1</h1></li>
                <li><p :style="styleObject">content1</p></li>
                <li :style="{ marginBottom: distance }"><p>content2</p></li>
                <li><button type="button" @click="changeColor">点击切换颜色</button></li>
            </ul>
            <input type="text" placeholder="请输入一些文本">
        </template>
        <template v-else>
            <h1>我是模块2</h1>
            <input type="text" placeholder="请输入一些文本">
        </template>
        <button type="button" @click="change">点击切换模块</button> 
        
        <ul>
            <template v-for="(v,k) in dataSet">
                <li>{{ v.name }} - {{ v.age }}</li>
                <li>{{ v.address }}</li>
            </template>
        </ul>
        <!-- 按住alt不放，点击c -->
        <input @keyup.alt.67="add">
        {{ count }}
        <!-- 过渡 -->
        <div>
            <el-button @click="goHidden">点击消失</el-button>
            <transition name= "fade">
                <p v-show="hidden">我要消失啦</p>
            </transition>
        </div>
        <transition>
            <el-button :key="docState">
                {{ buttonMessage }}
            </el-button>
        </transition>
        <!-- slot 派发 -->
        <div>
            <h1>我是父组件的标题</h1>
            <my-component>
                <p>这是一些初始内容</p>
                <p>这是更多的初始内容</p>
                <p slot="never">I know</p>
            </my-component>
        </div>
        <!-- 父组件往子组件传值 -->
        <!-- props 单向数据流 -->
        <!-- 要想在子组件里修改props中数据，可以通过计算属性进行操作 -->
        <!-- props验证 -->
        <my-component :value="message"></my-component> 
        <div>
            <input type="text" v-model="myMessage">
            <br>
            <!-- 父组件使用@newNodeEvent="parentListen"监听由子组件vm.$emit触发的事件，
            parentListen接受从子组件传递过来的数据，通知父组件数据改变了。 -->
            <my-children :my-message="myMessage" @newNodeEvent="parentListen"></my-children>
            {{ childMessage }}
        </div>
        <MyChildtwo>
            <template scope="props">
                <p>hello from parent</p>
                <p>{{ props.text }}</p>
            </template>
        </MyChildtwo>
        <!-- nextTick -->
        <div class="soubox">
            <button class="showsearch" @click="showsou">搜索</button>
            <div class="sou" v-show="showit">
                <input type="text" name="" id="keywords">
                <div class="closesou" @click="hidesou">X</div>
            </div>
        </div>
        <ul>
            <li><input type="text" name="" id="" v-focus></li> 
        </ul>
        <div id="hook-arguments-example" v-demo:foo.a.b="msg"></div>

        <el-table :data="tableData5" style="width: 100%"   @expand="rowExpand">
            <el-table-column type="expand">
                <template scope="props">
                    <el-table :data="props.row.children" style="width: 100%">
                    <el-table-column label="商品 ID" prop="id">
                    </el-table-column>
                    <el-table-column label="商品名称" prop="name">
                    </el-table-column>
                    <el-table-column label="描述" prop="desc">
                    </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column label="商品 ID" prop="id">
            </el-table-column>
            <el-table-column label="商品名称" prop="name">
            </el-table-column>
            <el-table-column label="描述" prop="desc">
            </el-table-column>
        </el-table>
        <hr>
        <el-button type="primary">点击获取mock数据</el-button>
        <hr>
        日
        <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期范围"
            :picker-options="pickerOptions"
            @change="selectDate">
        </el-date-picker>
        <br>
        月
        <el-date-picker
            v-model="month"
            type="month"
            placeholder="选择月"
            @change="selectMonth">
        </el-date-picker>
        <br>
        年
        <el-date-picker
            v-model="year"
            type="year"
            placeholder="选择年"
            :picker-options="pickerOptions"
            @change="selectYear">
        </el-date-picker>
        <hr>
        <el-button type="warning" @click="dumpUser">点击跳转user</el-button>
        <el-button type="warning" @click="dumpFoo">点击跳转foo</el-button>
        </br>
        <table>
            <tbody>
                <tr>
                    <th v-for="(item, key) in tableHeader" :key="key">{{item}}</th>
                </tr>
                <tr v-for="(item, key) in newTableData" :key="key">
                    <td v-for="(item1, key) in item" :key="key">{{item1}}</td>
                </tr>
            </tbody>
        </table>
        <ul class="pagination" >
            <li v-show="current != 1" @click="current-- && goto(current)" ><a href="#">上一页</a></li>
            <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
              <a href="#" >{{index}}</a>
            </li>
            <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a href="#" >下一页</a></li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import MyComponent from './child'
import MyChildren from './children'
import MyChildtwo from './childTwo'

export default {
    components:{
        MyComponent,
        MyChildren,
        MyChildtwo
    },
    data(){
        return {
        // 分页
        current: 1,
        showItem: 5,
        allpage: 13,
        //
        tableHeader: ['电流', '电压', '负荷', '电量', '需量', '谐波'],
        newTableData: [
            {
            month: '2017-08',
            sum: '45318',
            sumM: '38478.88',
            baseM: '0',
            eM: '0',
            pM: '411.72'
            }, 
            {
            month: '2017-08',
            sum: '42458',
            sumM: '38478.88',
            baseM: '0',
            eM: '0',
            pM: '411.72'
            }, 
            {
            month: '2017-08',
            sum: '46618',
            sumM: '38898.88',
            baseM: '0',
            eM: '0',
            pM: '411.72'
            }, 
            {
            month: '2017-08',
            sum: '45318',
            sumM: '38478.12',
            baseM: '0',
            eM: '0',
            pM: '411.72'
            }, 
            {
            month: '2017-08',
            sum: '45318',
            sumM: '38478.88',
            baseM: '0',
            eM: '0',
            pM: '411.72'
            }, 
            {
            month: '2017-08',
            sum: '45318',
            sumM: '38478.88',
            baseM: '0',
            eM: '0',
            pM: '411.72'
            }, 
            {
            month: '2017-07',
            sum: '100671',
            sumM: '84510.14',
            baseM: '0',
            eM: '0',
            pM: '317.54'
            }, 
            {
            month: '2017-08',
            sum: '45318',
            sumM: '38478.88',
            baseM: '0',
            eM: '0',
            pM: '411.72'
            }, 
            {
            month: '2017-09',
            sum: '45318',
            sumM: '38478.88',
            baseM: '0',
            eM: '0',
            pM: '411.72'
            }, 
            {
            month: '2017-10',
            sum: '45318',
            sumM: '38478.88',
            baseM: '0',
            eM: '0',
            pM: '411.72'
            }, 
            {
            month: '2017-11',
            sum: '45318',
            sumM: '38478.88',
            baseM: '0',
            eM: '0',
            pM: '411.72'
            }, 
            {
            month: '2017-12',
            sum: '45318',
            sumM: '38478.88',
            baseM: '0',
            eM: '0',
            pM: '411.72'
            }
        ],
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
            ok: true,
            isActive: true,
            distance: '20px',
            count: '',
            hidden: true,
            docState: 'edited',
            message: '我是从父组件传来的值',
            myMessage: '我是从父组件传来的动态改变的值',
            childMessage: '',
            showit: false,
            msg: 'hello world',
            styleObject:{
                color: 'skyblue',
                fontSize: '32px',
                marginBottom: '20px'
            },
            dataSet: [{
                    name: '高英杰',
                    age: '45',
                    address: '七里街'
                },{
                    name: '守约人',
                    age: '24',
                    address: '能仁里'
                },{
                    name: '唐雪莹',
                    age: '18',
                    address: '大行宫'
            }],
            tableData5: [{
                id: '12987122',
                name: '好滋好味鸡蛋仔0',
                desc: '荷兰优质淡奶',
                children: [
                    {
                    id:"1",
                    name:"1",
                    desc:"1"
                    },
                    {
                    id:"2",
                    name:"2",
                    desc:"2"
                    }
                ]
                }, {
                id: '12987123',
                name: '好滋好味鸡蛋0仔',
                desc: '荷兰优质淡奶',
                children: [
                    {
                    id:"3",
                    name:"4",
                    desc:"5"
                    },
                    {
                    id:"dfg2",
                    name:"gse2",
                    desc:"shwe2"
                    }
                ]
                }, {
                id: '12987125',
                name: '好滋好味7鸡蛋仔',
                desc: '荷兰优质淡0奶',
                children: [
                    {
                    id:"234",
                    name:"123",
                    desc:"235"
                    },
                    {
                    id:"dfbg2",
                    name:"wet2",
                    desc:"wgwe2"
                    }
                ]
                }, {
                id: '12987126',
                name: '好滋好味1鸡蛋仔',
                desc: '荷兰优4质淡奶',
                children: [
                    {
                    id:"123a",
                    name:"s4",
                    desc:"we5"
                    },
                    {
                    id:"as2",
                    name:"sfr2",
                    desc:"wret2"
                    }
                ]
            }],
            listChildren:[],
            date: '',
            month: '',
            year: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            }
        }
    },
    created(){
        axios.get('/api/data').then(data => {
            console.log(data.data.data.similar);
        }).catch(error => {
            console.log("数据未获取");
        });
        // 时间选择器默认显示时间
        let nowDate = new Date();
        let yesterDay = nowDate.getTime() -  3600 * 1000 * 24;
        this.date = yesterDay;
        let myDate = nowDate.getTime();
        this.month = myDate;
        this.year = myDate;
    },
    computed:{
        buttonMessage(){
            switch (this.docState) {
                case 'saved': return 'Edit'
                case 'edited': return 'Save'
                case 'editing': return 'Cancel'
            }
        },
        pages:function(){
            var pag = [];
            if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                //总页数和要显示的条数那个大就显示多少条
                var i = Math.min(this.showItem,this.allpage);
                while(i){
                    pag.unshift(i--);
                }
            }else{ //当前页数大于显示页数了
                var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                    i = this.showItem;
                if( middle >  (this.allpage - this.showItem)  ){
                    middle = (this.allpage - this.showItem) + 1
                }
                while(i--){
                    pag.push( middle++ );
                }
            }
            return pag
        }
    },
    methods:{
        dumpUser() {
            // 路由跳转
            // 想要导航到不同的 URL，则使用 router.push 方法。
            // 这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
            // this.$router.push({path: '/test/routerTest/user?user=admin&age=24'});
            // 上下俩个方法等同
            this.$router.push({ path: '/test/routerTest/user', query: { user: 'admin', age: '24' }});
            // 命名路由
            // this.$router.push({ name: '路由测试', params: { id: 'user' }});

            // router.replace(location)
            // 跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，
            // 而是跟它的方法名一样 —— 替换掉当前的 history 记录。
            // router.go(n)
            // 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。
        },
        dumpFoo() {
            // 路由跳转
            this.$router.push({path: '/test/routerTest/foo?user=admin&age=24'});
        },
        change(){
            this.ok= !this.ok;
        },
        changeColor(){
            this.isActive= !this.isActive;
        },
        add(){
            this.count++;
        },
        goHidden(){
            this.hidden= !this.hidden;
        },
        parentListen(evtValue){
            this.childMessage = evtValue;
        },
        // nextTick
        showsou() {
            this.showit = true
            this.$nextTick(function () {
                // DOM 更新了
                document.getElementById("keywords").focus()
            })
        },
        hidesou() {
            this.showit = false
        },
    	rowExpand(row) {
            //this.listChildren = row.children;
            console.log(row)
        },
        // getData() {
        //     axios.get('/api/mockData').then(res => {
        //         console.log(res);
        //     }).catch(error => {
        //         console.log("数据未获取")
        //     });
        // },
        selectDate(val) {
            console.log(val);
        },
        selectMonth(val) {
            console.log(val);
        },
        selectYear(val) {
            console.log(val);
        },
        goto(index) {
            if(index == this.current) return;
            this.current = index;
            //这里可以发送ajax请求
        }
    },
    directives: {
        focus: {
            inserted(el){
                el.focus()
            }
        },
        demo: {
            bind(el,binding,vnode) {
                var s = JSON.stringify
                el.innerHTML = 
                    'name:' + s(binding.name) + '<br>' +
                    'value:' + s(binding.value) + '<br>' +
                    'expression:' + s(binding.expression) + '<br>' +
                    'argument:' + s(binding.arg) + '<br>' +
                    'modifiers:' + s(binding.modifiers) + '<br>' +
                    'vnode keys:' + Object.keys(vnode).join(', ') 
            }
        }
    }
}
</script>

<style>
    body{
        font-family:"Segoe UI";
    }
    li{
        list-style:none;
    }
    a{
        text-decoration:none;
    }
    .pagination {
        position: relative;
    }
    .pagination li{
        display: inline-block;
        margin:0 5px;
    }
    .pagination li a{
        padding: 0.05rem 0.1rem;
        display:inline-block;
        border:1px solid #ddd;
        background:#fff;
        color:#0E90D2;
    }
    .pagination li a:hover{
        background:#eee;
    }
    .pagination li.active a{
        background:#0E90D2;
        color:#fff;
    }
    tbody, th, tr, td {
        padding: 5px;
        border: 1px solid #ccc;
    }
    .common{
        font-size: 64px;
        margin-bottom: 20px;
    }
    .active{
        color: red;
    }
    .fade-enter-active, .fade-leave-active{
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0;
    }
    .tree {
        width: 250px;
        height: 200px;
    }
</style>