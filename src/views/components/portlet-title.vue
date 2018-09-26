/*
 * @Author: Hano.zhang 
 * @Date: 2018-01-31 14:13:03 
 * @Last Modified by: wangtengfei
 * @Last Modified time: 2018-03-21 09:50:57
 */
 
<template>
<!-- 标题组件 包含当前页标题,ICON 以及返回事件 -->
<!-- @back='back'  -->
<!-- :showList = showList   {showList = true}-->
<!-- :icon = icontype   -->

<!-- <PortletTitle :titleText='titleText' :showList='showList' @back='back' :Icon='ios-cog-outline' :iconSize='22' ></PortletTitle> -->

    <section class="page">
        <div class="portlet-title">
            <Icon :type="Icon" :size='iconSize'></Icon>
            <span class='title_text'>{{titleText}}</span>
            <!-- <Button type="error" class="title_button" size="small" @click='back' v-show='!showList'>返回</Button> -->
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
 export default {
    name:'PortletTitle',
    components: {},

    props: {
        titleText:{
            type:String,
            default:""
        },
        showList:{
            typr:Boolean,
            default:true
        },
        Icon:{
            type:String,
            default:''
        },
        iconSize:{
            type:String,
            default:"22"  
        }
        
    },

    data() {
        return {

        }
   
    },

    watch: {},

    methods: {
        back(){
            this.$emit('back')
        },
    },

    mounted() {},

 }
</script>

<style  lang='less' scoped>
 .portlet-title{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    padding-left: 10px;
    font-weight: 600;
    color: #4a6076;
    // border-bottom: 1px solid #c0c0c0;
    margin-bottom: 5px;
    padding-top:8px;
    i{
      transform:translateY(3px);
    }
}
.title_button{
    float: right;
    margin-right: 40px;
    margin-top: 7px;
}

</style>
