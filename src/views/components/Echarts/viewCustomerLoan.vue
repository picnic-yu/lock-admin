/* * @Author: Hano.zhang * @Date: 2018-01-30 19:17:45 * @Last Modified by: wangtengfei * @Last Modified time: 2018-03-23
11:56:16 */


<template lang="html">
    <section>
        <!-- 区域客户分析 -->

        <Row>
            <Col :xs="24" :sm="24" :md="24">
            <div :id='idName' style='min-width:20%;height:350px'>
            </div>
            </Col>
        </Row>

    </section>
</template>

<script>
    import echarts from "echarts";
    export default {
        name: "regionalCustomers",
        props: {
            xData: Array,
            loan: Array,
        },
        data() {
            return {
                idName: "id" + Math.floor(Math.random() * 10000),
            }
        },
        watch: {
            xData(){
                this.creatView()
            }
        },
        methods: {
            creatView(){
                var colors = ["#5793f3", "#d14a61", "#675bba"];
                var regionalCustomers = echarts.init(
                    document.getElementById(this.idName)
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
                            }
                        }
                    },
                    grid: {
                        borderWidth: 0,
                        top: 100,
                        bottom: 40,
                        left: 40,
                        right: 50,
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
                        data: ["放款金额"]
                    },

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
                                interval: 0
                            },
                            data: this.xData
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            name: '放款金额(万元)',
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
                    ],
                    // dataZoom: [
                    //     {
                    //         show: true,
                    //         height: 20,
                    //         xAxisIndex: [0],
                    //         bottom: 30,
                    //         start: 0,
                    //         end: 50,
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
                            name: "放款金额",
                            type: "bar",
                            barMaxWidth: 12,
                            barGap: "20%",
                            itemStyle: {
                                normal: {
                                    color: "rgba(0,191,183,1)",
                                    barBorderRadius: 0,
                                    label: {
                                        show: true,
                                        position: "top",
                                        formatter: function (p) {
                                            return p.value > 0 ? p.value : "";
                                        }
                                    }
                                }
                            },
                            data: this.loan
                        },


                        
                    ]
                };
                // regionalCustomers.setOption(option);
                // window.addEventListener("resize", function () {
                //     regionalCustomers.resize();
                // });
                let _this = this, timer
                regionalCustomers.resize();
                regionalCustomers.setOption(option);
                window.addEventListener("resize", function() {
                    clearTimeout(timer)
                    timer = setTimeout(() => {
                        regionalCustomers.resize({
                            width: document.querySelector('#' + _this.idName) ? document.querySelector('#' + _this.idName).clientWidth : null
                        });
                    }, 300)
                });
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.creatView()
            });
        }
    };
</script>

<style lang="css">
</style>