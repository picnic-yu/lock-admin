/*
 * @Author: Hano.zhang 
 * @Date: 2018-01-30 14:08:49 
 * @Last Modified by: yinjian
 * @Last Modified time: 2018-06-19 16:07:10
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
 export default {
    components: {},

    props: {
        Xdate:{
            type:Array
        },
        legend:{
            type:Array,
            default:[]
        },
        dataItem:{
            type:Array,
            default:[]
        },

    },

    data() {
        return {
           idName:"id" + Math.floor(Math.random() * 10000)
        }
   
    },

    watch: {
        dataItem() {
            if(this.legend){
                this.cerateView()
            }
        

        }
    },

    methods: {
        cerateView() {
            var observedUtilizationDay = echarts.init(
                document.getElementById(this.idName)
            );
            const option = {
                title: {
                },
                tooltip: {
                    trigger: 'axis',
                    formatter:function(params){
                        var res=''
                        params.forEach(function (item) {
                            let unit='%';
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
                    top: 70,
                    bottom: 50,
                    left: 80,
                    right: 80,
                    // textStyle: {
                    //     color: "#fff"
                    // }
                },
                legend: {
                    x: '4%',
                    top: '5%',
                    data:this.legend,
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
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: this.Xdate
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                series: [
                    {
                        name:this.legend[1],
                        type:'line',
                        data:this.dataItem[1],
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
                        name:this.legend[0],
                        type:'line',
                        data:this.dataItem[0],
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
                 

                  
                ]
            };         
               
            // observedUtilizationDay.resize();

            // observedUtilizationDay.setOption(option);
            // window.addEventListener("resize", function () {
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
        this.$nextTick(() => {
            this.cerateView()
        });  
    },

 }
</script>

<style  lang='less' scoped>
 
</style>
