
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
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['2011年', '2012年']
                    },
                    // grid: {
                    //     left: '3%',
                    //     right: '4%',
                    //     bottom: '3%',
                    //     containLabel: true
                    // },
                    xAxis: {
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        type: 'category',
                        data: ['巴西','印尼','美国','印度','中国','世界人口(万)'],
                    },
                    yAxis: {
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        type: 'value',
                        
                        boundaryGap: [0, 0.01]
                    },
                    series: [
                        {
                            name: '2011年',
                            type: 'bar',
                            data: [18203, 23489, 29034, 104970, 131744, 630230]
                        },
                        {
                            name: '2012年',
                            type: 'bar',
                            data: [19325, 23438, 31000, 121594, 134141, 681807]
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