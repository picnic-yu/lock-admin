<template>
    <section class="card">
        <div class="left">
            <div style='width:100px;height:100px;margin:0 auto;background:#2d8cf0;color:#fff;border-radius:50%'>
                <Icon :type="iconType"></Icon>
            </div>
            
        </div>
        <div class="right">
            <p class='title'>{{cardTitle}}</p>
            <p class='value'>{{cardNumber}}</p>
        </div>
    </section>
</template>

<script>
    export default {
    components: {},

    props: {
        iconType:{
            type:String,
            default:'ios-browsers'
        },
        cardTitle:{
            type:String,
            default:''
        },
        cardNumber:{
            type:[Number,String],
            default:0
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
.card{
    background: #fff;
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
</style>
