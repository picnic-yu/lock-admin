<template>
    <div class='property-list'>
        <div class="portlet-title" v-show='!showLog'>
			<Icon type="person-stalker"></Icon>
			<span class='title_text'>{{titleText}}</span>
		</div>
        <!--操作和查询框-->
        <div v-show='showList' class='query-wrap border-wrap'>
            <div class="operate-wrap">
                <operate class='operate' 
                    :deleteStatus='isSelect' 
                    :edit='isSelect' 
                    :data='data' 
                    :refreshStatus='true'
                    @refreshHandler='refreshHandler'
                    @editHandler='editHandler'
                    @addHandler='addHandler'
                    @deleteHandler='deleteHandler'></operate>
            </div>
            <div class="search-wrap">
                <search class='search-component'
                    @query='query' 
                    :removeInputFlag='removeInputFlag'
                    :placeholderValue='placeholderValue'
                    
                    ></search>
            </div>
        </div>

        <!-- 配置属性列表 -->
        <div class="list" v-show='showList'>
			<div class='table-wrap'>
				<i-table stripe highlight-row 
					:columns="columns1" 
					:data="listData" 
					@on-row-click='selectItem'> 
				</i-table>

				<Spin :fix='true' v-show='isLoading'>
					<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
					<div>Loading</div>
				</Spin>
			</div>
			<Page class='page-wrap' show-elevator show-total  
				:total="total" 
				:current="queryParam.pageNumber+1"
				@on-change='pageChange' >
			</Page>
		</div>
        <!-- 属性编辑、新增、点击属性链接 表单 -->
        <property-form v-if="add"
            :isEdit='isEdit' 
			:editData='data'
            @handleBack='handleBack'>  
        </property-form>
    </div>


</template>

<script>
	import operate from '@/views/components/button-group/index.vue';
	import search from '../../components/search-form/index.vue';
    import { queryProperty, deleteProperty } from "@/api/system/propertyInfo/index.js"
    import propertyForm from './property-form.vue'

	/**
	* 函数功能简述 列表table数据请求
	*@param    {obsect}  this     vue实例对象的this
    */
    //查询
    const queryAction = (self) =>  {
        return new Promise((resolve, reject) => {
            queryProperty(self.queryParam).then(response => {
                if(response.code == 200) {
                    self.isLoading = false;
                    self.listData = response.content.data;
                    self.total = response.content.rowCount;
                }
            })
        })
    };
    //删除
 	const deleteAction = (self,data) => {
		return new Promise((resolve, reject) => {
			deleteProperty(data.id).then(response => {
				if(response.code == 204 ){
					self.isSelect = false;
					self.getListData();
				}
				self.isLoading = false;
				resolve();
			}).catch(error => {
				self.isLoading = false;
				reject(error);
			})
		})
    }; 
    
    export default {
        name: 'property-list',
        data() {
            return {
                columns1: [ //列
                    {
						title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '属性名',
                        key: 'propertyName',
						// render: (h, params) => {
                        //     return h('div', [
                        //         h('a', {
                        //             on: {
                        //                 click: () => {
                        //                     this.previewDetail(params.index);
                        //                 }
                        //             }
                        //         }, params.row.propertyName)
                        //     ]);
                       	// },       
                    },
                    {
                        title: '属性值',
                        key: 'value'     
                    },
                    {
                        title: '属性描述',
                        key: 'description'
                    }
                ],
                listData: [], //数据集合
                total: 0, //数据总个数
                showList: true, //显示列表
                add: false, //点击添加切换
                isEdit: false, //点击编辑切换
                // isView: false, //点击属性名链接查看
                showLog: false, //上方标题
                isLoading: false, //是否加载动画
                titleText: '配置属性列表', //标题名称
                iconType: 'person', 
                placeholderValue: '请输入属性名',
                removeInputFlag: 0,
                data: {}, //选中所在行数据
                isSelect: false, //是否选中
                selectIndex: '', //选中索引 
                queryParam: {   //分页查询参数                 
                    "pageSize": 10,
                    "keyWords": "",
                    "pageNumber": 0,
                },
                // inputList: [
                //     {
				// 		title: "属性名称",
				// 		placeholder:'请输入属性名',
				// 		value:''
				// 	},
				// 	{
				// 		title: "属性值",
				// 		placeholder:'请输入属性值',
				// 		value:''
				// 	},
				// 	{
				// 		title: "属性描述",
				// 		placeholder:'请输入属性描述',
				// 		value:''
				// 	}
                // ]

            }
        },
        methods: {
            init() {//初始化
                this.getListData();
            },
            getListData() { //分页查询
                queryAction(this);
            },
            query(data) { //条件查询
                this.queryParam.pageNumber = 0;
                this.queryParam.keyWords = data.keyWords;
                // // 属性名称
				// this.queryParam.propertyName = data.inputList[0].value;
				// // 属性值
				// this.queryParam.value = data.inputList[1].value;
				// // 属性描述
				// this.queryParam.description = data.inputList[2].value;
                this.getListData();
            },
            selectItem(data, index) { //选中
                this.data = data;
                this.selectIndex = index;
                this.isSelect = true;
            },
            addHandler() { //添加
				this.add = true;
				this.showList = false;
                this.isEdit = false;
                // this.isView = false;
				this.titleText = '新增属性信息';
            },
            editHandler() { //编辑
                this.add = true;
                this.isEdit = true;
                // this.isView = false;
                this.showList = false;
                this.titleText = '编辑属性信息'
            },
            pageChange(data) { //分页查询
                this.queryParam.pageNumber = data -1;
                this.getListData();
            },
            refreshHandler() { //刷新
                this.queryParam.pageNumber = 0;
				this.queryParam.keyWords = '';
				this.removeInputFlag += 1;
            },
            handleBack(val) { //订阅返回
				this.add = false;
				this.showList = true;
				this.isSelect = false;
				this.showLog = false;
				this.isEdit = false;
                this.titleText = '配置属性列表';
                // this.isView = false;
				if(val){
					this.getListData();
				}
            },
            deleteHandler(data) { //删除
                let index = this.selectIndex;
                this.isLoading = true;
                deleteAction(this, data);
            },
            previewDetail(index) { //点击属性链接查看
                this.data = this.listData[index];
                this.add = true;
                this.showList = false;
                this.isEdit = false;
                // this.isView = true;
            }
        },
        components: {
            operate,
            search,
            propertyForm
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang='less'>
@import "../../../styles/searchAndOperate.less";
</style>
