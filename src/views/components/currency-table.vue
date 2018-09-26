<template>
    <section class="page">
        <div class="portlet-title">

            <span class='title_text'>
                <span style="display:inline-block;">{{title}}</span>
            </span>
        </div>
        <Row class='form-list'>
            <Col span="22" offset="1">
                <Spin :fix='true' v-show='isLoading'>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                </Spin>
                <Table border  class="margin-top-20 margin-bottom-20" :columns="column" :data="data1"></Table>
            </Col>
        </Row>
        <Row class='view-more' v-if='isShowMoreBtn'>
            <Col span="22" offset="1">
                <span @click="handleViewMore">更多...</span>
                <!-- <Button type="dashed" size="small" @click="handleViewMore">更多...</Button> -->
                <!-- <Button type="primary" shape="circle" size="small" @click="handleViewMore">更多...</Button> -->
            </Col>
        </Row>
    </section>
</template>

<script>
    export default {
        components: {},

        props: {
            title: {
                type: String,
                default: ''
            },
            column: {
                type: Array,
                default: () => []
            },
            data1: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            isShowMoreBtn:{
                type:Boolean,
                default:false
            },
            isLoading:{
                type:Boolean,
                default:false
            }
        },

        data() {
            return {
                
            }

        },

        watch: {},

        methods: {
            handleViewMore(){
                this.$emit('handleViewMore');
            }
        },

        mounted() { },

    }
</script>

<style lang='less' scoped>
    @import "../../styles/searchAndOperate.less";
    @import "../../styles/common.less";
</style>