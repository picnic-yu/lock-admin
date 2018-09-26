/*
 * @Author: Hano.zhang 
 * @Date: 2018-01-30 14:08:49 
 * @Last Modified by: yinjian
 * @Last Modified time: 2018-06-19 16:07:14
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
        dataItem:{
            type:Array,
            default:[]
        },

    },

    data() {
        return {
           idName: "id" + Math.floor(Math.random() * 10000)
        }
   
    },

    watch: {
        dataItem() {

            if(this.dataItem){
                // setTimeout(()=>{
                    this.cerateView()

                // },2000)
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
                    trigger: 'axis'
                },
                legend: {
                    x: '4%',
                    top: "5%",
                    data:['平均稼动率']
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
                        name:"平均稼动率",
                        type:'line',
                        data:this.dataItem,
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
            this.$nextTick(() => {
                this.cerateView()
            });   
        },

 }
</script>

<style  lang='less' scoped>
 
</style>
