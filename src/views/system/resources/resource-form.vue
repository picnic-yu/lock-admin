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
                        <FormItem label="资源名称" prop="name">
                            <Input :maxlength=20 :readonly="isEdit" v-model="formValidate.name" placeholder="请输入资源名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="10" offset="1">
                        <FormItem label="标题" prop="title">
                            <Input :maxlength=30 v-model="formValidate.title" placeholder="请输入资源编码"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                     <Col span="10" offset="1">
                        <FormItem label="资源类型" prop="resourceType">
                            <RadioGroup v-model="formValidate.resourceType">
								<Radio 
									v-for="item in resourceTypes" 
									:key='item.name' 
									:label="item.status">
									{{item.name}}
								</Radio>
							</RadioGroup>
                        </FormItem>
                    </Col>
                   
                    <Col span="10" offset="1">
                        <FormItem label="资源地址" prop="path">
                            <Input :maxlength=80 v-model="formValidate.path" placeholder="请输入资源地址"></Input>
                        </FormItem>
                    </Col>
                </Row>
				
				
                <Row>
                    <Col span="10" offset="1">
                        <FormItem label="资源图标" prop="icon">
                            <Input :maxlength=30 v-model="formValidate.icon" placeholder="请输入资源图标"></Input>
                        </FormItem>
                    </Col>
					<Col span="10" offset="1">
						<FormItem label="系统平台" prop="resourcePlatform">
							<Select v-model="formValidate.resourcePlatform"  placeholder="请输入系统平台">
								<Option v-for="item in resourcePlatformList" :value="item.code" :key="item.value">
									{{ item.value }}
								</Option>
							</Select>
						</FormItem>
					</Col>
                    
                </Row>
                <Row>
					<Col span="10" offset="1" v-if='formValidate.resourcePlatform == "APP"'>
                        <FormItem label="url" prop="url">
                            <Input :maxlength=80 v-model="formValidate.url" placeholder="请输入url"></Input>
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
                    <Col span="10" offset="1">
                        <FormItem label="资源描述" prop="description">
                            <Input :maxlength=60 v-model="formValidate.description" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入资源描述" > </Input>
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
    
    import { addResourceTree, updataResource } from '@/api/resourceInfo';
	// import { lookUpdata } from '@/libs/lookup/lookup';
    const addResourceTreeAction = (self) => {
        self.isLoading = true;
        return new Promise((resolve, reject) => {
            addResourceTree(self.formValidate).then(response => {
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
    const updataResourceAction = (self) => {
        self.isLoading = true;
        return new Promise((resolve, reject) => {
            updataResource(self.formValidate).then(response => {
                if(response.code == 201){
                   self.$Message.success('保存成功');
                   self.$emit('handlerBackList',true);
                }else{
                    self.$Message.error('保存失败');
                }
                self.saveLoading = false;
                self.isLoading = false;
                resolve();
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
					name:'',//资源名称
					title: '',//标题
					path: '',//资源地址
					description: '',//资源描述
					status: 1,//是否启用
					icon: '',//资源图标
					resourceType: 0,//资源类型
					resourcePlatform:'',
					url:''//app url
				},
				roleNameError:false,//角色名称错误语句显示
				isBack:false,
				statusData: statusArr,
                resourceTypes: sourceType,
                ruleValidate: {
					name: [
						{ required: true, message: '请输入资源名称', trigger: 'change' }
					],
					resourcePlatform: [
						{ required: true, message: '请选择系统平台', trigger: 'change' }
					]
				},
				resourcePlatformList:[
					{
					'code': 'SYS',
					'value': '系统'
					},
					{
					'code': 'APP',
					'value': 'APP'
					}
				],
				isLoading:false,
				saveLoading: false
			}

		},
		mounted() {
			this.init();
			
		},
		watch: {
			
		},
		methods: {
			init() {
				console.log(this.isEdit)
				if(this.isEdit) {
					Object.assign(this.formValidate, this.formTreeData);
					this.formValidate.resourcePlatform = this.formTreeData.resourcePlatform;
					console.log(this.formValidate)
				}else{
                    this.formValidate.pid = this.formTreeData.id;
                }
                
                
            },
            handleSubmit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
						this.saveLoading = true;
                        if(!this.isEdit){
                            addResourceTreeAction(this);
                        }else{
                            updataResourceAction(this);
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