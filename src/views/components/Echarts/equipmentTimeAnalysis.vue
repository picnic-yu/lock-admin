/*
 * @Author: Hano.zhang 
 * @Date: 2018-01-29 20:54:21 
 * @Last Modified by: yinjian
 * @Last Modified time: 2018-06-19 16:07:21
 */

<template>
<!-- 设备状态用时占比 -->
    <section class="page">
        <div id='equipmentTimeAnalysis' style='width=100%;height:350px'></div>
    </section>
</template>

<script type="text/ecmascript-6">
 import echarts from "echarts";
 export default {
    name:'equipmentTimeAnalysis',
    components: {},

    props: {},

    data() {
        return {

        }
   
    },

    watch: {},

    methods: {},

    mounted() {
        this.$nextTick(()=>{
            var equipmentTimeAnalysis = echarts.init(document.getElementById('equipmentTimeAnalysis'));
            const option = {

                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                    },
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['运行','调试','空闲','故障','关机'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'用时占比',
                        type:'bar',
                        barWidth: '40%',
                        label:{
						    normal:{
						        show:true,
						        position:'top'
						    }
						},
                        itemStyle:{
                        color: function(params) {
                        // build a color map as your need.
                            var colorList = [
                                '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B'                            ];
                            return colorList[params.dataIndex]  
                          },
                        },
                        data:[30.03, 13.54, 7.12, 0.17, 49.13]
                    }
                ]
            };

            // equipmentTimeAnalysis.setOption(option);

            // window.addEventListener("resize", function() {
            //     equipmentTimeAnalysis.resize();
            // }); 
            let timer
            equipmentTimeAnalysis.resize();
            equipmentTimeAnalysis.setOption(option);
            window.addEventListener("resize", function() {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    equipmentTimeAnalysis.resize({
                        width: document.querySelector('#equipmentTimeAnalysis') ? document.querySelector('#equipmentTimeAnalysis').clientWidth : null
                    });
                }, 300)
            });     
        })
    },

 }
</script>

<style  lang='less' scoped>
 
</style>
