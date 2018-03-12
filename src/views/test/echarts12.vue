<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        props: {
            className: {
                type: String,
                default: 'chart1'
            },
            id: {
                type: String,
                default: 'chart1'
            },
            width: {
                type: String,
                default: '650px'
            },
            height: {
                type: String,
                default: '300px'
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
                    title:{
                        text: '月电量柱图(单位：kWh）',
                        left:'10%',
                        textStyle:{
                            // color:'#ccc',//文字颜色
                            fontStyle:'normal',//字体风格,'normal','italic','oblique'
                            fontWeight:'bold',//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontFamily:'sans-serif',//字体系列 
                    　　　　 fontSize:25//字体大小
                        },
                        subtextStyle:{
                            color:'#000',//文字颜色
                            fontStyle:'normal',//字体风格,'normal','italic','oblique'
                            fontWeight:'bold',//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontFamily:'sans-serif',//字体系列 
                    　　　　 fontSize:18//字体大小
                        }
                    },
                    grid: {
                        containLabel: true,
                        backgroundColor:'#CCC'
                    },
                    tooltip: {
                        trigger: 'axis',
                    },
                    legend: {
                        top:'bottom',
                        data:['上月用电','本月用电'],
                        textStyle:{    
                                color:'#000',//文字颜色
                                fontStyle:'normal',//字体风格,'normal','italic','oblique'
                                fontWeight:'normal',//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                                fontFamily:'sans-serif',//字体系列 
                        　　　　 fontSize:18//字体大小
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
                        // interval: '4',
                        data: ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日',
                        '13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日',
                        '25日','26日','27日','28日','29日','30日','31日']
                    },
                    yAxis: {
                        type: 'value',
                        splitLine:{show: true},
                        axisLine: {show: true},
                        axisLabel: {
                            formatter: '{value} kWh'
                        },
                    },
                    series: [
                        {
                            name:'上月用电',
                            type:'bar',
                            data:[1181,784,4058,3619,4241,5914,2780,1090,4466,4709,
                            4935,5120,5001,4343,4271,1187,6604,6143,5824,6486,
                            6548,3179,1805,6897,7435,7754,7643,6830,3984,2463,3403],
                            smooth:true,//曲线平滑
                            itemStyle : {  
                                normal : {  
                                    color:'#40EFFF', 
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
                            name:'本月用电',
                            type:'bar',
                            data:[1187,1487,3075,3695,2142,5314,3890,4823,6124,5932,
                            3817,4512,4256,2835,4035],
                            smooth:true,//曲线平滑
                            itemStyle : {  
                                normal : {  
                                    color:'#FF00A0',
                                    lineStyle:{  
                                        color:'#FF00A0',
                                        width:'4' 
                                    },  
                                    // areaStyle: {
                                    //     type: 'default'//填充样式
                                    // } 
                                }
                            } ,
                        }
                    ]
                })
            }
        } 
    }  
</script>