/* * @Author: Hano.zhang * @Date: 2018-01-30 19:17:45 * @Last Modified by: wangtengfei * @Last Modified time: 2018-01-31
14:52:09 */


<template lang="html">
    <section>
        <!-- 设备总览 -->

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
    // 平均稼动率
    export default {
        name: "regionalCustomers",
        props: {
            allEquipment: Array,
            allNormor:Array,
            allClose: Array,
            allMove: Array,
            allUr: Array,
            id: String,
        },
        data() {
            return {
                idName: "id" + Math.floor(Math.random() * 10000),
                xData:[' '],                       
            }
        },
        watch: {
            allEquipment(){
                this.createView()
            }
        },
        methods: {
            createView() {
                const self = this;

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
                        },
                        formatter:function(params){
                            var res=''
                            params.forEach(function (item) {
                                let unit;
                                if(item.seriesType=='bar'){
                                    unit='台'
                                }else{
                                    unit='%'
                                }
                                if(item.seriesName!='label'){
                                    res += `<span style="display:inline-block;
                                        margin-right:5px;
                                        border-radius:10px;
                                        width:9px;
                                        height:9px;
                                        background-color:${item.color}">
                                        </span>
                                        ${item.seriesName}: ${item.data} ${unit}
                                        <br>`
                                }
                                
                            });
                            return res
                        }
                    },
                    grid: {
                        borderWidth: 0,
                        top: 100,
                        bottom: 40,
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
                        data: ["总设备数","稼动率预警设备","关机预警设备","位移预警设备"]
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
                            name: '设备数量(台)',
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
                            name: "总设备数",
                            type: "bar",
                            barGap: "100%",
                            itemStyle: {
                                normal: {
                                    color: "rgba(0,191,183,1)",
                                    barBorderRadius: 0,
                                    label: {
                                        show: true,
                                        position: "top",
                                        formatter: function (p) {
                                            return p.value > 0 ? p.value+'台' : "";
                                        }
                                    }
                                }
                            },
                            data: this.allEquipment
                        },
                        // {
                        //     name: "正常设备",
                        //     type: "bar",
                        //     barGap: "100%",
                        //     itemStyle: {
                        //         normal: {
                        //             color: "rgba(44,192,254,1)",
                        //             label: {
                        //                 show: true,
                        //                 textStyle: {
                        //                     color: "rgba(44,192,254,1)"
                        //                 },
                        //                 position: "top",
                        //                 formatter: function (p) {
                        //                     return p.value? `${p.value}台 (${Math.round(p.value/self.allEquipment[0]*10000)/100}%)`:''
                        //                 }
                        //             }
                        //         }
                        //     },
                        //     data: this.allNormor
                        // },
                        {
                            name: "稼动率预警设备",
                            type: "bar",
                            barGap: "100%",
                            itemStyle: {
                                normal: {
                                    color: "rgba(200,200,0,1)",
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: "rgb(165, 42, 42)"
                                        },
                                        position: "top",
                                        formatter: function (p) {
                                            return p.value? `${p.value}台 (${Math.round(p.value/self.allEquipment[0]*10000)/100}%)`:''
                                        }
                                    }
                                }
                            },
                            data: this.allUr
                        },
                        {
                            name: "关机预警设备",
                            type: "bar",
                            barGap: "100%",
                            itemStyle: {
                                normal: {
                                    color: "rgb(165, 42, 42)",
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: "rgb(165, 42, 42)"
                                        },
                                        position: "top",
                                        formatter: function (p) {
                                            return p.value? `${p.value}台 (${Math.round(p.value/self.allEquipment[0]*10000)/100}%)`:''
                                        }
                                    }
                                }
                            },
                            data: this.allClose
                        },
                        {
                            name: "位移预警设备",
                            type: "bar",
                            barGap: "100%",
                            itemStyle: {
                                normal: {
                                    color: "rgba(120,42,42,1)",
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: "rgb(165, 42, 42)"
                                        },
                                        position: "top",
                                        formatter: function (p) {
                                            return p.value? `${p.value}台 (${Math.round(p.value/self.allEquipment[0]*10000)/100}%)`:''
                                        }
                                    }
                                }
                            },
                            data: this.allMove
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
                this.createView()
                this.idName = this.id ? this.id : "id" + Math.floor(Math.random() * 10000)
            });
        }
    };
</script>

<style lang="css">
</style>