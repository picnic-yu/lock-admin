/*
 * @Author: Hano.zhang 
 * @Date: 2018-01-25 16:33:57 
 * @Last Modified by: yinjian
 * @Last Modified time: 2018-06-19 16:07:07
 */

<template>
    <!-- 法诉客户 -->
    <section class="page">
    <Row>
        <Col :xs="24" :sm="24" :md="24" >
            <div :id='idName' style='min-width:20%;height:320px'>
            </div>
        </Col>
    </Row>
    </section>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts";

 export default {
    name:'litigationCustomer',
    props:{
        barWidth :{
            type:Number,
            default:35
        },
        textSize :{
            type:Number,
            default:12
        },
        xData: {
            type: Array,
            default: []
        },
        allCustomer: {
            type: Array,
            default: []
        },
        litigation: {
            type: Array,
            default: []
        },
        // averageUtilization: {
        //     type: Array,
        //     default: []
        // },
    },  
    components: {},

    data() {
        return {
            // xData:['苏州','上海','临沂','嘉兴','东莞','天津'],           //X轴城市
            idName:"id" + Math.floor(Math.random() * 10000),
            // allCustomer:[ 
            //             281,
            //             398,
            //             214,
            //             219,
            //             289,
            //             296
            //         ],                                           //总客户数
            // litigation:[
            //             198,
            //             330,
            //             151,
            //             160,
            //             222,
            //             229
            // ],                                             //观察户
            // averageUtilization:[                         //平均稼动率
            //             39.55,
            //             70.35,
            //             21.02,
            //             21.55,
            //             28.57,
            //             99.14           
            // ],       
        }
   
    },

    methods: {
        cerateView(){
            let litigationCustomer =echarts.init(document.getElementById(this.idName));
            const option = {
                backgroundColor: "white",
                title: {
                    show:false,  
                    text: "法诉客户分析",
                    x: "4%",
                    textStyle: {
                        color: "#fff",
                        fontSize: "22"
                    },
                    subtextStyle: {
                        color: "#90979c",
                        fontSize: "16"
                    }
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                        textStyle: {
                        color: "#fff"
                        }
                    },
                    formatter:function(params){
                            var res=''
                            params.forEach(function (item) {
                                let unit;
                                if(item.seriesType=='bar'){
                                    unit='家'
                                }else{
                                    unit='%'
                                }
                                res += `<span style="display:inline-block;
                                        margin-right:5px;
                                        border-radius:10px;
                                        width:9px;
                                        height:9px;
                                        background-color:${item.color}">
                                        </span>
                                        ${item.seriesName}: ${item.data} ${unit}
                                        <br>`
                            });
                            return res
                        } 
                },
                grid: {
                    borderWidth: 0,
                    top: 90,
                    bottom: 40,
                    left: 60,
                    right: 60,
                    textStyle: {
                        color: "#fff"
                    }
                },
                legend: {
                    x: "4%",
                    top: "5%",
                    textStyle: {
                        color: "#90979c",
                        fontSize:this.textSize
                    },
                    // itemWidth:this.barWidth,

                    data: ["总客户数","法诉客户"]
                },
                // toolbox: {
                // show : true,
                // top:'10%',
                // right:'10%',
                // feature : {
                //     mark : {show: true},
                //     dataView : {show: true, readOnly: false},
                //     magicType : {
                //         show: true,
                //         type: ['line', 'bar']
                //     },
                //     restore : {show: true},
                //     saveAsImage : {show: true}
                // }
                // },

                calculable: true,
                xAxis: [
                {
                    type: "category",
                    axisLine: {
                    lineStyle: {
                        color: "#90979c"
                    }
                    },
                    splitLine: {
                    show: false
                    },
                    axisTick: {
                    show: false
                    },
                    splitArea: {
                    show: false
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 40
                    },
                    data: this.xData
                }
                ],
                yAxis: [
                {
                    type: "value",
                    name: '客户数',
                    splitLine: {
                    show: false
                    },
                    nameTextStyle:{
                        fontSize:this.textSize
                    },
                    axisLine: {
                    lineStyle: {
                        color: "#90979c"
                    }
                    },
                    axisLabel: {
                    interval: 0
                    },
                    splitArea: {
                    show: false
                    },
                    
                },
                // {
                //     type: 'value',
                //     show:false,
                //     scale: true,
                //     name: '平均稼动率',
                //     nameTextStyle:{
                //         color: "#90979c"
                //     },
                //     axisLine: {
                //     lineStyle: {
                //         color: "#90979c"
                //     }
                //     },
                //     axisTick: {
                //     show: false
                //     },
                //     splitLine: {
                //     show: false
                //     },
                //     max: 100,
                //     min: 0,
                //     axisLabel: {
                //         formatter: '{value} %'
                //     }       
                // }
                ],
                // dataZoom: [
                // {
                //     show: true,
                //     height: 20,
                //     xAxisIndex: [0],
                //     bottom: 30,
                //     start: 0,
                //     end: 95,
                //     textStyle: {
                //        color: "#495060"
                //     },
                //     borderColor: "transparent"
                // },
                // {
                //     type: "inside",
                //     show: true,
                //     height: 15,
                //     start: 1,
                //     end: 35
                // }
                // ],
                series: [
                    {
                    name: "总客户数",
                    type: "bar",
                    barMaxWidth: this.barWidth,
                    barGap: "20%",
                    itemStyle: {
                        normal: {
                            color: "rgba(1,127,238,1)",
                            barBorderRadius: 0,
                            label: {
                            show: true,
                            position: "top",
                                formatter: function(p) {
                                    return p.value > 0 ? p.value : "";
                                }
                            }
                        }
                    },
                    data: this.allCustomer
                },
                {
                    name: "法诉客户",
                    type: "bar",
                    barMaxWidth: this.barWidth,
                    barGap: "20%",

                    itemStyle: {
                    normal: {
                        color: "rgba(44,192,254,1)",
                        label: {
                            show: true,
                            textStyle: {
                                color: "rgba(44,192,254,1)"
                            },
                            fontSize:this.textSize,

                            position: "top",
                            formatter: function(p) {
                                return p.value > 0 ? p.value : "";
                            }
                        }
                    }
                    },
                    data:this.litigation
                },
                
                // {
                //     name: "平均稼动率",
                //     type: "line",
                //     yAxisIndex:1,
                //     lineStyle: {
                //     normal: {
                //         width: 2,
                //         type: 'dashed'
                //     }
                // },
                //     itemStyle: {
                //         normal: {
                //             color: "rgba(252,230,48,.7)",
                //             barBorderRadius: 0,
                //             label: {
                //             show: true,
                //             position: "top",
                //                 formatter: function(p) {
                //                     return p.value > 0 ? p.value : "";
                //                 }
                //             }
                //         }
                //     },
                //     data: this.averageUtilization
                // },
                ]
            };
            // litigationCustomer.setOption(option);
            //     window.addEventListener("resize", function() {
            //     litigationCustomer.resize();
            // });
            let _this = this, timer
            litigationCustomer.resize();
            litigationCustomer.setOption(option);
            window.addEventListener("resize", function() {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    litigationCustomer.resize({
                        width: document.querySelector('#' + _this.idName) ? document.querySelector('#' + _this.idName).clientWidth : null
                    });
                }, 300)
            });
        }
    },
    watch: {
        xData(){
            this.cerateView()
        }
    },
    mounted() {
        this.$nextTick(()=>{
            this.cerateView()
        })
    },

 }
</script>

<style  lang='less' scoped>
 
</style>