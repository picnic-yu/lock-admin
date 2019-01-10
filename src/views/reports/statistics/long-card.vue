<template>
    <section class="long-card">
        <section class="card">
            <div class="left">
                <div style='width:100px;height:100px;margin:0 auto;background:#2d8cf0;color:#fff;border-radius:50%'>
                    <Icon type="locked"></Icon>
                </div>
                
            </div>
            <div class="right">
                <p class='title'>总锁具数</p>
                <p class='value'>{{countItem.locks}}</p>
            </div>
        </section>
        <div class="text-wrap">
            <div class="left">
                <div class='item'>
                    <span class='title'>累计开启数量</span>
                    <span>{{countItem.unlocksQuantity}}</span>
                </div >
                <div class='item'>
                    <span class='title'>累计授权次数</span>
                    <span>{{countItem.authQuantity}}</span>
                </div>
            </div>
            <div class="right">
                <div class='item'>
                    <span class='title'>开启次数</span>
                    <span>{{countItem.unlocksFrequency}}</span>
                </div>
                <div class='item'>
                    <span class='title'>授权次数</span>
                    <span>{{countItem.authFrequency}}</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
export default {
    components: {},

    props: {
        countItem:{
            type:Object,
            default:function(){
                return {}
            }
        }
    },

    data() {
        return {

        }

    },

    watch: {},

    methods: {},

    mounted() {},

}
</script>

<style lang='less' scoped>
.long-card{
    width:100%;
    height:270px;
    background: #fff;
    .text-wrap{
        height:140px;
        box-sizing: border-box;
        width:90%;
        margin: 0 auto;
        display: flex;
        border-top: 1px solid #ccc;
        align-content: center;
        align-items: center;
        .item{
            padding:15px 0;
            font-size: 18px;
            .title{
                color:#c6c6c6;
            }
        }
        .left{
            // padding-left:20px;
            flex:1;
        }
        .right{
            padding-left:20px;
            flex:1;
        }
    }
    .card{
        
        height:130px;
        width:100%;
        display: flex;
        align-content: center;
        align-items: center;
        .left{
            width:200px;
            font-size: 70px;
            text-align: center;
        }
        .right{
            flex: 1;
            .title{
                text-align: center;
                color:#c6c6c6;
                font-size: 14px;
            }
            .value{
                text-align: center;
                font-size: 30px;
            }
        }
    }
}
</style>
