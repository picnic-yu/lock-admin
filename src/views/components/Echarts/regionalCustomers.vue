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
            xData: Array,
            allCustomer: Array,
            allClose:Array,
            allLock: Array,
            allMove: Array,
            addCustomer: Array,
            averageUtilization: Array,
            id: String
        },
        data() {
            return {
                idName: "id" + Math.floor(Math.random() * 10000),
                closeInfo: [],                  //关机数量
                lockInfo: [],                   //锁机数量
                moveInfo: [],                   //位移数量
                allLabel: [],                   //空数据用于显示总量
            }
        },
        watch: {
            xData(){
                let leng='';
                if(this.allMove.length >= this.allLock.length){
                    leng = this.allMove.length
                }else{
                    leng = this.allLock.length
                }
                if(leng < this.allClose.length){
                    leng = this.allClose.length;
                }
                for(let i =0; i<leng ;i++){
                    this.allLabel.push(0)
                }
                this.createView()
            }
        },
        methods: {
            // 计算预警总量
            computeNum(index){
                let allInfo = [];
                for (let i = 0; i < this.allLabel.length; i++){
                    allInfo.push((this.closeInfo[i]?this.closeInfo[i]['value']:0) +
                                (this.lockInfo[i]? this.lockInfo[i]['value']:0) +
                                (this.moveInfo[i]? this.moveInfo[i]['value']:0))
                }
                setTimeout(()=>{
                    this.closeInfo = []
                    this.lockInfo = []
                    this.moveInfo = []
                },200)
                if(allInfo[index]>0){
                    return allInfo[index]
                }else{
                    return ''
                }
            },
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
                                    unit='家'
                                }else{
                                    unit='%'
                                }
                                if(item.seriesName!='label'){
                                    res += `<span style="display:inline-block;
                                        margin-right:5px;
                                        border-radius:10px;
                                        width:9px;
                                        height:9px;
                                        background-color:${item.color}">
                                        </span>
                                        ${item.seriesName}: ${item.data} ${unit}
                                        <br>`
                                }
                                
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
                        textStyle: {
                            color: "#90979c"
                        },
                        data: ["总客户数", "关机预警客户数","位移预警客户数","稼动率预警客户数", "新增客户数"]
                    },
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
                            name: '客户数',
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
                        {
                            type: 'value',
                            scale: true,
                            name: '平均稼动率',
                            nameTextStyle: {
                                color: "#90979c"
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#90979c"
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            // max: 100,
                            min: 0,
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        }
                    ],
                    // dataZoom: [
                    //     {
                    //         show: true,
                    //         height: 20,
                    //         xAxisIndex: [0],
                    //         bottom: 30,
                    //         start: 0,
                    //         end: 50,
                    //         textStyle: {
                    //             color: "#495060"
                    //         },
                    //         borderColor: "transparent"
                    //     },
                    //     {
                    //         type: "inside",
                    //         show: true,
                    //         height: 15,
                    //         start: 1,
                    //         end: 35
                    //     }
                    // ],
                    series: [
                        {
                            name: "总客户数",
                            type: "bar",
                            barMaxWidth: 12,
                            barGap: "20%",
                            itemStyle: {
                                normal: {
                                    color: "rgba(0,191,183,1)",
                                    barBorderRadius: 0,
                                    label: {
                                        show: true,
                                        position: "top",
                                        formatter: function (p) {
                                            return p.value > 0 ? p.value : "";
                                        }
                                    }
                                }
                            },
                            data: this.allCustomer
                        },
                        {
                            name: "关机预警客户数",
                            type: "bar",
                            barMaxWidth: 10,
                            stack: 'allNum',
                            barGap: "20%",
                            itemStyle: {
                                normal: {
                                    color: "rgba(165,42,42,1)",
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: "rgb(165, 42, 42)"
                                        },
                                        position: "top",
                                        formatter: function (p) {
                                            self.closeInfo.push(p)
                                            return ''
                                        }
                                    }
                                }
                            },
                            data: this.allClose
                        },
                        {
                            name: "位移预警客户数",
                            type: "bar",
                            barMaxWidth: 10,
                            stack: 'allNum',
                            barGap: "20%",
                            itemStyle: {
                                normal: {
                                    color: "rgba(200,200,0,1)",
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: "rgb(165, 42, 42)"
                                        },
                                        position: "top",
                                        formatter: function (p) {
                                            self.moveInfo.push(p)
                                            return ''
                                        }
                                    }
                                }
                            },
                            data: this.allMove
                        },
                        {
                            name: "稼动率预警客户数",
                            type: "bar",
                            barMaxWidth: 10,
                            stack: 'allNum',
                            barGap: "20%",
                            itemStyle: {
                                normal: {
                                    color: "rgba(120,42,42,1)",
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: "rgb(165, 42, 42)"
                                        },
                                        position: "top",
                                        formatter: function (p) {
                                            self.lockInfo.push(p)
                                            return ''
                                        }
                                    }
                                }
                            },
                            data: this.allLock
                        },
                        {
                            name: "新增客户数",
                            type: "bar",
                            barMaxWidth: 10,
                            barGap: "20%",
                            itemStyle: {
                                normal: {
                                    color: "#99c7ae",
                                    barBorderRadius: 0,
                                    label: {
                                        show: true,
                                        position: "top",
                                        formatter: function (p) {
                                            return p.value > 0 ? p.value : "";
                                        }
                                    }
                                }
                            },
                            data: this.addCustomer
                        },
                        {
                            name: "label",
                            type: "bar",
                            barMaxWidth: 10,
                            stack: 'allNum',
                            barGap: "20%",
                            itemStyle: {
                                normal: {
                                    color: "rgb(200, 200, 0)",
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: "rgb(165, 42, 42)"
                                        },
                                        position: "top",
                                        formatter: function (p) {
                                            return self.computeNum(p.dataIndex)
                                        }
                                    }
                                }
                            },
                            data: self.allLabel
                        },
                        {
                            name: "平均稼动率",
                            type: "line",
                            yAxisIndex: 1,
                            lineStyle: {
                                normal: {
                                    width: 2,
                                    type: 'dashed'
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "rgb(241, 190, 72)",
                                    barBorderRadius: 0,
                                    label: {
                                        show: true,
                                        position: "top",
                                        formatter: function (p) {
                                            return p.value > 0 ? p.value : "";
                                        }
                                    }
                                }
                            },
                            data: this.averageUtilization
                        },
                    ]
                };
                // regionalCustomers.setOption(option);
                // window.addEventListener("resize", function () {
                //     regionalCustomers.resize();
                // });
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