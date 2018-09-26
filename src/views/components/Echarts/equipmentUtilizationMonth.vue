/*
 * @Author: Hano.zhang 
 * @Date: 2018-01-29 19:48:11 
 * @Last Modified by: yinjian
 * @Last Modified time: 2018-06-19 16:07:18
 */

<template>
    <!--设备稼动率日表  -->
    <section class="page">
        <Row>
            <Col :xs="24" :sm="24" :md="24" >
                <div id='equipmentUtilizationMonth' style='min-width:100%;height:350px'>

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
    name:'equipmentUtilizationMonth', 
    components: {},

    props: {
        lastData: {
            type: Array,
            default: () => []
        },
        thisData: {
            type: Array,
            default: () => []
        },
        defaultTime: Number,
    },

    data() {
        return {
            max: 300,
            Xdate:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        }
   
    },

    watch: {
        lastData(){
            this.createView()
        }
    },

    methods: {
        timeHandle(time) {
            this.max = 2400/time
        },
        createView(){
            var equipmentUtilizationMonth = echarts.init(
                document.getElementById("equipmentUtilizationMonth")
            );         
            const option = {
                title: {
                    // text: '未来一周气温变化',
                    // subtext: '纯属虚构'
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
                    data:['去年','今年']
                },
                // toolbox: {
                //     show: true,
                //     feature: {
                //         // dataZoom: {
                //         //     yAxisIndex: 'none'
                //         // },
                //         dataView: {readOnly: false},
                //         magicType: {type: ['line', 'bar']},
                //         restore: {},
                //         saveAsImage: {}
                //     }
                // },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: this.Xdate,
                    max: function(value) {
                        return value.max + 0.1;
                    }
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
                        name:'去年',
                        type:'line',
                        data:this.lastData,
                        label: {
                            formatter: '{c} %',
                            show: true
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        // markLine: {
                        //     data: [
                        //         {type: 'average', name: '平均值'}
                        //     ]
                        // }
                    },
                    {
                        name:'今年',
                        type:'line',
                        data:this.thisData,
                        label: {
                            formatter: '{c} %',
                            show: true
                        },
                        markPoint: {
                            data: [
                                {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                            ]
                        },
                        // markLine: {
                        //     data: [
                        //         {type: 'average', name: '平均值'},
                        //         // [{
                        //         //     symbol: 'none',
                        //         //     x: '90%',
                        //         //     yAxis: 'max'
                        //         // }, {
                        //         //     symbol: 'circle',
                        //         //     label: {
                        //         //         normal: {
                        //         //             position: 'start',
                        //         //             formatter: '最大值'
                        //         //         }
                        //         //     },
                        //         //     type: 'max',
                        //         //     name: '最高点'
                        //         // }]
                        //     ]
                        // }
                    }
                ]
            };

            // equipmentUtilizationMonth.resize();

            // equipmentUtilizationMonth.setOption(option);
            // window.addEventListener("resize", function() {
            //     equipmentUtilizationMonth.resize();
            // });
            let timer
            equipmentUtilizationMonth.resize();
            equipmentUtilizationMonth.setOption(option);
            window.addEventListener("resize", function() {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    equipmentUtilizationMonth.resize({
                        width: document.querySelector('#equipmentUtilizationMonth') ? document.querySelector('#equipmentUtilizationMonth').clientWidth : null
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
