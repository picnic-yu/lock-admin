/*
 * @Author: Hano.zhang 
 * @Date: 2018-01-29 20:54:21 
 * @Last Modified by: yinjian
 * @Last Modified time: 2018-06-19 16:07:03
 */

<template>
<!-- 设备状态用时占比 -->
    <section class="page">
        <div :id='idName' v-bind:class="{pieBorderBottom : isHomePage}" style='width=100%;height:240px'></div>
      
        <section class="pieInfo" v-if="isHomePage">
            <div v-for='item in data' :key='item.name' >
               <span class="infoName">{{item.name}}:</span> <span class="infoValue">{{item.value}}</span> 
                <br>
            </div>
        </section>

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
                return [];
            },
            
        },
        isHomePage:{
            type:Boolean,
            default:false
        },
        radius :{
            type:Array,
            default:function () {
                return ['0%','70%']
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
            idName:"id" + Math.floor(Math.random() * 10000)
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
                title :this.title,
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: this.data,
                    show:false
                },
                
                series : [
                    {
                        name: '正常客户数',
                        type: 'pie',
                        radius :this.radius,
                        center: ['50%', '60%'],
                        data:this.data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                ],
                color:['#99c7ae', '#ca8622', 'rgb(242, 94, 67)','#6e7074', '#546570', '#c4ccd3']
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
