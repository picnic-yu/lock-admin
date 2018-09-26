<template lang="html">
	<section class="list"  >
		<section >
			<div  class='query-wrap border-wrap'>
				<div class="operate-wrap">
					
					<button-group class='operate' 
						@addHandler='addHandler'
						@deleteHandler="deleteHandler"
						@editHandler='editHandler'
                        :addStatus="!!organizationData.id"
						:edit='editStatus'
						:deleteStatus='isDelete'
						:refreshStatus='false'
						:data='organizationData'
					></button-group>

				</div>
			</div>
			<section class='iview-tree-wrap'>
				<!-- <p>组织信息</p> -->

				<Tree :data="treeData" @on-select-change='selectTree'></Tree>
			</section>
			
		</section>
		<!-- 新增组织开始 -->
		<section v-if='formModelStatus'>
			<organization-form :isEdit='isEdit' :formModelStatus='formModelStatus' @handleRefresh ='refreshHandler' :organizationData='organizationData' @on-change='formModelChange'></organization-form>
		</section>
		<!-- 新增组织结束 -->
		
	</section>
</template>

<script>
import buttonGroup from '@/views/components/button-group/index.vue';
import { getOrganizationTrees, deleteOrganization  } from '@/api/organization';
import organizationForm from './organization-form.vue';
// 删除请求
const deleteOrganizationAction = (self,id) => {
	return new Promise((resolve, reject) => {
		deleteOrganization(id).then(response => {
			if(response.code == 204){
				self.$Message.success('删除成功');
				self.$emit('handleRefresh');
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
// 查询组织树
const queryOrganizationAction = (self) => {
	self.isLoading = true;
	return new Promise((resolve, reject) => {
		getOrganizationTrees().then(response => {
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
	name: 'organization-tree',
	data() {
		return {
			isLoading:false,
			displayFormStatus:false,
			isEdit:false,
			treeData: [],
			formTreeData: {},
			selectDataItem: {},
			formModelStatus:false,					//控制显示添加组织model
			organizationData:{},						//传入编辑组织数据
			isDelete: false,
			editStatus: false,
			isEdit: false,
		};
	},
	computed: {
		
	},
	mounted(){
		this.init();
	},
	methods: {
		init(){
			this.getListData();
		},
		selectTree(val){
			this.organizationData = val.length == 1 ? val[0]:{};
			this.isDelete = val.length == 1 ? true:false;
			this.editStatus = val.length == 1 ? true:false;
			// if(val.length == 1){
				this.$store.commit('UPDATE_ORGANAZATION',val[0]? val[0] : {});
			// }
		},
		// 刷新按鈕操作
		refreshHandler(){
			this.getListData();
			this.$emit('handleRefresh');
		},
		getListData(){
			this.isDelete = false;
			queryOrganizationAction(this);
		},
		
		// 新增form
		addHandler(){
			if(this.organizationData.id){
				this.formModelStatus = true;
				this.isEdit = false;
			}else{
				this.$Message.error('请选择一个组织');
			}
			
		},
		formModelChange(val){
			this.formModelStatus = val;
		},
		
		deleteHandler(data){
			deleteOrganizationAction(this,this.organizationData.id);
		},
		editHandler(data) {
			this.isEdit = true;
			this.formModelStatus = true;
			// this.formTreeData = data.row;
		}
	},
	components: {
		buttonGroup,
		organizationForm
	},
};
</script>

<style lang='less'>
	.iview-tree-wrap{
		padding:10px 30px;
		border: 1px solid #e6e6e6;
		border-radius: 10px;
		min-height:300px;
		background: #fff;
	}
</style>