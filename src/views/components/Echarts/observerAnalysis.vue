/* * @Author: Hano.zhang * @Date: 2018-01-25 10:44:58 * @Last Modified by: wangtengfei * @Last Modified time: 2018-01-30
16:07:27 */

<template lang="html">
    <section>
        <!-- 观察户分析 -->

        <Row>
            <Col :xs="24" :sm="24" :md="24">
            <div id='observerAnalysis' style='min-width:20%;height:320px'>
            </div>
            </Col>
        </Row>

    </section>
</template>

<script>
    import echarts from "echarts";
    // 全国总平均稼动率
    export default {
        name: "observerAnalysis",
        props: {
            barWidth: {
                type: Number,
                default: 35
            },
            textSize: {
                type: Number,   
                default: 12
            },
            xData: {
                type: Array,
                default: []
            },
            allCustomer: {
                type: Array,
                default: []
            },
            observer: {
                type: Array,
                default: []
            },
            observerOur: {
                type: Array,
                default: []
            },
            observerNur:{
                type: Array,
                default: []
            },
            observerUr:{
                type: Array,
                default: []
            }
        },
        data() {
            return {
                
            }
        },
        methods: {
            cerateView(){
                var colors = ["#5793f3", "#d14a61", "#675bba"];
                var observerAnalysis = echarts.init(
                    document.getElementById("observerAnalysis")
                );
                const option = {
                    backgroundColor: "white",
                    title: {
                        show: false,
                        text: "观察户分析表",
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
                            },
                        },
                        formatter:function(params){
                            var res='';
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
                        top: 100,
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
                            fontSize: this.textSize

                        },
                        itemWidth: this.barWidth,
                        data: ["总客户数","观察户数",'','观察户平均稼动率','全国总平均稼动率','正常客户平均稼动率'],
                        selected:{
                            '全国总平均稼动率' : false,
                            '正常客户平均稼动率' : false
                        }
                    },
                    // toolbox: {
                    //     show: true,
                    //     top: '10%',
                    //     right: '10%',
                    //     feature: {
                    //         mark: { show: true },
                    //         dataView: { show: true, readOnly: false },
                    //         magicType: {
                    //             show: true,
                    //             type: ['line', 'bar']
                    //         },
                    //         restore: { show: true },
                    //         saveAsImage: { show: true }
                    //     }
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
                            nameTextStyle: {
                                fontSize: this.textSize
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
                        {
                            type: 'value',
                            scale: true,
                            name: '全国总平均稼动率',
                            nameTextStyle: {
                                color: "#90979c"
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#90979c"
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            max: 100,
                            min: 0,
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        }
                    ],
                    // dataZoom: [
                    //     {
                    //         show: true,
                    //         height: 20,
                    //         xAxisIndex: [0],
                    //         bottom: 30,
                    //         start: 0,
                    //         end: 100,
                    //         textStyle: {
                    //             color: "#495060"
                    //         },
                    //         borderColor: "transparent"
                    //     },
                    //     {
                    //         type: "inside",
                    //         show: true,
                    //         height: 15,
                    //         start: 1,
                    //         end: 35
                    //     }
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
                                        fontSize: this.textSize,

                                        position: "top",
                                        formatter: function (p) {
                                            return p.value > 0 ? p.value : "";
                                        }
                                    }
                                }
                            },
                            data: this.allCustomer
                        },
                        {
                            name: "观察户数",
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
                                        fontSize: this.textSize,

                                        position: "top",
                                        formatter: function (p) {
                                            return p.value > 0 ? p.value : "";
                                        }
                                    }
                                }
                            },
                            data: this.observer
                        },
                        {
                            name: "全国总平均稼动率",
                            type: "line",
                            yAxisIndex: 1,
                            lineStyle: {
                                normal: {
                                    width: 2,
                                    type: 'dotted'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "rgb(0, 255, 0)",
                                    barBorderRadius: 0,
                                    label: {
                                        show: true,
                                        position: "top",
                                        fontSize: this.textSize,

                                        formatter: function (p) {
                                            return p.value > 0 ? p.value + '%' : "";
                                        }
                                    }
                                }
                            },
                            data: this.observerUr
                        },
                        {
                            name: "观察户平均稼动率",
                            type: "line",
                            yAxisIndex: 1,
                            lineStyle: {
                                normal: {
                                    width: 2,
                                    type: 'dashed'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "rgb(255, 0, 0)",
                                    barBorderRadius: 0,
                                    label: {
                                        show: true,
                                        position: "top",
                                        fontSize: this.textSize,

                                        formatter: function (p) {
                                            return p.value > 0 ? p.value + '%' : "";
                                        }
                                    }
                                }
                            },
                            data: this.observerOur
                        },
                        {
                            name: "正常客户平均稼动率",
                            type: "line",
                            yAxisIndex: 1,
                            lineStyle: {
                                normal: {
                                    width: 2,
                                    type: 'dashed'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "rgb(0, 0, 255)",
                                    barBorderRadius: 0,
                                    label: {
                                        show: true,
                                        position: "top",
                                        fontSize: this.textSize,

                                        formatter: function (p) {
                                            return p.value > 0 ? p.value + '%' : "";
                                        }
                                    }
                                }
                            },
                            data: this.observerNur
                        },
                    ]
                };
                // observerAnalysis.setOption(option);
                // window.addEventListener("resize", function () {
                //     observerAnalysis.resize();
                // });
                let timer
                observerAnalysis.resize();
                observerAnalysis.setOption(option);
                window.addEventListener("resize", function() {
                    clearTimeout(timer)
                    timer = setTimeout(() => {
                        observerAnalysis.resize({
                            width: document.querySelector('#observerAnalysis') ? document.querySelector('#observerAnalysis').clientWidth : null
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
            this.$nextTick(() => {
                this.cerateView()
            });
        }
    };
</script>

<style lang="css">
</style>