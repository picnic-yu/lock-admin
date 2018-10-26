<template>
	<section>
        <section class="portlet-title" >
            <Icon type="person-stalker"></Icon>
            <span class='title_text' v-if='!isEdit'>新增资源信息</span>
            <span class='title_text' v-if='isEdit'>编辑资源信息</span>
        </section>
        <section>
		<Form ref="formValidate" class= 'formvalidate-wrap' :model="formValidate" :rules="ruleValidate" :label-width="140">
			<Row>
				<Col span="10" offset="1">
					<FormItem label="角色名称" prop="roleName">
						<Input  :readonly="isEdit" :maxlength=40 v-model="formValidate.roleName" placeholder="请输入角色名称"></Input>
					</FormItem>
				</Col>
				<Col span="10" offset="1">
					<FormItem label="是否启用" prop="status" >
						<RadioGroup v-model="formValidate.status">
							<Radio 
								v-for="item in statusData" 
								:key='item.name' 
								:label="item.status">
								{{item.name}}
							</Radio>
						</RadioGroup>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="10" offset="1">
					<FormItem label="角色描述" prop="roleDescription">
						<Input v-model="formValidate.roleDescription" :maxlength=50 type="textarea" :autosize="{minRows: 2,maxRows: 3}" placeholder="请输入角色描述" > </Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="10" offset="1">
					<FormItem label="勾选权限">
						<CheckboxGroup v-model="permissionArr">
							<Checkbox v-for="item in permissionLookup" 
								:key='item.code' 
								:label="item.code">
								{{item.value}}
							</Checkbox>
							
						</CheckboxGroup>
					</FormItem>
				</Col>
			</Row>
			<div class="button-gropEl">
				<ButtonGroup>
					<Button type="primary" @click="handleSubmit('formValidate')" :loading='saveLoading'>保存</Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button @click='handleClickback'>返回</Button>
				</ButtonGroup>
			</div>
        </Form>
		
        </section>
        <Spin :fix='true' v-show='isLoading'>
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </section>
</template>

<script>
    import lookUpdata  from '@/libs/lookup/lookupInfo';
    import { addRole, updataRole  } from '@/api/system/roleInfo';
    const addRoleAction = (self) => {
        self.isLoading = true;
        return new Promise((resolve, reject) => {
            addRole(self.formValidate).then(response => {
                if(response.code == 201){
                   self.$Message.success('保存成功');
                   self.$emit('handlerBackList',true);
                }else{
                    self.$Message.error('保存失败');
                }
                resolve();
                self.isLoading = false;
                self.saveLoading = false;
            }).catch(error => {
				reject(error);
				self.saveLoading = false;
                self.isLoading = false;
                self.$Message.error('保存失败');
            })
        })
    };
    const updataRoleAction = (self) => {
        self.isLoading = true;
        return new Promise((resolve, reject) => {
            updataRole(self.formValidate.id,self.formValidate).then(response => {
                if(response.code == 201){
                   self.$Message.success('保存成功');
                   self.$emit('handlerBackList',true);
                }else{
                    self.$Message.error('保存失败');
                }
                resolve();
                self.isLoading = false;
                self.saveLoading = false;
            }).catch(error => {
				reject(error);
				self.saveLoading = false;
                self.isLoading = false;
                self.$Message.error('保存失败');
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
    let sourceType = [
		{
			status: 1,
			name: '操作项'
		},
		{
			status: 0,
			name: '菜单项'
		}
	];
	export default {
		props: {
			isEdit: {
				type: Boolean,
				default: false

			},
			formTreeData: {
				type: Object,
				default: function() {
					return {};
				}
			}
		},
		data() {
			return {
				formValidate: {
					pid:'',//父节点ID
					roleName:'',//角色名称
					roleDescription: '',//角色描述
					status: 1//是否启用
				},
				isBack:false,
				statusData: statusArr,
                ruleValidate: {
					roleName: [
						{ required: true, message: '请输入角色名称', trigger: 'change' }
					],
					roleDescription: [
						{ required: true, message: '请输入角色描述', trigger: 'change' }
					]					
                },
				isLoading:false,
				saveLoading: false,
				permissionArr:[],
				permissionLookup:lookUpdata.permissionLookup
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
					this.formValidate = this.formTreeData;
					this.permissionArr = this.formValidate.permission;
				}else{
                    this.formValidate.pid = this.formTreeData.id;
                }
                
                
            },
            handleSubmit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
						this.formValidate.permission = this.permissionArr.join(',');
						
						this.saveLoading = true;
                        if(!this.isEdit){
                            addRoleAction(this);
                        }else{
                            updataRoleAction(this);
                        }
                    } 
                })
            },
            handleClickback(){
                this.$emit('handlerBackList');
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