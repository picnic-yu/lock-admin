/*
 * @Author: Hano.zhang 
 * @Date: 2018-01-29 19:48:11 
 * @Last Modified by: yinjian
 * @Last Modified time: 2018-06-19 16:07:19
 */

<template>
    <!--设备稼动率日表  -->
    <section class="page">
        <Row>
            <Col :xs="24" :sm="24" :md="24" >
                <div id='equipmentUtilizationDay' style='min-width:100%;height:380px'>
                </div>
                <div class="time-Button">
                    <Tag color="#2db7f5" v-text="`${defaultTime}小时`"></Tag>
                </div>
            </Col>
        </Row>
    </section>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts";
 export default {
    name:'equipmentUtilizationDay', 
    components: {},

    props: {
        xData:Array,
        lineData:Array,
        defaultTime: Number,
    },

    data() {
        return {
            max: 300
        }
   
    },

    watch: {
        xData() {
            this.createView()
        }
    },

    methods: {
        timeHandle(time) {
            this.max = 2400/time
        },
        createView(){
            var equipmentUtilizationDay = echarts.init(
                document.getElementById("equipmentUtilizationDay")
            );         
               const option = {
                title: {
                    // text: '客户稼动率日趋势图',
                },
                tooltip: {
                    trigger: 'axis',
                    formatter:function(params){
                        var res='';
                        params.forEach(function (item) {
                            let unit = '%';
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
                    bottom: 80,
                    left: 80,
                    right: 80,
                    textStyle: {
                        color: "#fff"
                    }
                },
                legend: {
                    top: "5%",
                    data:['日稼动率']
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xData,
                    max: function(value) {
                        return value.max + 0.1;
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 40
                    },
                },
                yAxis: {
                    type: 'value',
                    scale: true,
                    max: this.max,
                    min: 0,
                    splitNumber: 10,
                    boundaryGap: false,
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                series: [
                    {
                        name:'日稼动率',
                        type:'line',
                        data:this.lineData,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        // markPoint: {
                        //     data: [
                        //         {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                        //     ]
                        // },
                        // markLine: {
                        //     data: [
                        //         {type: 'average', name: '平均值'},
                        //         [{
                        //             symbol: 'none',
                        //             x: '90%',
                        //             yAxis: 'max'
                        //         }, {
                        //             symbol: 'circle',
                        //             label: {
                        //                 normal: {
                        //                     position: 'start',
                        //                     formatter: '最大值'
                        //                 }
                        //             },
                        //             type: 'max',
                        //             name: '最高点'
                        //         }]
                        //     ]
                        // },
                        itemStyle: {
                            normal: {
                                color: "rgb(194, 53, 49)",
                                label: {
                                    show: true,
                                    position: "top",

                                    formatter: function (p) {
                                        return  p.value + '%';
                                    }
                                }
                            }
                        },
                    }
                ]
            };
            //     equipmentUtilizationDay.resize();

            // equipmentUtilizationDay.setOption(option);
            // window.addEventListener("resize", function() {
            //     equipmentUtilizationDay.resize();
            // });
            let timer
            equipmentUtilizationDay.resize();
            equipmentUtilizationDay.setOption(option);
            window.addEventListener("resize", function() {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    equipmentUtilizationDay.resize({
                        width: document.querySelector('#equipmentUtilizationDay') ? document.querySelector('#equipmentUtilizationDay').clientWidth : null
                    });
                }, 300)
            });
        }
    },

    mounted() {
        this.$nextTick(()=>{
            this.timeHandle(this.defaultTime)
            this.createView()
        })
    },

 }
</script>

<style  lang='less' scoped>
    .time-Button {
        position: absolute;
        top: 5%;
        right: 80px;
    }
    .ivu-tag {
        height: 30px;
        line-height: 30px;
    }
</style>
