<template lang="html">
	<section class="list" >
		<section v-show='displayListStatus'>
			<section class="portlet-title" >
				<Icon type="person-stalker"></Icon>
				<span class='title_text'>角色列表</span>
			</section>
			<section  class='query-wrap border-wrap'>
				<div class="operate-wrap">
					<button-group class='operate' 
						:refreshStatus='true'
						:addStatus ='false'
						@refreshHandler = 'refreshHandler'>
					</button-group>
				</div>
			</section>
				
			<section>
				<zk-table
					ref="table"
					sum-text="sum"
					index-text="#"
					:data="treeData"
					:columns="columns"
					:stripe="props.stripe"
					:border="props.border"
					:show-header="props.showHeader"
					:show-summary="props.showSummary"
					:show-row-hover="props.showRowHover"
					:show-index="props.showIndex"
					:tree-type="props.treeType"
					:is-fold="props.isFold"
					:expand-type="props.expandType"
					:selection-type="props.selectionType">
					<template slot="$expand" slot-scope="scope">
						{{ `My name is ${scope.row.name},
						this rowIndex is ${scope.rowIndex}.`
						}}
					</template>
					<template slot="operate" slot-scope="scope">
						<Button type="primary" size="small" @click='addHandler(scope)'>新增</Button>
						<Button type="warning" size="small" @click='editHandler(scope)'>编辑</Button>
						<Button type="error" size="small" @click='deleteHandler(scope)' v-if='scope.row.pid && !scope.row.status'>删除</Button>
						
					</template>
				</zk-table>
				<Spin :fix='true' v-show='isLoading'>
					<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
					<div>Loading</div>
				</Spin>
			</section>
		</section>
		<section >
			<role-form v-if = 'displayFormStatus' :isEdit='isEdit' :formTreeData = 'formTreeData' @handlerBackList = 'handlerBackList'></role-form>
		</section>
		<section >
			<distribute-role v-if = 'displayDistriPageStatus' :roleDataItem='roleDataItem' @handlerBackList = 'handlerBackList'></distribute-role>
		</section>
		<prompt-model :promptModel='deletePromptModel' @handleConfirm='handleDelete' @on-change="changeDeteleModelStatus"></prompt-model>
	</section>
</template>

<script>
import Vue from 'vue'
import ZkTable from 'vue-table-with-tree-grid'
import buttonGroup from '@/views/components/button-group/index.vue';
import roleForm from './role-form.vue';
import distributeRole from './distribute-role.vue';
Vue.component(ZkTable.name, ZkTable);
import { getRoleTree,deleteRole  } from '@/api/system/roleInfo';
import promptModel from '@/views/components/prompt-model/index.vue';
// 删除请求
const deleteRoleAction = (self,id) => {
	return new Promise((resolve, reject) => {
		deleteRole(id).then(response => {
			if(response.code == 204){
				self.$Message.success('删除成功');
				self.getListData();
			}else{
				self.$Message.error('删除失败');
			}
			resolve();
			
		}).catch(error => {
			reject(error);
			self.$Message.error('删除失败');
		})
	})
};
// 查询资源数
const getRoleTreeAction = (self) => {
	self.isLoading = true;
	return new Promise((resolve, reject) => {
		getRoleTree().then(response => {
			if(response.code == 200){
				self.treeData = [response.content]
			}
			resolve();
			self.isLoading = false;
		}).catch(error => {
			reject(error);
			self.isLoading = false;
		})
	})
};
export default {
	name: 'role',
	data() {
		return {
			props: {
				stripe: false,
				border: false,
				showHeader: true,
				showSummary: false,
				showRowHover: true,
				showIndex: false,
				treeType: true,
				isFold: false,
				expandType: false,
				selectionType: false,
			},
			isLoading:false,
			displayListStatus:true,
			displayFormStatus:false,
			displayDistriPageStatus:false,
			isEdit:false,
			treeData: [],
			columns: [
				{
					label: '角色名称',
					prop: 'roleName',
					width: '400px',
				},
				{
					label: '角色描述',
					prop: 'roleDescription',
				},
				{
					label: '是否默认角色',
                    prop: 'resourceStatus',
                    align: 'center',
                    headerAlign: 'center'
				},
				{
					label: '操作',
					prop: 'operate',
					minWidth: '200px',
					type: 'template',
					template: 'operate',
				},
			],
			formTreeData: {},
			deletePromptModel:{
				title:'提示',
				dec: '确定删除吗？',
				status: false,
				submitText:'确定'
			},
			selectDataItem: {}
		};
	},
	computed: {
		propList() {
			return Object.keys(this.props).map(item => ({
				name: item,
			}));
		},
	},
	mounted(){
		this.init();
	},
	methods: {
		init(){
			this.getListData();
		},
		getListData(){
			getRoleTreeAction(this);
		},
		// 刷新页面
		refreshHandler(){
			this.getListData();
		},
		// 授权
		distributeHandler(data){
			this.displayDistriPageStatus = true;
			this.displayFormStatus = false;
			this.displayListStatus = false;
			this.roleDataItem = data.row;
		},
		// 新增form
		addHandler(data){
			this.displayFormStatus = true;
			this.displayListStatus = false;
			this.displayDistriPageStatus = false;
			this.formTreeData = data.row; 
			this.isEdit = false;
		},
		editHandler(data){
			this.displayFormStatus = true;
			this.displayListStatus = false;
			this.displayDistriPageStatus = false;
			this.formTreeData = data.row; 
			this.isEdit = true;
		},
		handlerBackList(val){
			this.displayFormStatus = false;
			this.displayDistriPageStatus = false;
			this.displayListStatus = true;
			if(val){
				this.getListData();
			}
		},
		deleteHandler(data){
			// this.deletePromptModel.status = true;
			this.selectDataItem = data;
			this.$Modal.confirm({
                title: '提示',
                content: '确定要删除吗',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    this.handleDelete();
                },
                onCancel: () => {
                    
                    
                }
            })
		},
		// 调用删除接口
		handleDelete(){
			deleteRoleAction(this,this.selectDataItem.row.id)
		},
		// 改变删除弹出层model
		changeDeteleModelStatus(val){
			this.deletePromptModel.status = val;
		}
	},
	components: {
		buttonGroup,
		roleForm,
		distributeRole,
		promptModel
	},
};
</script>

<style lang='less'>
	@import "../../../styles/searchAndOperate.less";
		.control-group {
		height: 55px;
		.error_text {
			color: red;
			padding-left: 110px;
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
		.symbol{
			color:red;
		}
	}
	.ivu-tabs-bar{
		margin-bottom: 0;
	}
	.ivu-modal-body{
		/*height:300px;*/
	}
</style>