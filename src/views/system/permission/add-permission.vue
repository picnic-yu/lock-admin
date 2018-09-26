<template>
	<div class="portlet-body">
		<Form ref="formValidate" class= 'formvalidate-wrap' :model="formValidate" :rules="ruleValidate" :label-width="140">
            <Row>
                <Col span="10" offset="1">
					<FormItem label="权限名称" prop="permissionName">
						<Input v-model="formValidate.permissionName" :maxlength=20 :readonly='previewStatus'
							placeholder="请输入权限名 " >
						</Input>
					</FormItem>
                </Col>
                <Col span="10" offset="1">
					<FormItem label="是否启用" prop="status">
						<RadioGroup v-model="formValidate.status"  :disabled='previewStatus'>
			                <Radio
								:disabled='previewStatus'
			                	v-for="item in statusData" 
			                	:key='item.status' 
			                	:label="item.status">
			                	{{item.name}}
			                </Radio>
			            </RadioGroup>	
					</FormItem>
                </Col>
            </Row>
			<Row>
                <Col span="10" offset="1">
					<FormItem label="权限描述" prop="permissionDescription">
						<Input 
							type='textarea'
							:readonly='previewStatus' 
							v-model="formValidate.permissionDescription" 
							:maxlength= 50
							:autosize="{minRows: 5,maxRows: 3}" 
							placeholder="请输入权限描述">
						</Input>
					</FormItem>
                </Col>
            </Row>
        
			<div class="button-gropEl">
				<ButtonGroup v-show='!previewStatus'>
					<Button type="primary" @click="handleSubmit('formValidate')" :loading='saveLoading'>保存</Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button @click='backToList'>返回</Button>
				</ButtonGroup>
			</div>
		</Form>
	</div>
</template>

<script>
	
	import { updataPermission, addPermission } from '@/api/system/permissionInfo';
	// 新增请求
	const addPermissionAction = (self) => {
		return new Promise((resolve, reject) => {
			addPermission(self.formValidate).then(response => {
				if(response.code == 201){
					self.$Message.success('保存成功');
					self.$emit('handlerBackList',true);
				}else{
					self.$Message.error('保存失败');
				}
				self.saveLoading = false;
				resolve();
			}).catch(error => {
				self.saveLoading = false;
				self.$Message.error('保存失败');
				reject(error);
			})
		})
	};
	// 更新请求
	const updataPermissionAction = (self) => {
		return new Promise((resolve, reject) => {
			updataPermission(self.formValidate.id,self.formValidate).then(response => {
				
				if(response.code == 201){
					self.$Message.success('保存成功');
					self.$emit('handlerBackList',true);
				}else{
					self.$Message.error('保存失败');
				}
				self.saveLoading = false;
				resolve()
			}).catch(error => {
				self.saveLoading = false;
				self.$Message.error('保存失败');
				reject(error);
			})
		})
	};
	let statusArr = [
		{
			status: 1,
			name: '是'
		},
		{
			status: 0,
			name: '否'
		}
	];
	export default {
		props: {
			isEdit: {
				type: Boolean,
				default: false
			},
			editData: {
				type: Object,
				default: function() {
					return {};
				}
			},
			previewStatus:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				formValidate: {
					permissionName:'',//权限名称
					permissionDescription:'',//权限描述
					status: 1,//权限状态
				},
				isBack:false,
				statusData: statusArr,
				ruleValidate: {
					permissionName: [
						{ required: true, message: '请输入权限名', trigger: 'change' }
					]
				},
				saveLoading:false
			}

		},
		mounted() {
            this.init();
		},
		watch: {
			
		},
		methods: {
			init() {
				if(this.isEdit) {
                    this.formValidate = this.editData;
				}
			},
			backToList(){
				this.$emit('handlerBackList');
			},
//			保存并且返回列表页面
			saveAndBack(){
				this.isBack = true;
				this.handleSubmit('formValidate');
			},
			
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
                    if (valid) {
						this.saveLoading = true;
                        //编辑
						if(this.isEdit){
							updataPermissionAction(this);
							
							
							
						}else{
						//新增	
							addPermissionAction(this);
							
							
						}
                    }
                })
				
				
			}
		}
	}
</script>

<style scoped lang='less'>
	@h: 32px;
	.portlet-body{
		
	}
	.row-wrap{
		/*margin: 5px 0;*/
	}
	.col-wrap {
		min-height: 56px;
		height: auto;
	}
	
	.dec-text {
		height: @h;
		line-height: @h;
		text-align: right;
		padding-right: 10px;
	}
	
	.error {
		display: inline-block;
		width: 100%;
		padding: 3px 5px;
		color: red;
	}
	
	.sybol {
		color: red;
	}
	
	.form-wrap {
		width: 100%;
		height: auto;
		background-color: #fff;
		padding: 20px 0;
	}
	.btn-wrap{
		margin: 20px 0;
	}
	.ivu-tabs-bar{
		margin-bottom:0px !important;
	}
	/*.portlet-body {
		background-color: #fff;
		padding: 10px;
		height: auto;
	}*/
</style>