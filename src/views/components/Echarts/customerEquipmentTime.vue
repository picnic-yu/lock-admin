/* * @Author: Hano.zhang * @Date: 2018-01-30 19:17:45 * @Last Modified by: wangtengfei * @Last Modified time: 2018-01-31
14:52:09 */


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
    // 平均稼动率
    export default {
        name: "regionalCustomers",
        props: {
            datas: Array
        },
        data() {
            return {
                xData:['运行','空闲','调试','故障','关机'],
                color:['#64d572', '#54b7fd', '#ffcf3d', '#ff61a0', '#f25e43'],
                idName: 'id' + Math.random() * 10000,
                closeInfo: [],                  //关机数量
                lockInfo: [],                   //锁机数量
                moveInfo: [],                   //位移数量
                allLabel: [],                   //空数据用于显示总量
            }
        },
        watch: {
            datas(){
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
                                    unit='%'
                                }
                                
                                res += `<span style="display:inline-block;
                                    margin-right:5px;
                                    border-radius:10px;
                                    width:9px;
                                    height:9px;
                                    background-color:${item.color}">
                                    </span>
                                    ${item.name}: ${item.data} ${unit}
                                    <br>`
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
                    // legend: {
                    //     x: "4%",
                    //     top: "11%",
                    //     textStyle: {
                    //         color: "#90979c"
                    //     },
                    //     data: ["总客户数", "关机预警客户数","位移预警客户数","稼动率预警客户数", "新增客户数"]
                    // },
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
                            name: '用时占比',
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
                    series: [
                        {
                            name: "用时占比",
                            type: "bar",
                            barGap: "20%",
                            itemStyle: {
                                normal: {
                                    color: function(v){
                                        return self.color[v.dataIndex]
                                    },
                                    barBorderRadius: 0,
                                    label: {
                                        show: true,
                                        position: "top",
                                        formatter: function (p) {
                                            return p.value > 0 ? p.value +' %' : "";
                                        }
                                    }
                                }
                            },
                            data: this.datas
                        },
                    ]
                };
                // regionalCustomers.setOption(option);
                // window.addEventListener("resize", function () {
                //     regionalCustomers.resize();
                // });
                let timer
                regionalCustomers.resize();
                regionalCustomers.setOption(option);
                window.addEventListener("resize", function() {
                    clearTimeout(timer)
                    timer = setTimeout(() => {
                        regionalCustomers.resize({
                            width: document.querySelector('#regionalCustomers') ? document.querySelector('#regionalCustomers').clientWidth : null
                        });
                    }, 300)
                });

            }
        },
        mounted() {
            this.$nextTick(() => {
                this.createView()
            });
        }
    };
</script>

<style lang="css">
</style>