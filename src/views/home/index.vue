<template>
    <section class="page" >
        <section class='chart-wrap'>
            <div class="portlet-title">
                <span class='title_text'>
                    <span style="display:inline-block;">用户/锁具统计</span>
                </span>
            </div>
            <section class='form-list chart-mask'>
                <Spin :fix='true' v-show='false'>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                </Spin>
                <section class='chart'>
                    <lock-bar></lock-bar>
                </section>
            </section>
        </section>
        <section class='chart-wrap'>
            <div class="portlet-title">
                <span class='title_text'>
                    <span style="display:inline-block;">用户活跃时段</span>
                </span>
            </div>
            <section class='form-list chart-mask'>
                <Spin :fix='true' v-show='false'>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                </Spin>
                <section class='chart'>
                    <user-line></user-line>
                </section>
            </section>
        </section>

        
    </section>
</template>

<script type="text/ecmascript-6">
import lockBar from '@/views/components/Echarts/lock-bar.vue'; 
import userLine from '@/views/components/Echarts/user-line.vue'; 
export default {
    components: {
        lockBar,
        userLine
    },

    props: {},

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
    .chart-wrap{
        margin-top:20px;
        .chart{
            padding:20px;
        }
    }
</style>
