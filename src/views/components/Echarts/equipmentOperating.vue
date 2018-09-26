/* * @Author: Hano.zhang * @Date: 2018-01-30 16:21:33 * @Last Modified by: Hano.zhang * @Last Modified time: 2018-01-30 16:26:00
*/
<template>
    <!-- 设备运行状态 -->
    <section class="page">
        <Row>
            <Col :xs="24" :sm="24" :md="24">
            <div id="equipmentOperating" style="width: 100%;minHeight:550px;"></div>
            </Col>
        </Row>

    </section>
</template>

<script>
    import echarts from "echarts";

    export default {
        name: "equipmentOperating",
        components: {},

        props: {
            categories:Array,
            equipmentOperatingData: Array
        },

        data() {
            return {
                dataCount: 10,
                startTime: 0, //开始事件
                // categories: [
                //     "L4-9",
                //     "L4-7",
                //     "L3-11",
                //     "L3-12",
                //     "L4-8",
                //     "L2-10",
                //     "L3-10",
                //     "L3-8"
                // ]
                //y轴数据
            };
        },

        watch: {
            equipmentOperatingData(){
                this.transferData()
                this.createView()
                
            }
        },

        methods: {
            renderItem(params, api) {
                var categoryIndex = api.value(0);
                var start = api.coord([api.value(1), categoryIndex]);
                var end = api.coord([api.value(2), categoryIndex]);
                // 这里使用 api.size(...) 获得 Y 轴上数值范围为 1 的一段所对应的像素长度。

                var height = api.size([0, 1])[1] * 0.5; //数据高度
                return {
                    type: "rect",
                    // 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。

                    shape: echarts.graphic.clipRectByRect(
                        {
                            // shape 属性描述了这个矩形的像素位置和大小。
                            // 其中特殊得用到了 echarts.graphic.clipRectByRect，意思是，
                            // 如果矩形超出了当前坐标系的包围盒，则剪裁这个矩形。
                            x: start[0],
                            y: start[1] - height / 2,
                            width: end[0] - start[0], //这个可以控制每一块的宽度显示。
                            height: height
                            // 矩形的位置和大小。
                        },
                        {
                            // 当前坐标系的包围盒。

                            x: params.coordSys.x,
                            y: params.coordSys.y,
                            width: params.coordSys.width,
                            height: params.coordSys.height
                        }
                    ),
                    style: api.style(),
                    onmouseover: () => {

                    }
                };
            },
            createView(){
                let equipmentOperating = echarts.init(
                    document.getElementById("equipmentOperating")
                );


                const option = {
                    title: {
                        //标题
                        //   text: "当日用时分析",
                        left: "center",
                        textStyle: {
                            // color: "#8f8f8f",
                            color: "rgb(227, 222, 222)",
                            fontFamily: "微软雅黑"
                        }
                    },
                    tooltip: {
                        //鼠标悬浮
                        formatter: function (params) {
                            return (
                                params.marker + params.data.name + ": " + params.value[3] + " 分钟"
                            );
                        },
                        alwaysShowContent: false,

                        hideDelay: 100
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
                    xAxis: {
                        startTime: this.startTime,
                        min: 0,
                        max: 1440, //设置显示最大值 为1440，在下方除以60转化为小时
                        scale: true,
                        // splitNumber:1,
                        minInterval: 5,
                        interval: 120, //设置分割线及底部坐标显示最大值，1440min/12hour
                        axisLabel: {
                            show: true, //是否显示刻度
                            margin: 8,
                            interval: 0,
                            formatter: function (val) {
                                // X返回值为值减去开始时间（最大值）+单位
                                return Math.max(0, val - 0) / 60 + ":00";
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#90979c"
                            }
                        }
                    },
                    yAxis: {
                        data: this.categories,
                        axisLine: {
                            lineStyle: {
                                color: "#90979c"
                            }
                        }
                    },
                    series: [
                        {
                            type: "custom",
                            renderItem: this.renderItem,
                            itemStyle: {
                                normal: {
                                    opacity: .8 //透明度
                                }
                            },
                            encode: {
                                // data 的哪个维度被编码成什么
                                x: [1, 2], // 表示维度1 2 映射到 x 轴。
                                y: 0
                            },
                            data: this.equipmentOperatingData, // 这是第三个 dataItem
                            name: this.equipmentOperatingData.name,

                            // animationDelay: function(idx) {
                            //   return idx * 35;
                            // }

                            animationEasing: "linear",
                            animationEasingUpdate: "linear",
                            animationDelay(idx) {
                                return idx * 30;
                            },
                            animationDelayUpdate(idx) {
                                return idx * 20;
                            }
                        }
                    ],
                    legend: {
                        //图例（暂未生效
                        show: false,
                        left: "auto",
                        zlevel: 9,
                        width: "100px",
                        height: "100px",
                        selectedMode: true,
                        backgroundColor: "rgb(224, 1, 55)",

                        //   data: [
                        //     {
                        //       name: this.equipmentOperatingData.name,
                        //       // 强制设置图形为圆。强制设置图形为圆。
                        //       icon: "circle",
                        //       // 设置文本为红色
                        //       textStyle: {
                        //         color: "blue"
                        //       }
                        //     }
                        //   ]
                    }
                };
                // equipmentOperating.setOption(option);
                // window.addEventListener("resize", function () {
                //     equipmentOperating.resize();
                // });
                let timer
                equipmentOperating.resize();
                equipmentOperating.setOption(option);
                window.addEventListener("resize", function() {
                    clearTimeout(timer)
                    timer = setTimeout(() => {
                        equipmentOperating.resize({
                            width: document.querySelector('#equipmentOperating') ? document.querySelector('#equipmentOperating').clientWidth : null
                        });
                    }, 300)
                });
            },
            transferData() {
                // 处理数据 加上颜色
                for (let i in this.equipmentOperatingData) {
                    let name = this.equipmentOperatingData[i].name;
                    switch (name) {
                        case 'CLOSED':
                            this.equipmentOperatingData[i].name = '运行'
                            this.equipmentOperatingData[i].itemStyle.color = '#78a442';
                            break;
                        case "FREE":
                            this.equipmentOperatingData[i].name = '空闲'
                            this.equipmentOperatingData[i].itemStyle.color = '#fdc426';
                            break;
                        case "DEBUGGING":
                            this.equipmentOperatingData[i].name = '调试'
                            this.equipmentOperatingData[i].itemStyle.color = '#00a3b5';
                            break;
                        case "WARNING":
                            this.equipmentOperatingData[i].name = '故障'
                            this.equipmentOperatingData[i].itemStyle.color = '#ec6b80';
                            break;
                        case "CLOSED":
                            this.equipmentOperatingData[i].name = '关机'
                            this.equipmentOperatingData[i].itemStyle.color = '#7d7e7e';
                            break;
                    }
                }
            }
        },

        mounted() {
            this.transferData();
            this.$nextTick(() => {
                //   for(let i in )  
                this.createView()
            });
        }
    };
</script>

<style lang='less' scoped>
@running-color: #78a442; //运行状态颜色
@leisure-color: #fdc426; //空闲状态颜色
@debug-color: #00a3b5; //调试状态颜色
@trouble-color: #ec6b80; //故障状态颜色
@shutdown-color: #7d7e7e; //关机状态颜色
</style>