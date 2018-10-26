<template>
    <section >
        <div class="portlet-title" v-show='!showLog'>
            <Icon type="person-stalker"></Icon>
            <span class='title_text'>短信模板</span>
        </div>
        <div  class='border-wrap content-wrap'>
			<card></card>
		</div>
    </section>
</template>

<script >
import card from './card.vue'
export default {
    components: {
        card
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
@import "../../../styles/searchAndOperate.less";
.content-wrap{
    background: #fff;
}
</style>
