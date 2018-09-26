<style lang="less">
    @import './styles/infor-card.less';
</style>

<template> 
    <Card :padding="0" class="iconCardHover">
        <div class="infor-card-con" @click='jumpPage' :class="name ? 'jump' : '' ">
            <Col class="infor-card-icon-con" :style="{backgroundColor: 'white', color: color}" span="8">
                <Row class="height-100" type="flex" align="middle" justify="center">
                    <Icon :type="iconType" class="iconEl" :size="iconSize"></Icon>
                </Row>
            </Col>
            <Col span="16" class="height-100">
                <Row type="flex" align="middle" justify="center" class="height-100">
                    <count-up 
                        class="infor-card-count user-created-count" 
                        :descriptionColor = "'#292b2c'"
                        :id-name="idName" 
                        :textDescription='textDescription'
                        :end-val="endVal" 
                        :color="color"
                        :countSize="countSize"
                        :countWeight="countWeight">
                        <p class="infor-intro-text"  v-if='bossHide' slot="intro">{{ introText }}</p>
                    </count-up>
                </Row>
            </Col>
        </div>
    </Card>
</template>

<script>
import countUp from './countUp.vue';
import Cookies from "js-cookie";

export default {
    name: 'inforCard',
    components: {
        countUp
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
        border-radius: 0;
    }
</style>



