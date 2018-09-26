/*
 * @Author: Hano.zhang 
 * @Date: 2018-01-29 19:48:11 
 * @Last Modified by: yinjian
 * @Last Modified time: 2018-06-21 14:00:49
 */

<template>
    <!--设备稼动率日表  -->
    <section class="page">
        <Row>
            <Col :xs="24" :sm="24" :md="24" >
                <div id='equipmentUtilizationMonth' style='min-width:100%;height:380px'>

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
        averageData: {
            type: Array,
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
            Xdata: [],
            this: [],   //客户稼动率
            average: [] //行业平均稼动率
        }
   
    },

    watch: {
        // averageData() {
        //     this.timeHandle(this.defaultTime)
        //     this.createView()
        // },
        thisData() {
            this.timeHandle(this.defaultTime)
            this.createView()
        }
        
    },

    methods: {
        timeHandle(time) {
            this.max = 2400/time
            let tmp = !this.averageData || this.thisData.length > this.averageData.length ? this.thisData : this.averageData
            tmp.forEach((item, index) => {
                this.Xdata.unshift(`${item.year}-${item.month}月`)
                this.this.unshift(this.thisData[index] ? this.thisData[index].ur.split('%')[0]: '-')
                // this.this.unshift(Number(this.thisData[index] ? this.thisData[index].ur.split('%')[0]: '-'))
                // this.average.unshift(Number(this.averageData ? (this.averageData[index] ? this.averageData[index].customerUR.split('%')[0] : '-') : '-'))
                this.average.unshift(this.averageData ? (this.averageData[index] ? this.averageData[index].customerUR.split('%')[0] : '-') : '-')
            })
        },
        createView(){
            var equipmentUtilizationMonth = echarts.init(
                document.getElementById("equipmentUtilizationMonth")
            ); 
            let series = [{
                name:'客户稼动率',
                type:'line',
                // data:this.thisData,
                data: this.this,
                label: {
                    formatter: '{c} %',
                    show: true
                }
            }], data = ['客户稼动率'] 
            if (this.averageData) {
                series.unshift({
                    name:'行业平均稼动率',
                    type:'line',
                    // data:this.lastData,
                    data: this.average,
                    label: {
                        formatter: '{c} %',
                        show: true
                    }
                });
                data.unshift('行业平均稼动率')
            }       
            const option = {
                backgroundColor: "white",
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
                    bottom: 80,
                    left: 80,
                    right: 80,
                    textStyle: {
                        color: "#fff"
                    }
                },
                legend: {
                    x: "4%",
                    top: "5%",
                    data: data
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
                    data: this.Xdata,
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
                series: series
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
