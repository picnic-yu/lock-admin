<style lang="less">
    @import './styles/infor-card.less';
</style>

<template> 
    <Card :padding="0" class="iconCardHover">
        <div class="infor-card-con" @click='jumpPage' :class="name ? 'jump' : '' " :style="{height: height}">
            <Col class="infor-card-icon-con" :style="{backgroundColor: backgroundColorLeft, color: color}" span="8">
                <Row class="height-100" type="flex" align="middle" justify="center">
                    <!-- <span class="iconBorder" :style="{borderColor:color}"> -->
                        <Icon :type="iconType" class="iconEl" :size="iconSize"></Icon>
                    <!-- </span> -->
                </Row>
            </Col>
            <Col span="16" class="height-100" :style="{backgroundColor: backgroundColorRight, color: color}">
                <Row type="flex" align="middle"  class="height-100">
                    <count-up-color 
                        class="infor-card-count user-created-count" 
                        :id-name="idName" 
                        :textDescription='textDescription'
                        :descriptionColor='rightColor'
                        :end-val="endVal" 
                        :color="color"
                        :countSize="countSize"
                        :countWeight="countWeight">
                        <p v-if='bossHide' slot="intro" style="min-width:200px;">{{ introText }}</p>
                    </count-up-color>
                </Row>
            </Col>
        </div>
    </Card>
</template>

<script>
import countUpColor from './countUp-color.vue';
import Cookies from "js-cookie";

export default {
    name: 'inforCard',
    components: {
        countUpColor
    },
    data(){
        return {
            bossHide:true,
            name:''
        }
    },
    props: {
        idName: {
            type: String,
            default: ''
        },
        endVal: {
            type: Number,
            default: 0
        },
        //字体颜色
        color: {
            type: String,
            default: 'rgba(0, 0, 0, 0)'
        },
        iconType: {
            type: String,
            default: 'help'
        },
        //说明文字
        introText: {
            type: String,
            default: ''
        },
        //主要描述
        textDescription: {
            type: String,
            default: ''
        },
        countSize: {
            type: String,
            default: '30px'
        },
        countWeight: {
            type: Number,
            default: 700
        },
        iconSize: {
            type: Number,
            default: 40
        },
        pathName: {
            type: String,
            default: ''
        },
        //左侧背景颜色
        backgroundColorLeft: {
            type: String,
            default: 'rgba(0, 0, 0, 0)'
        },
        //右侧背景颜色
        backgroundColorRight: {
            type: String,
            default: 'rgba(0, 0, 0, 0)'
        },
        // card高度
        height: {
            type: String,
            default: '0'
        },
        // 右侧文本颜色
        rightColor: {
            type: String,
            default: 'rgba(0, 0, 0, 0)'
        }
    },
    methods:{
        init(){
            this.name = this.pathName;
        },
        jumpPage(){
            if (this.name){
                this.$router.push({
                    name:this.name,
                }); 
            }
        },
    },
    mounted(){
        let userRole = Cookies.get("userRole");

        if (userRole=="zhang") {
            this.bossHide = false;
        }
        this.init();
    }
};
</script>

<style lang='less' scoped >
    .infor-card-con{
        // box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .1);
        transition: all .3s ease;
    }
    .infor-card-con:hover{
        // box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .2);
    }
    .iconCardHover{
        // padding: 0 10px 0 ;
    }
    .iconCardHover:hover{
        box-shadow: none;
    }
    .iconBorder{
        display: block;
        position: relative;
        text-align: center;
        border-radius: 50%;
        line-height: 80px;
        height: 60px;
        width: 60px;
        border-width :1px;
        border-style: solid;
        &::after{
            content:'';
            position:absolute;      
            top:-5px;  
            left:-5px;   
            display: block;
            border-width :1px;
            border-style: solid;
            opacity: .3;
            width:68px;
            height: 68px;
            border-radius: 50%;

        }
        
    }
    .jump{
        cursor: pointer;
    }
    .ivu-card-bordered{
        border:none;
    }
    .ivu-card{
        border-radius:0px !important;
    }
    // .infor-card-con {
    //     height: 100px !important;
    // }
</style>



