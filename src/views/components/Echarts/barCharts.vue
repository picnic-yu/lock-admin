/*
 * @Author: Hano.zhang 
 * @Date: 2018-01-30 14:08:49 
 * @Last Modified by: yinjian
 * @Last Modified time: 2018-06-19 15:57:51
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
  name: "barOrganizationTotal",
  components: {},
  props: {
    Xdate: {
      type: Array
    },
    legend: {
      type: Array,
      default: []
    },
    dataItem: {
      type: Array,
      default: []
    },

    barWidth: {
      type: Number,
      default: 55
    }
  },

  data() {
    return {
      idName: "id" + Math.floor(Math.random() * 10000),
      seriesConfig: []
    };
  },

  watch: {
    dataItem() {
      if (this.legend) {
        this.deconstruction();
      }
    }
  },

  methods: {
    deconstruction() {
      // let obj = {};
      // for (let i=0;i<this.legend.length;i++){
      //     obj.name = this.legend[i],
      //     obj.type = this.chartsType[i],
      //     obj.data = this.dataItem[i],
      //     obj.markPoint={
      //         data: [
      //             {type: 'max', name: '最大值'},
      //             {type: 'min', name: '最小值'}
      //         ]
      //     },
      //     // obj.markLine={
      //     //     data: [
      //     //         {type: 'average', name: '平均值'}
      //     //     ]
      //     // }
      //     this.seriesConfig.push(Object.assign({},obj));

      // }
      this.cerateView();
    },
    cerateView() {
      var observedUtilizationDay = echarts.init(
        document.getElementById(this.idName)
      );
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
            x: '4%',
            top: '5%',
            data: this.legend
        },
        grid: {
            borderWidth: 0,
            top: 100,
            bottom: 40,
            left: 80,
            right: 80,
            // textStyle: {
            //     color: "#fff"
            // }
        },
        xAxis: [
          {
            type: "category",
            data:this.Xdate,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: 
          {
            type: "value",
            name: '放款金额',
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
            axisLabel: {
            formatter: "{value} 万元"
            }
          }
        ,
        series: [
          {
            name: this.legend,
            type: "bar",
            data: this.dataItem,
            barMaxWidth: this.barWidth,

          },

        ],
        color: ['#00bfb7']
      };

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
      this.cerateView();
    });
  }
};
</script>

<style  lang='less' scoped>

</style>
