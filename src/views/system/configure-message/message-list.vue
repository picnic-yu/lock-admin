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

        <!-- 添加编辑表单 -->
        <message-form v-if="showAddOrEdit"
            :isEdit='isEdit' 
			:editData='data'
            @handleBack='handleBack'>
        </message-form>
    </div>
</template>

<script>
    import search from '@/views/components/search-form/index.vue';
	import operate from '@/views/components/button-group/index.vue';
    import messageForm from './message-form.vue';

    import { saveMessage, saveParams, requestParamsList, requestMessageList } from '@/api/system/configure-message';
    /**
	* 函数功能简述 列表table数据请求
	*@param    {obsect}  this     vue实例对象的this
    */
    //查询
    
    const queryAction = (self) =>  {
        return new Promise((resolve, reject) => {
            requestMessageList(self.queryParam).then(response => {
                if(response.code == 200) {
                    self.listData = response.content.data || [];
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
            self.$Message.success("删除成功");
            resolve();
            // self.isLoading = true;

			// deleteLookupLists(data.id).then(response => {
			// 	if(response.code == 204 ){
			// 		self.isSelect = false;
			// 		self.getListData();
			// 	}
			// 	self.isLoading = false;
			// 	resolve();
			// }).catch(error => {
			// 	self.isLoading = false;
			// 	reject(error);
			// })
		})
    };
    export default {
        name: 'message-list',
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
                        title: '发送URL',
                        key: 'sendURL',
                        align: 'center'
                    },
                    {
                        title: '通道类型',
                        key: 'channelType',
                        align: 'center'
                    },
                    {
                        title: '请求方法',
                        key: 'requestMethod',
                        align: 'center'
                    },
                    {
                        title: '编码方式',
                        key: 'encoding',
                        align: 'center'
                    },
                    {
                        title: '发送成功返回值',
                        key: 'backValue',
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
                titleText: '短信通知列表', //标题名称
                iconType: 'person', 
                placeholderValue: '',
                removeInputFlag: 0,
                data: {}, //选中所在行数据
                isSelect: false, //是否选中
                selectIndex: '', //选中索引 
                queryParam: {   //分页查询参数                 
                    pageSize: 10,
                    keyWords: "",
                    pageNumber: 0,
                },
                inputList: [

                ]
            }
        },
        methods: {
            //初始化
            init() {
                this.getListData()
            },
            //分页查询
            getListData() {
                queryAction(this);
            },
            //条件查询
            query(data) { 
                this.queryParam.pageNumber = 0;
                this.queryParam.keyWords = data.keyWords;

                this.getListData();
            },
            //选中
            selectItem(data, index) {
                 this.data = data;
                this.selectIndex = index;
                this.isSelect = true;
            },
            //添加
            addHandler() { 
				this.showAddOrEdit = true;
				this.showList = false;
                this.isEdit = false;
				this.titleText = '新增短信通知';
            },
            //编辑
            editHandler() { 
                this.showAddOrEdit = true;
                this.isEdit = true;
                this.showList = false;
                this.titleText = '编辑短信通知'
            },
            //分页查询
            pageChange(data) { 
                this.queryParam.pageNumber = data -1;
                this.getListData();
            },
            //刷新
            refreshHandler() { 
                this.queryParam.pageNumber = 0;
				this.queryParam.keyWords = '';
				this.removeInputFlag += 1;
            },
            handleBack(val) { //订阅返回
				if(val != 1){
                    this.showAddOrEdit = false;
                    this.showList = true;
                    this.isSelect = false;
                    this.showLog = false;
                    this.isEdit = false;
                    this.titleText = '短信通知列表';
				}
				if(val){
					this.getListData();
				}
            },
            deleteHandler(data) { //删除
                let index = this.selectIndex;
                deleteAction(this, data);
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
            search,         //查询组件
            operate,        //操作框组件
            messageForm,    //短息通知表单
        }
    }
</script>

<style lang='less' scoped>
@import "../../../styles/searchAndOperate.less";
</style>
