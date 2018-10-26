<template>
    <section class='card-wrap'>
        <div class="top-content">
            <div class="top-left">
1
            </div>
            <div class="top-right">
12343333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
            </div>
        </div>
        <div class="button-wrap">
            <div class="button-content">
                <Row>
                    <Col span="10" offset="1">
                       {{status}}
                    </Col>
                    <Col span="10" offset="1">
                        编辑
                    </Col>
                </Row>
                
            </div>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
export default {
    components: {},

    props: {},

    data() {
        return {
            status:'启用'
        }

    },

    watch: {},

    methods: {},

    mounted() {},

}
</script>

<style lang='less' scoped>
.card-wrap{
    width: 100%;
    border:1px solid #cccccc;
    border-radius: 5px;
    min-height: 150px;
    .top-content{
        height:auto;
        width:100%;
        padding:15px;
        .top-left{
            width:100px;
            float:left;
        }
        .top-right{
            width:calc(100%-100px);
            float:left;
        }
    }
    .button-wrap{
        height:auto;
        width:100%;
        .button-content{
            width:80%;
            margin:0 auto;
            height:80px;
            background: skyblue;
        }
    }
}
</style>
