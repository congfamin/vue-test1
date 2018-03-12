<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            id: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '80%'
            },
            height: {
                type: String,
                default: '200px'
            }
        },
        data() {
            return {
                chart: null
            };
        },
        mounted() {
        this.initChart();
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose();
            this.chart = null;
        },
        methods: {
            initChart() {
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption({
                    //backgroundColor:'#40EFFF',
                    // title: {
                    //     text: '日负荷曲线（单位：kW）',
                    //     left:'10%',
                    //     textStyle:{
                    //         // color:'#ccc',//文字颜色
                    //         fontStyle:'normal',//字体风格,'normal','italic','oblique'
                    //         fontWeight:'bold',//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                    //         fontFamily:'sans-serif',//字体系列 
                    // 　　　　 fontSize:14//字体大小
                    //     },
                    //     subtextStyle:{
                    //         color:'#000',//文字颜色
                    //         fontStyle:'normal',//字体风格,'normal','italic','oblique'
                    //         fontWeight:'bold',//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                    //         fontFamily:'sans-serif',//字体系列 
                    // 　　　　 fontSize:18//字体大小
                    //     }
                    // },
                    grid: {
                        containLabel: true,
                        backgroundColor:'#CCC'
                    },
                    tooltip: {
                        trigger: 'axis',
                    },
                    legend: {
                        top:'top',
                        left:'10%',
                        data:['昨日','今日'],
                        textStyle:{    
                                color:'#000',//文字颜色
                                fontStyle:'normal',//字体风格,'normal','italic','oblique'
                                fontWeight:'normal',//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                                fontFamily:'sans-serif',//字体系列 
                        　　　　 fontSize:10//字体大小
                        },
                    },
                    toolbox: {
                        show: true,
                        left:'80%',
                        feature: {
                            // dataZoom: {
                            //     yAxisIndex: 'none'
                            // },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        splitLine:{show: true},
                        axisLine: {show: true},
                        boundaryGap: true,
                        interval: '4',
                        data: ['0:00','0:15','0:30','0:45','1:00','1:15','1:30','1:45','2:00','2:15','2:30','2:45',
                        '3:00','3:15','3:30','3:45','4:00','4:15','4:30','4:45','5:00','5:15','5:30','5:45',
                        '6:00','6:15','6:30','6:45','7:00','7:15','7:30','7:45','8:00','8:15','8:30','8:45',
                        '9:00','9:15','9:30','9:45','10:00','10:15','10:30','10:45','11:00','11:15','11:30','11:45',
                        '12:00','12:15','12:30','12:45','13:00','13:15','13:30','13:45','14:00','14:15','14:30','14:45',
                        '15:00','15:15','15:30','15:45','15:00','15:15','15:30','15:45','17:00','17:15','17:30','17:45',
                        '18:00','18:15','18:30','18:45','19:00','19:15','19:30','19:45','20:00','20:15','20:30','20:45',
                        '21:00','21:15','21:30','21:45','22:00','22:15','22:30','22:45','23:00','23:15','23:30','23:45']
                    },
                    yAxis: {
                        type: 'value',
                        splitLine:{show: true},
                        axisLine: {show: true},
                        axisLabel: {
                            formatter: '{value} kW'
                        },
                    },
                    series: [
                        {
                            name:'昨日',
                            type:'line',
                            smooth:true,//曲线平滑
                            data:[22,25,26,20,18,20,19,25,23,20,18,15,18,19,17,20,22,18,15,15,17,18,25,20,34,90,100,105,
                            100,110,130,115,160,175,180,193,200,206,213,215,210,215,227,219,209,215,210,220,232,243,240,227,
                            237,221,243,231,225,221,214,230,213,231,226,244,242,239,236,214,206,203,197,200,189,194,181,174,
                            175,164,155,166,154,160,142,136,124,119,113,97,84,85,80,76,54,43,27,24],
                            itemStyle : {  
                                normal : {  
                                    color:'#00A2B1',  
                                    lineStyle:{  
                                        color:'#40EFFF',
                                        width:'3' 
                                    },
                                    // areaStyle: {   //填充样式
                                    //     type: 'default'
                                    // }, 
                                }  
                            },
                            markLine: {
                                 symbol: 'circle',
                            }
                        } , 
                        {
                            name:'今日',
                            type:'line',
                            smooth:true,
                            data:[24,21,22,24,19,20,24,22,26,21,18,17,20,21,20,21,22,19,16,15,18,19,25,20,36,93,105,103],
                            itemStyle : {  
                                normal : {  
                                    color:'#C12F8B',
                                    lineStyle:{  
                                        color:'#FF00A0',
                                        width:'4' 
                                    },  
                                    // areaStyle: {
                                    //     type: 'default'//填充样式
                                    // } 
                                }
                            } ,
                            markLine: {
                                symbol: 'circle',
                            }
                        }
                    ]
                })
            }     
        }
    }
</script>