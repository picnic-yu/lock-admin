/*
 * @Author: Hano.zhang 
 * @Date: 2018-01-29 20:54:21 
 * @Last Modified by: yinjian
 * @Last Modified time: 2018-06-21 14:38:14
 */

<template>
<!-- 设备状态用时占比 -->
        <section class="page pie-wrap">
            <div :id='idName' v-bind:class="{pieBorderBottom : isHomePage}" style='width:100%;height:420px'></div>
        </section>

</template>

<script type="text/ecmascript-6">
 import echarts from "echarts";
 export default {
    name:'equipmentTimeAnalysis',
    components: {},

    props: {
        data: {
            type: Array,
            default: function () {
                return [
                    {
                        name: '运行',
                        value: 420
                    },
                    {
                        name: '空闲',
                        value: 90
                    },
                    {
                        name: '调试',
                        value: 60
                    },
                    {
                        name: '故障',
                        value: 30
                    },
                    {
                        name: '关机',
                        value: 120
                    }
                ];
            },
        },
        isHomePage:{
            type:Boolean,
            default:false
        },
        radius :{
            type:Array,
            default:function () {
                return ['50%','70%']
            }
        },
        title :{
            type:Object,
            default:function () {
                return {}
            }
        }
    },

    data() {
        return {
            idName: "id" + Math.floor(Math.random() * 10000)
        }
   
    },

    computed: {
        getData: function() {
            let temp = []
            return temp = this.data.map((item, index) => {
                let o = {
                    name: `${item.name}${item.value}小时`,
                    value: item.value
                }
                return o
            })           
        }
    },
    watch: {
        data(){
            this.cerateView()
        }
    },

    methods: {
        cerateView(){
            var equipmentTimeAnalysis = echarts.init(document.getElementById(this.idName));

            const option = {
                title :{
                    text: '',
                    x: '15%',
                    y: '10%',
                    textStyle: {
                        color: '#495060'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {d}%"
                },
                legend: {
                    orient: 'vertical',
                    type: 'plain',
                    right: '20%',
                    top: '5%',
                    data: this.getData,
                    formatter: (name) => {
                        return name.split('').splice(0,2).join('')
                    },
                    show: true
                },
                
                series : [
                    {
                        name: '设备月用时占比',
                        type: 'pie',
                        radius :this.radius,
                        center: ['50%', '50%'],
                        data: this.getData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                ],
                color:['#7d7e7e', '#78a442', '#fdc426', '#00a3b5', '#ec6b80', ]
                // color:['hsl(180, 0%, 44%)', 'hsl(87, 43%, 39%)', 'hsl(44, 98%, 52%)', 'hsl(186, 100%, 29%)', 'hsl(350, 77%, 62%)', ]
            };


            // equipmentTimeAnalysis.setOption(option);

            // window.addEventListener("resize", function() {
            //     equipmentTimeAnalysis.resize();
            // });  
            let _this = this, timer
            equipmentTimeAnalysis.resize();
            equipmentTimeAnalysis.setOption(option);
            window.addEventListener("resize", function() {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    equipmentTimeAnalysis.resize({
                        width: document.querySelector('#' + _this.idName) ? document.querySelector('#' + _this.idName).clientWidth : null
                    });
                }, 300)
            });    
        }
    },

    mounted() {
        this.$nextTick(()=>{
            this.cerateView()
        })
    },

 }
</script>

<style  lang='less' scoped>
@running-color: #78a442; //运行状态颜色
@leisure-color: #fdc426; //空闲状态颜色
@debug-color: #00a3b5; //调试状态颜色
@trouble-color: #ec6b80; //故障状态颜色
@shutdown-color: #7d7e7e; //关机状态颜色
.pie-wrap {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
}
.pieBorderBottom{
    padding-bottom: 30px;
    border-bottom:1px solid #cccc;


}
.pieInfo{
    div{
        padding-left:20px;
    }
}
.infoName{
    color: rgba(55,55,55,.7);
    font-weight:500;
    font-size: 16px; 
}
.infoValue {
    font-size: 14px;
    color: rgba(55,55,55,.7);

}
</style>
