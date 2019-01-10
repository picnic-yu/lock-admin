<template>
    <div class='property-list'>
        <div class="portlet-title">
			<span class='title_text'>{{titleText}}</span>
		</div>
        <i-table stripe 
            :loading="loading" 
            :columns="columns" 
            :data="listData" > 
        </i-table>
    </div>
</template>

<script>
export default {
    components: {},

    props: {
        titleText:{
            type:String,
            default:'122121'
        },
        loading:{
            type:Boolean,
            default:false
        },
        columns:{
            type:Array,
            default:function(){
                return [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ]
            }
        },
        listData:{
            type:Array,
            default:function(){
                return [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
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
 @import "../../../styles/searchAndOperate.less";
</style>
