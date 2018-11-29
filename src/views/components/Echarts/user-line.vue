
<template lang="html">
    <section>
        <!-- 客户占比 -->

        <Row>
            <Col :xs="24" :sm="24" :md="24">
            <div :id='idName' style='min-width:20%;height:350px;position:relative'>
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
            
            id: String
        },
        data() {
            return {
                idName: "id" + Math.floor(Math.random() * 10000),
                xData:[' '],                       
            }
        },
        watch: {
            allNormor(){
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
                    
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['最高气温','最低气温']
                    },
                    // grid: {
                    //     left: '3%',
                    //     right: '4%',
                    //     bottom: '3%',
                    //     containLabel: true
                    // },
                    toolbox: {
                        show: true,
                        feature: {
                           
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        type: 'value',
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: [
                        {
                            name:'最高气温',
                            type:'line',
                            data:[11, 11, 15, 13, 12, 13, 10],
                            
                            
                        },
                        {
                            name:'最低气温',
                            type:'line',
                            data:[1, 52, 2, 5, 3, 2, 0],
                            
                            
                        }
                    ]
                };
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