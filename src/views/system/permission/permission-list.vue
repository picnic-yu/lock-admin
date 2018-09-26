<template>
	<div class="permission">
		<section v-show = '!displayDistributResource'>
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
						:data='dataItem'
						:dynamicBtn='dynamicBtn' 
						:refreshStatus='true'
						@deleteHandler='deleteHandler' 
						@dynamicBtnHandler='dynamicBtnHandler'
						@refreshHandler = 'refreshHandler'
						@addHandler='addHandler' 
						@editHandler='editHandler'></operate>

				</div>
				<div class="search-wrap">
					<search class='search-component'
						@query='query' 
						:removeInputFlag='removeInputFlag'
						:placeholderValue='placeholderValue'  >
					></search>
				</div>
			</div>
			
			<!--列表-->
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
					:current = "queryParam.pageNumber+1"
					@on-change='pageChange' >
				</Page>

			</div>
			<!--列表结束-->
			<!--新增或者编辑查看开始-->
			<add-permission v-if='add' 
				:isEdit='isEdit' 
				:editData='dataItem'
				:previewStatus='previewStatus' 
				@handlerBackList='handlerBackList' >
			</add-permission>
		</section>
		<section v-if = 'displayDistributResource'>
			<distribute-resource :permissionDataItem='dataItem' @handlerBackList='handlerBackList'></distribute-resource>
		</section>
	</div>
</template>

<script>
	import operate from '@/views/components/button-group/index.vue';
    import search from '../../components/search-form/index.vue';
    import addPermission from './add-permission.vue';
    import distributeResource from './distribute-resource.vue';
    import { queryPermission, deletePermission } from '@/api/system/permissionInfo';
	export default {
        name: 'permission',
		data() {
			let self  = this;
			return {
				columns1: [
					{
						title: '序号',
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
					{
						title: '权限名称',
						key: 'permissionName',
						align: 'center',
						render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    
                                    on: {
                                        click: () => {
                                            this.previewPage(params.index);
                                        }
                                    }
                                }, params.row.permissionName )
                            ]);
                       	}
					},
					{
						title: '权限描述',
						align: 'center',
						key: 'permissionDescription'
					},
					{
						title: '是否启用',
						align: 'center',
						width: 100,
						key: 'statusText'

					}
				],
				listData: [],
				dataItem: {},
				isSelect: false,
				value: '',
				total: 0,
				placeholderValue: '输入权限名称',
				add: false, // 点击添加切换
				isEdit: false, // 点击编辑切换
				showList: true, //显示列表
				titleText: '系统权限列表',
				iconType: 'person',
				isLoading: false,
				showLog: false,
				queryParam: {
					"pageSize": 10,
					"keyWords": '',
					"pageNumber": 0
				},
				remarks: '',
				numberOfCard: '',
				log_loading:false,//进入log页面加载
				numberParam: '',
				removeInputFlag:0,
				previewStatus: false,//是否查看预览页面
				displayDistributResource:false,
				dynamicBtn:{
					status: false,
					text: '授权'
				}
			}
		},
		methods: {
			init() {

			},
			handlerBackList(val){
				this.showLog = false;
				this.isEdit = false;
				this.add = false;
				this.showList = true;
				this.titleText = '权限列表';
				// 授权页面
				this.displayDistributResource = false;
				if(val){
					this.getListData();
				}
			},
			// 刷新页面
			refreshHandler(){
				this.queryParam.pageNumber = 0;
				this.queryParam.keyWords = '';
				this.removeInputFlag += 1;
			},
			//获取列表页面
			getListData() {
				// 授权页面
				this.displayDistributResource = false;
				this.dynamicBtn.status = false;
				this.isLoading = true;
				return new Promise((resolve, reject) => {
					queryPermission(this.queryParam).then(response => {
						if(response.code == 200 ){
							this.isLoading = false;
							this.listData = response.content.data;
							this.total = response.content.rowCount;
							this.listData.forEach( (item) => {
								//是否可用
								if(item.status){
									item.statusText = '是';
								}else{
									item.statusText = '否';
								}
							});
						}
						this.isLoading = false;
						resolve()
					}).catch(error => {
						reject(error)
						this.isLoading = false;
					})
				})
			},
			// 查看页面
			previewPage(){
				this.editHandler();
				this.isEdit = true;
				this.previewStatus = true;
				this.titleText = '权限详情';
			},
			query(data) {
				this.queryParam.pageNumber = 0;
				this.queryParam.keyWords = data.keyWords;
				this.getListData();
			},
			addHandler() {
				this.add = true;
				this.showList = false;
				this.isEdit = false;
				this.titleText = '新增权限';
				this.previewStatus = false;
				// 授权页面
				this.displayDistributResource = false;
			},
			editHandler(){
				this.add = true;
				this.isEdit = true;
				this.showList = false;
				this.titleText = '编辑权限';
				this.previewStatus = false;
				// 授权页面
				this.displayDistributResource = false;
			},
			deleteHandler(data) {
				let index = this.selectIndex;
				this.isLoading = true;
				return new Promise((resolve, reject) => {
					deletePermission(data).then(response => {

						if(response.code == 204 ){
							this.$Message.success('删除成功');
							this.isLoading = false;
							//删除成功,页面删除点击的那行，此时要取消选中行，隐藏修改喝删除按钮
							this.getListData();
							this.isSelect = false;
						}else{
							this.$Message.error('删除失败');
						}
						resolve()
					}).catch(error => {
						reject(error)
					})
				})
			},
			selectItem(data, index) {
				this.dataItem = data;
				this.selectIndex = index;
				this.isSelect = true;
				this.dynamicBtn.status = true;
			},
			pageChange(data) {
				this.queryParam.pageNumber = data -1;
				this.getListData();
			},
			//授权
			dynamicBtnHandler(){
				this.showLog = false;
				this.add = false;
				this.showList = true;
				this.isEdit = false;
				this.displayDistributResource = true;
			}
		},
		components: {
			operate,
			search,
			addPermission,
			distributeResource
		},
		mounted() {
			this.init();
			this.getListData();
		}
	};
</script>

<style lang='less'>
	@import "../../../styles/searchAndOperate.less";
		.control-group {
		height: 55px;
		.error_text {
			color: red;
			padding-left: 10px;
		}
	}
	
	.dec {
		display: inline-block;
		vertical-align: middle;
		width: 90px;
		text-align: right;
		height: 25px;
		line-height: 25px;
		font-size: 14px;
		margin-right: 10px;
	}
</style>