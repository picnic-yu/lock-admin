/*
 * @Author: Hano.zhang 
 * @Date: 2018-01-30 14:08:49 
 * @Last Modified by: yinjian
 * @Last Modified time: 2018-06-19 15:57:56
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
    chartsType: {
      type: Array,
      default: []
    },
    barWidth: {
      type: Number,
      default: 35
    }
  },

  data() {
    return {
      idName: "id" + Math.floor(Math.random() * 10000),
      seriesConfig: [],

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
      this.dataItem[4] = this.dataItem[4].map((item, index) => {
          return Number.parseFloat(item);
      })
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
                    if(item.seriesName!='label' && item.seriesType !=='line') {
                        res += `<span style="display:inline-block;
                            margin-right:5px;
                            border-radius:10px;
                            width:9px;
                            height:9px;
                            background-color:${item.color}">
                            </span>
                            ${item.seriesName}: ${item.data} ${unit}
                            <br>`
                    } else if (item.seriesName!='label') {
                        res += `<span style="display:inline-block;
                            margin-right:5px;
                            border-radius:10px;
                            width:9px;
                            height:9px;
                            border:1px solid ${item.color}">
                            </span>
                            ${item.seriesName}: ${item.data} ${unit}
                            <br>`
                    }
                    
                });
                return res
            }
        },
        // toolbox: {
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ["line", "bar"] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
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
            type: "value",
            name: "平均稼动率",
            interval: 25,
            // max:100,
            min:0,            
            axisLabel: {
            formatter: "{value} %"
            }
          }
        ],
        series: [
          {
            name: this.legend[0],
            type: "bar",
            data: this.dataItem [0]
          },
          {
            name: this.legend[1],
            type: "bar",
            data: this.dataItem [1]
          },
          {
            name: this.legend[2],
            type: "bar",
            data: this.dataItem [2]
          },
          {
            name: this.legend[3],
            type: "bar",
            data: this.dataItem [3]
          },
        //   {
        //     name: this.legend[4],
        //     type: "bar",
        //     data: this.dataItem [4]
        //   },
          {
            name: this.legend[4],
            type: "line",
            yAxisIndex: 1,
            data: this.dataItem[4],
          }
        ],
        color: ['#00bfb7', '#c8c800', '#782a2a', '#d48265', '#96b7a1']
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
