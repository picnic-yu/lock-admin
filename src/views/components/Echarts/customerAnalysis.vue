<template lang="html">
    <section>
        <!-- 客户分析图 -->
        <Row>
            <Col :xs="24" :sm="24" :md="24">
            <div id='customerAnalysis' style='min-width:20%;height:320px'>

            </div>
            </Col>
        </Row>
    </section>
</template>

<script>
    import echarts from "echarts";
    export default {
        name: "customerAnalysis",
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
            existingCustomer: {
                type: Array,
                default: []
            },
            addCustomer: {
                type: Array,
                default: []
            },
            customerScale: {
                type: Array,
                default: []
            },
        },
        data() {
            return {
            };
        },
        methods: {
            cerateView(){
                var colors = ["#5793f3", "#d14a61", "#675bba"];
                var customerAnalysis = echarts.init(
                    document.getElementById("customerAnalysis")
                );
                const option = {
                    backgroundColor: "white",
                    title: {
                        show: false,
                        text: "客户分析表",
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
                            fontSize: this.textSize
                        },
                        itemWidth: this.barWidth,
                        data: ["客户存量", "新增客户", "客户占比"]
                    },
                    // toolbox: {
                    //     show: true,
                    //     top: "10%",
                    //     right: "10%",
                    //     feature: {
                    //         mark: { show: true },
                    //         dataView: { show: true, readOnly: false },
                    //         magicType: {
                    //             show: true,
                    //             type: ["line", "bar"]
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
                            name: "客户数",
                            splitLine: {
                                show: false
                            },
                            nameTextStyle: {
                                fontSize: this.textSize
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#90979c"
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                interval: 0
                            },
                            splitArea: {
                                show: false
                            }
                        },
                        {
                            type: 'value',
                            scale: true,
                            name: '客户占比',
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
                            name: "客户存量",
                            type: "bar",
                            barMaxWidth: this.barWidth,
                            barGap: "10%",
                            stock: 'cus',
                            itemStyle: {
                                normal: {
                                    color: "rgba(1,127,238,1)",
                                    label: {
                                        show: true,
                                        textStyle: {
                                            
                                        },
                                        fontSize: this.textSize,
                                        position: "top",
                                        formatter: function (p) {
                                            return p.value > 0 ? p.value : "";
                                        }
                                    }
                                }
                            },
                            data: this.existingCustomer
                        },

                        {
                            name: "新增客户",
                            type: "bar",
                            barMaxWidth: this.barWidth,
                            stock: 'cus',
                            itemStyle: {
                                normal: {
                                    color: "rgba(44,192,254,1)",
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
                            data: this.addCustomer
                        },
                        {
                            name: "客户占比",
                            type: "line",
                            stack: "总量",
                            symbolSize: 10,
                            symbol: "circle",
                            yAxisIndex: 1,
                            itemStyle: {
                                normal: {
                                color: "rgb(241, 190, 72)",
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: "top",
                                    fontSize:this.textSize,
                                    formatter: function(p) {
                                    return p.value > 0 ? p.value +'%' : "";
                                    }
                                }
                                }
                            },
                            data: this.customerScale
                        }
                    ]
                };
                // customerAnalysis.setOption(option);
                // window.addEventListener("resize", function () {
                //     customerAnalysis.resize();
                // });
                let timer
                customerAnalysis.resize();
                customerAnalysis.setOption(option);
                window.addEventListener("resize", function() {
                    clearTimeout(timer)
                    timer = setTimeout(() => {
                        customerAnalysis.resize({
                            width: document.querySelector('#customerAnalysis') ? document.querySelector('#customerAnalysis').clientWidth : null
                        });
                    }, 300)
                });
                
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.cerateView()
            });
        },
        watch:{
            xData(){
                this.cerateView()
            }
        }
    };
</script>

<style lang="css">
</style>