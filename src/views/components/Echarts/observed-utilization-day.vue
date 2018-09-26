/*
 * @Author: chenboyu 
 * @Date: 2018-01-30 14:08:49 
 * @Last Modified by: yinjian
 * @Last Modified time: 2018-06-19 16:07:05
 */

<template>
    <section class="page">
        <Row>
            <Col :xs="24" :sm="24" :md="24" >
                <div :id='idName' style='min-width:100%;height:350px'>

                </div>
            </Col>
        </Row>
    </section>
</template>

<script type="text/ecmascript-6">
import echarts from "echarts";
import observedDays from "@/libs/lookup/observed-comparative";
 export default {
    components: {},

    props: {
        chartOption:{
            type: Object,
            default: function(){
                return {
                    Xdate: ['1日','2日','3日','4日','5日','6日','7日','8日',
                        '9日','10日','11日','12日','13日','14日','15日','16日',
                        '17日','18日','19日','20日','21日','22日','23日','24日',
                        '25日','26日','27日','28日','29日','30日','31日'
                    ],
                    legend:['2018年1月','去年同比','上月环比'],
                    dataItem: [
                        [2.15, 8.54,10,25,14,6,18,11.65,  8.54,10,8, 11.99, 14,6,16,11.65, 18.95, 14.16, 10.23,12.15,15.65, 18.95, 14.16, 19.23, 28.54,30,35, 41.99,44,46,53],
                        [2.15, 11.99, 11.65, 18.95, 14.16, 10.23, 8.54,10,5,14,6,3,11.65, 18.95, 14.16, 10.23,2.15, 11.99, 8.54,10,5,14,6,3,11.65,  8.54,10,5,14,6,3],
                        [5, 8.54,12,10,14,12,13,11.65,  13.54,18,5,  17.23,18.15,19.65, 18.95, 14.16, 12.23,11.99, 14,6,13,11.65, 18.95, 19.16, 18.54,14,5, 11.99,14,16,13]
                    ],
                    dataZoom:[]
                };
            }
        },
    },

    data() {
        return {
           idName:"id" + Math.floor(Math.random() * 10000)
        }
   
    },

    watch: {
        'chartOption.Xdate'() {
            this.cerateView()
        }
    },

    methods: {
        cerateView() {
            var observedUtilizationDay = echarts.init(
                document.getElementById(this.idName)
            );
            const option = {
                title: {
                    // text: '未来一周气温变化',
                    // subtext: '纯属虚构'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:this.chartOption.legend
                },
                // dataZoom: [
                //     {
                //         type: 'slider',
                //         show: true,
                //         xAxisIndex: [0],
                //         start: 0,
                //         end: 100
                //     },
                // ],
                toolbox: {
                    show: true,
                    feature: {
                        // dataZoom: {
                        //     yAxisIndex: 'none'
                        // },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: this.chartOption.Xdate
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                series: [
                    {
                        name:this.chartOption.legend[0],
                        type:'line',
                        data:this.chartOption.dataItem[0],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:this.chartOption.legend[1],
                        type:'line',
                        data:this.chartOption.dataItem[1],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    // {
                    //     name:this.chartOption.legend[2],
                    //     type:'line',
                    //     data:this.chartOption.dataItem[2],
                    //     markPoint: {
                    //         data: [
                    //             {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                    //         ]
                    //     },
                    //     markLine: {
                    //         data: [
                    //             {type: 'average', name: '平均值'},
                    //             [{
                    //                 symbol: 'none',
                    //                 x: '90%',
                    //                 yAxis: 'max'
                    //             }, {
                    //                 symbol: 'circle',
                    //                 label: {
                    //                     normal: {
                    //                         position: 'start',
                    //                         formatter: '最大值'
                    //                     }
                    //                 },
                    //                 type: 'max',
                    //                 name: '最高点'
                    //             }]
                    //         ]
                    //     }
                    // },
                    // {
                    //     name:this.chartOption.legend[3],
                    //     type:'line',
                    //     data:this.chartOption.dataItem[3],
                    //     markPoint: {
                    //         data: [
                    //             {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                    //         ]
                    //     },
                    //     markLine: {
                    //         data: [
                    //             {type: 'average', name: '平均值'},
                    //             [{
                    //                 symbol: 'none',
                    //                 x: '90%',
                    //                 yAxis: 'max'
                    //             }, {
                    //                 symbol: 'circle',
                    //                 label: {
                    //                     normal: {
                    //                         position: 'start',
                    //                         formatter: '最大值'
                    //                     }
                    //                 },
                    //                 type: 'max',
                    //                 name: '最高点'
                    //             }]
                    //         ]
                    //     }
                    // }
                ]
            };         
               
            // observedUtilizationDay.resize();

            // observedUtilizationDay.setOption(option);
            // window.addEventListener("resize", function() {
            //     observedUtilizationDay.resize();
            // });
            let _this = this, timer
            observedUtilizationDay.resize();
            observedUtilizationDay.setOption(option);
            window.addEventListener("resize", function() {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    observedUtilizationDay.resize({
                        width: document.querySelector('#' + _this.idName) ? document.querySelector('#' + _this.idName).clientWidth : null
                    });
                }, 300)
            });
        
        }
    },

    mounted() {
        this.cerateView();
    },

 }
</script>

<style  lang='less' scoped>
 
</style>
