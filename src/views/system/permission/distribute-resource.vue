<template lang="html">
	<section class="list" >
		<section >
			<section class="portlet-title" >
				<Icon type="person-stalker"></Icon>
				<span class='title_text'>资源分配</span>
				<ButtonGroup  class='slectAllBtn'>
				</ButtonGroup>
			</section>
				
			<section class='form-list'>
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
						<Checkbox v-model="scope.row.checkBox" @on-change='selectResource(scope.row)'></Checkbox>
					</template>
				</zk-table>
				<Spin :fix='true' v-show='isLoading'>
					<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
					<div>Loading</div>
				</Spin>
			</section>
		</section>
		<div class="button-gropEl resource-button">
			<ButtonGroup >
				<Button type="primary" @click="handleSubmit" :loading='saveLoading'>保存</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button @click='handleBackList'>返回</Button>
			</ButtonGroup>
		</div>
	</section>
</template>

<script>
import Vue from 'vue';
import ZkTable from 'vue-table-with-tree-grid';
Vue.component(ZkTable.name, ZkTable);
import { distributeResource,getPermissionsTree  } from '@/api/system/permissionInfo';

// 查询资源数
const getPermissionsTreeAction = (self) => {
	self.isLoading = true;
	return new Promise((resolve, reject) => {
		getPermissionsTree(self.permissionId).then(response => {
			if(response.code == 200){
				self.treeData = [response.content];
				recursion (self.treeData)
				self.treeData.forEach((item,i) => {
					if(item.checkBox){
						self.idArr.push(item.id);
						if(item.children.length){
							item.children.forEach((obj) => {
								if(obj.checkBox){
									self.idArr.push(obj.id);
									if(obj.children.length){
										obj.children.forEach((o) => {
											if(o.checkBox){
												self.idArr.push(o.id);
												if(o.children.length){
													o.children.forEach((value) => {
														if(value.checkBox){
															self.idArr.push(value.id)
														}
													});
												}
											}
										});
									}
								}
							})
						}
					}
				});
			}
			resolve();
			self.isLoading = false;
		}).catch((error) => {
			reject(error);
			self.isLoading = false;
		})
	})
};
// 递归遍历tree数据
let recursion = (params) =>{
    if(params.length <= 0){
        return
    }
    params.forEach( v =>{
        v = Object.assign(v,v.nodeInfo)
        v.statusName = v.status == 1? '是' : '否'
        recursion (v.children)
    })
}
const distributeResourceAction = (self) => {
    if(!self.idArr.length){
        return self.$Message.error('请选择资源名称');
	}
	self.saveLoading = true;
    self.isLoading = true;
    return new Promise((resolve, reject) => {
		distributeResource(self.permissionId,{operationItem:self.idArr.join(',')}).then(response => {
			if(response.code == 201){
                self.$Message.success('保存成功');
                self.$emit('handlerBackList',true);
			}else{
                self.$Message.error('保存失败');
			}
			self.saveLoading = false;
			resolve();
			self.isLoading = false;
		}).catch((error) => {
			reject(error);
			self.saveLoading=false;
            self.isLoading = false;
            self.$Message.error('保存失败');
		});
	})
}
export default {
	props: {
        permissionDataItem: {
            type: Object,
            default: function() {
                return {};
            }
        }
	},
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
			treeData: [],
			columns: [
				{
					label: '标题',
					prop: 'title',
					width: '400px',
				},
				{
					label: '资源名称',
					prop: 'name',
				},
				{
					label: '是否启用',
					prop: 'statusName',
				},
				{
					label: '操作',
					prop: 'operate',
					width: '100px',
					type: 'template',
					template: 'operate',
				},
			],
            formTreeData: {},
            single:true,
            idArr:[],
			permissionId:'',
			saveLoading:false,
			clickTreeData:[]
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
            this.permissionId = this.permissionDataItem.id;
			this.getListData();
		},
		getListData(){
			getPermissionsTreeAction(this);
        },
        handleBackList(){
            this.$emit('handlerBackList');
        },
		handleSubmit(){
            distributeResourceAction(this);
        },
        selectResource(data){
            if(data.checkBox){
				
                this.idArr.forEach((item, index) => {
                    if(item == data.id){
                        this.idArr.splice(index,1);
                    }
                });
                this.idArr.push(data.id);

            }else{
               this.idArr.forEach((item, index) => {
                    if(item == data.id){
                        this.idArr.splice(index,1);
                    }
                }); 
			}
			this.getClickTreeNode(data.id,this.treeData,data.checkBox);
		},
		// 获取点击树勾选节点的数据
		getClickTreeNode(id,data,flag){
			data.forEach((item) => {
				if(item.id == id){
					if (item.pid) {
						this.changeCheckbox([item],flag);
					} else {
						item.checkBox = flag;
					}
				}else{
					if(item.children.length){
						this.getClickTreeNode(id,item.children,flag);
					}
				}
			});
		},
		/**
		* 函数功能简述 改变勾选节点的checkbox和下面子节点的checkout，并且跟新id数组
		*@param    {array}   data   勾選節點的數據 
		*@param    {array}   data   勾選節點的數據 
		*/
		changeCheckbox(data,flag){
			data.forEach((item) => {
				item.checkBox = flag;
				if(item.checkBox){
					this.idArr.forEach((value, index) => {
						if(value == item.id){
							this.idArr.splice(index,1);
						}
					});
					this.idArr.push(item.id);
				}else{
					this.idArr.forEach((value, index) => {
						if(value == item.id){
							this.idArr.splice(index,1);
						}
					}); 
				}
				if(item.children.length){
					this.changeCheckbox(item.children,flag);
				}
			});
		}
	},
	components: {
		
	},
};
</script>

<style lang='less' scoped>
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
    .resource-button{
        margin-top:25px;
	}
</style>