/*
 * @Author: Hano.zhang 
 * @Date: 2018-01-25 16:33:57 
 * @Last Modified by: yinjian
 * @Last Modified time: 2018-06-19 16:07:01
 */

<template>
    <!-- 区域放款金额对比 -->
    <section class="page">
    <Row>
        <Col :xs="24" :sm="24" :md="24" >
            <div :id='idName' style='min-width:20%;height:350px'>
            </div>
        </Col>
    </Row>
    </section>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts";

 export default {
    name:'regionalLenders',
    components: {},

    props: {
        xData:Array, //X轴城市
        areaMoney:Array,
        areaAddMoney:Array,
        id: String
    },

    data() {
        return {
            idName: "id" + Math.floor(Math.random() * 10000),                                               
        }
   
    },

    watch: {
        xData(){
            this.createView()
        }
    },

    methods: {
        createView(){
            let regionalLenders =echarts.init(document.getElementById(this.idName));
            const option = {
                backgroundColor: "white",
                title: {
                    show:false,  
                    text: "区域放款金额对比",
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
                    }
                },
                grid: {
                    borderWidth: 0,
                    top: 100,
                    bottom: 80,
                    left: 80,
                    right: 80,
                    textStyle: {
                        color: "#fff"
                    }
                },
                legend: {
                    x: "4%",
                    top: "5%",
                    textStyle: {
                        color: "#90979c"
                    },
                    data: ["放款金额","新增放款金额"]
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
                        rotate: 40,
                        formatter: function (value, index) {
                            if(value=='undefined'){
                                return '/'
                            }
                            let str = ''
                            if(value.length > 6){
                                str = value.substring(0,6) + '...'
                                return str;
                            }else{
                                return value;
                            }
                        }
                    },
                    data: this.xData
                }
                ],
                yAxis: [
                {
                    type: "value",
                    name: '放款金额（万元）',
                    splitLine: {
                    show: false
                    },
                    axisLine: {
                    lineStyle: {
                        color: "#90979c"
                    }
                    },
                    axisLabel: {
                        interval: 0,
                    },
                    splitArea: {
                    show: false
                    },
                    axisLabel: {
                        formatter: '{value}'
                    }       
                    
                }
                
                ],
                // dataZoom: [
                // {
                //     show: true,
                //     height: 20,
                //     xAxisIndex: [0],
                //     bottom: 30,
                //     start: 0,
                //     end: 50,
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
                    name: "放款金额",
                    type: "bar",
                    barMaxWidth: 35,
                    barGap: "20%",
                    itemStyle: {
                        normal: {
                            color: "rgba(0,191,183,1)",
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
                    data: this.areaMoney
                },
                {
                    name: "新增放款金额",
                    type: "bar",
                    barMaxWidth: 35,
                    barGap: "20%",
                    itemStyle: {
                    normal: {
                        color: "rgba(255,144,128,1)",
                        label: {
                            show: true,
                            textStyle: {
                                color: "#fff"
                            },
                            position: "insideTop",
                            formatter: function(p) {
                                return p.value > 0 ? p.value : "";
                            }
                        }
                    }
                    },
                    data:this.areaAddMoney
                },
                ]
            };
            // regionalLenders.setOption(option);
            //     window.addEventListener("resize", function() {
            //      regionalLenders.resize();
            // });
            let _this = this, timer
            regionalLenders.resize();
            regionalLenders.setOption(option);
            window.addEventListener("resize", function() {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    regionalLenders.resize({
                        width: document.querySelector('#' + _this.idName) ? document.querySelector('#' + _this.idName).clientWidth : null
                    });
                }, 300)
            });
        }
    },

    mounted() {
        this.$nextTick(()=>{
            this.createView()
            this.idName = this.id ? this.id : "id" + Math.floor(Math.random() * 10000)
        })
    },

 }
</script>

<style  lang='less' scoped>
 
</style>
