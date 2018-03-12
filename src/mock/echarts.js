import Mock from 'mockjs'

export default {
    getDashboard: () => ({
        data: [{
                value: 37666, 
                name: '一号进线',
                // itemStyle : {  
                //     normal : {  
                //         color: '#00F4FF',  
                //     }  
                // }, 
            },{
                value: 24316, 
                name: '二号进线',
                // itemStyle : {  
                //     normal : {  
                //         color: '#FF40B0',  
                //     }  
                // }, 
            },{
                value: 11278, 
                name: '三号进线',
                selected:true,
                // itemStyle : {  
                //     normal : {  
                //         color:'#DD73FF',  
                //     }  
                // }, 
            }
        ],
        data1: [{
            value: 22988,
            name: '变压器1',
            // itemStyle : {  
            //     normal : {  
            //         color:'#1874CD',  
            //         }  
            //     }
            },{
            value: 14678,
            name: '变压器2',
            // itemStyle : {  
            //     normal : {  
            //         color: '#20B4BF',  
            //         }  
            //     }
            },{
            value: 12863,
            name:'变压器3',
            // itemStyle : {  
            //     normal : {  
            //         color: '#FF73C5',  
            //         }  
            //     }
            },{
            value: 11453,
            name:'变压器4',
            // itemStyle : {  
            //     normal : {  
            //         color: '#9400D3',  
            //         }  
            //     } 
            },{
            value: 11278,
            name: '变压器5',
            // itemStyle : {  
            //     normal : {  
            //         color: '#DD73FF',  
            //         }  
            //     }
            }
        ]
    }),
    getShuntElctricityFive: () => ({
        data: []
    })
}