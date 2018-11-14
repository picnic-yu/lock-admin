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
                    :inputList='inputList'
                    ></search>
            </div>
        </div>

        <!-- 数据字典列表 -->
        <div class="list" v-show='showList'>
			<div class='table-wrap'>
				<i-table stripe  
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

        <!-- 添加编辑表单 -->
        <lookup-form v-if="showAddOrEdit"
            :isEdits='isEdit' 
			:editData='data'
            @handleBack='handleBack'>
        </lookup-form>
    </div>
</template>

<script>
	import operate from '@/views/components/button-group/index.vue';
	import search from '../../components/search-form/index.vue';
    import { queryLookupLists, deleteLookupLists } from '@/api/lookupListsInfo/lookup-lists'
    import lookupForm from './lookup-form'
    /**
	* 函数功能简述 列表table数据请求
	*@param    {obsect}  this     vue实例对象的this
    */
    //查询
    const queryAction = (self) =>  {
        return new Promise((resolve, reject) => {
            queryLookupLists(self.queryParam).then(response => {
                if(response.code == 200) {
                    self.listData = response.content.data;
                    self.total = response.content.rowCount;
                }else{
                    self.listData = [];
                    self.$Message.error("请求失败!");
                }
                self.isLoading = false;
            }).catch(error => {
				self.isLoading = false;
				reject(error);
			})
        })
    };
    //删除
 	const deleteAction = (self, data) => {
		return new Promise((resolve, reject) => {
			deleteLookupLists(data.id).then(response => {
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
        name: 'lookup-list',
        data() {
            return {
                columns1: [ //列
                    {
						title: '序号',
                        type: 'index',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '字典编码',
                        key: 'lookupName',
                        align: 'center'
                    },
                    {
                        title: '字典名称',
                        key: 'lookupDescription',
                        align: 'center'
                    }
                ],
                listData: [], //数据集合
                beanNameList: [], //任务实体列表
                total: 0, //数据总个数
                showList: true, //显示列表
                showAddOrEdit: false, //点击添加切换
                isEdit: false, //点击编辑切换
                showLog: false, //点击预览
                isLoading: false, //是否加载动画
                titleText: '数据字典列表', //标题名称
                iconType: 'person', 
                placeholderValue: '请输入字典编码或字典名称',
                removeInputFlag: 0,
                data: {}, //选中所在行数据
                isSelect: false, //是否选中
                selectIndex: '', //选中索引 
                queryParam: {   //分页查询参数                 
                    "pageSize": 10,
                    "keyWords": "",
                    "pageNumber": 0,
                },
                inputList: [

                ]
            }
        },
        methods: {
            init() {//初始化
                this.getListData()
            },
            getListData() {//分页查询
                queryAction(this);
            },
            query(data) { //条件查询
                this.queryParam.pageNumber = 0;
                this.queryParam.keyWords = data.keyWords;

                this.getListData();
            },
            selectItem(data, index) { //选中
                this.data = data;
                this.selectIndex = index;
                this.isSelect = true;
            },
            addHandler() { //添加
				this.showAddOrEdit = true;
				this.showList = false;
                this.isEdit = false;
				this.titleText = '新增数据字典信息';
            },
            editHandler() { //编辑
                this.showAddOrEdit = true;
                this.isEdit = true;
                this.showList = false;
                this.titleText = '编辑数据字典信息'
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
				if(val !='1'){
                    this.showAddOrEdit = false;
                    this.showList = true;
                    this.isSelect = false;
                    this.showLog = false;
                    this.isEdit = false;
                    this.titleText = '数据字典列表';
				}
				if(val){
					this.getListData();
				}
            },
            deleteHandler(data) { //删除
                let index = this.selectIndex;
                this.isLoading = true;
                deleteAction(this, this.data);
            },
            previewDetail(index) { //点击属性链接查看
				// this.data = this.listData[index];
				// this.numberParam = this.listData[index].numberOfCard;
				// this.showLog = true;
				// this.showAddOrEdit = false;
				// this.showList = false;
				// this.isEdit = false;
            }
        },
        mounted() {
            this.init();
        },
        components: {
            operate,
            search,
            lookupForm
        }
    }
</script>

<style lang='less' scoped>
@import "../../../styles/searchAndOperate.less";
</style>
