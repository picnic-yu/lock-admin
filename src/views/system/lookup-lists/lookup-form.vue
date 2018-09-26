<template>
    <div class="portlet-body">
        <Form ref="formValidate" class="formvalidate-wrap" :model="formValidate" :rules="ruleValidate" :label-width="140">
            <Row>
                <Col span="10" offset="1">
                    <FormItem label="字典编码" prop="lookupName">
                        <Input v-model="formValidate.lookupName" placeholder="请输入字典编码"></Input>
                    </FormItem>
                </Col>

                <Col span="10" offset="1">
                    <FormItem label="字典名称" prop="lookupDescription">
                        <Input v-model="formValidate.lookupDescription" placeholder="请输入字典名称"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="22" offset="1">  
                    <FormItem label="字典项" >
                        <div class="addbtn-wrap">
                            <Button type="primary"
                                @click="addData('formValidate')"
                                icon="pricetag"
                                >新增</Button>
                        </div>

                        <!-- 数据字典列表 -->
                        <div class="list" v-show='showList'>
                            <div class='table-wrap'>
                                <!-- <div class="tb-header"><Icon type="pricetags"></Icon>字典项列表</div> -->
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
                        </div>
                    </FormItem>
                </Col>
            </Row>
        
            <div class="button-gropEl">
                <Button type="primary" @click="handleSubmit('formValidate')" :loading='saveLoading'>保存</Button>
                <Button type="primary" @click="handleSaveAndBack('formValidate')" :loading='saveAndBackLoading'>保存并返回</Button>
                <Button @click='handleClickback'>返回</Button>
            </div>
        </Form>
        <Spin :fix='true' v-show='isLoading'>
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>


		<Modal v-model="deleteModelStatus" width="310" :styles="{top: '250px'}">
	        <p slot="header" style="color:#2db7f5;text-align:left">
	            <span>提示</span>
	        </p>
	        <div>
				<h3>确定删除吗?</h3>
			</div>
	        <div slot="footer">
	            
	            <Button 
	            	type="info"
	            	size="large" 
	            	@click="sureDel">
	            	确定
	            </Button> 
				<Button 
	            	size="large" 
	            	@click="cancelDel">
	            	取消
	            </Button>
	        </div>
		</Modal>

		<Modal v-model="showAddOrEdit" width="510">
	        <p slot="header" style="color:#2db7f5;text-align:left">
	            <span v-if='!isEdit'>新增字典项</span>
	            <span v-if='isEdit'>编辑字典项</span>
	        </p>
			<Form class='form-wrap' ref="formValuesValidate" :model="formValuesValidate" :rules="ruleValuesValidate" :label-width="100">
                <div >
                    <Row>
                        <Col span="22">
                            <FormItem label="字典项编码" prop="code">
                                <Input v-model="formValuesValidate.code" :maxlength=10 placeholder="请输入字典项编码"></Input>
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span="22">
                            <FormItem label="字典项值" prop="displayValue">
                                <Input v-model="formValuesValidate.displayValue" :maxlength=10 placeholder="请输入字典项值"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="22">
                            <FormItem label="字典项类型" prop="lookupType">
                                <Input v-model="formValuesValidate.lookupType" :maxlength=10 placeholder="请输入字典项类型"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="22">
                            <FormItem label="排序" prop="orderSeq">
                                <Input v-model="formValuesValidate.orderSeq" :maxlength=10 placeholder="请输入字典项排序"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
		    </Form>
	        <div slot="footer">
	        	<Button 
	            	type="info"
	            	size="large" 
	            	:loading="valuesSaveLoading" 
	            	@click="handleSave(isEdit)">
	            	保存
	            </Button>
	        	<Button v-if='!isEdit'
	            	type="info"
	            	size="large" 
	            	:loading="saveAndAddLoading" 
	            	@click="saveAndAdd(isEdit)">
	            	保存并新增
	            </Button>
	            
				<Button 
	            	size="large" 
	            	@click="handleCancle">
	            	返回
	            </Button>
	        </div>
    	</Modal>

    </div>
</template>

<script>
    import { addLookupValues, updateLookupValues, deleteLookupValues } from "@/api/lookupListsInfo/lookup-values"
    import { queryValuesById, addLookupLists, updateLookupLists } from '@/api/lookupListsInfo/lookup-lists'

    const queryValuseAction = (self) => { //根据父Id查询数据项列表数据
        return new Promise((resolve, reject) => {
            queryValuesById(self.editData.id).then(response => {
                if(response.code == 200) {
                    self.listData = response.content;
                    if(self.listData && self.listData.length > 0){
                        self.listData.forEach(element => {
                        element.lookupListId = self.editData.id;
                        });
                    }
                }
            })
        } );
    }

    const addLookupAction = (self) => { //添加数据字典
        return new Promise((resolve, reject) => {
            addLookupLists(self.formValidate).then(response => {
                let successFlag = true;
                if (response.code == 201) {
                    // self.$emit("handleBack",1);
                    if (self.isShowMessage) {
                        self.$Message.success("保存成功");
                    }
                    self.$emit("handleBack", 1);
                } else {
                    self.$Message.error("保存失败");
                }
                self.saveLoading = false;
                self.saveAndBackLoading = false;
                resolve(successFlag);
            })
            .catch(error => {
                self.saveLoading = false;
                self.saveAndBackLoading = false;
                self.$Message.error("保存失败");
                reject(error);
            });
        });
    }
    const updateLookupAction = (self) => { //根据数据字典
        return new Promise((resolve, reject) => {
            updateLookupLists(self.editData.id, self.formValidate).then(response => {
                let successFlag = true;
                if (response.code == 201) {
                    // self.$emit("handleBack",1);
                    if (self.isShowMessage) {
                        self.$Message.success("保存成功");
                    }
                    
                } else {
                    self.$Message.error("保存失败");
                    successFlag = false;
                }
                self.saveLoading = false;
                self.saveAndBackLoading = false;
                resolve(successFlag);
            }).catch(error => {
                self.saveLoading = false;
                self.saveAndBackLoading = false;
                self.$Message.error("保存失败");
                reject(error);
            });
        });
    };
    
    const deleteValuesAction =(self) => { //删除字典项
		let index = self.delIndex;
		return new Promise((resolve, reject) => {
				deleteLookupValues(self.listData[index].id).then(response => {
				if (response.code == 204 ) {
					self.isLoading = false;
					self.deleteModelStatus = false;
					self.$Message.success('删除成功');
					self.getListData();
				} else {
					self.$Message.error('删除失败');
				}
				resolve();
			}).catch(error => {
                self.$Message.error("保存失败");
				reject(error);
			})
		})
    };
    

    const updateValuesAction = (self) => { //更新字典项
        self.formValuesValidate.lookupListId = self.editData.id;
        return new Promise((resolve, reject) => {
            self.formValuesValidate.id = self.editId;
            updateLookupValues(self.editId, self.formValuesValidate).then(response => {
                if (response.code == 201) {
                    // self.$emit("handleBack",1);
                    self.$Message.success("保存成功");
                } else {
                    self.$Message.error("保存失败");
                }
                self.saveLoading = false;
                self.valuesSaveLoading = false;
                self.saveAndAddLoading = false;
                resolve();
            }).catch(error => {
                self.saveLoading = false;
                self.valuesSaveLoading = false;
                self.saveAndAddLoading = false;
                reject(error);
            })
        });
    }

    const addValuesAction = (self) => { //添加字典项
        self.formValuesValidate.lookupListId = self.editData.id;
        return new Promise((resolve, reject) => {
            addLookupValues(self.formValuesValidate).then(response => {
                let successFlag = true;
                if (response.code == 201) {
                    // self.$emit("handleBack",1);
                    self.$Message.success("保存成功");
                } else {
                    self.$Message.error("保存失败");
                    successFlag = false;
                }
                self.saveLoading = false;
                self.valuesSaveLoading = false;
                self.saveAndAddLoading = false;
                resolve(successFlag);
            })
            .catch(error => {
                self.saveLoading = false;
                self.valuesSaveLoading = false;
                self.saveAndAddLoading = false;
                self.$Message.error("保存失败");
                reject(error);
            });
        });
    }
    export default {
        props: {
            isEdits: {
                type: Boolean,
                default: false
            },
            editData: {
                type: Object,
                default: function() {
                    return {};
                }
            },
        }, 
        data() {
            return {
                formValidate: {
                    lookupName:  '',//字典编码
                    lookupDescription: '' //字典名称
                },
                ruleValidate: {
                    lookupName: [
                        {
                            required: true,
                            message: '请输入字典编码',
                            trigger: 'change'
                        }
                    ],
                    lookupDescription: false
                },
                formValuesValidate: {
                    code: '', //字典项编码
                    displayValue: '', //字典项值
                    lookupType : '', //字典项类型
                    orderSeq : '', //排序
                    lookupListId: '' //主表id
                },
                ruleValuesValidate: {
                    code: [
                        {
                            required: true,
                            message: '请输入字典项编码',
                            trigger: 'change'
                        }
                    ],
                    displayValue: [
                        {
                            required: true,
                            message: '请输入字典项值',
                            trigger: 'change'
                        }
                    ]

                },
                columns1: [ //列
                    {
						title: '序号',
                        type: 'index',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '字典项编码',
                        key: 'code',
                        align: 'center'
                    },
                    {
                        title: '字典项值',
                        key: 'displayValue',
                        align: 'center'
                    },
                    {
                        title: '字典项值类型',
                        key: 'lookupType',
                        align: 'center'
                    },
                    {
                        title: '字典项排序',
                        key: 'orderSeq',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editDetail(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                listData: [],
                showList: true, //显示列表
                showAddOrEdit: false, //点击添加切换
                showLog: false, //点击预览
                isLoading: false, //是否加载动画
                titleText: '任务列表', //标题名称
                iconType: 'person', 
                placeholderValue: '请输入字典编码',
                removeInputFlag: 0,
                data: {}, //选中所在行数据
                isSelect: false, //是否选中
                selectIndex: '', //选中索引 
                queryParam: {   //分页查询参数                 
                    "pageSize": 10,
                    "keyWords": "",
                    "pageNumber": 0,
                },
                saveLoading:false,
                saveAndBackLoading: false,
                saveAndAddLoading: false, //
                isEdit: false, //是否编辑
                deleteModelStatus: false, //是否显示新增数据项的对话框
                delIndex: '', //当前删除的数据所在的数组索引
                editId: '', //当前编辑数据的id
                valuesSaveLoading:false, //保存按钮loading
                isShowMessage: true //是否现实弹窗message消息
            }
        },
        methods: {
            init() { //初始化
                if(this.isEdits) {
                    Object.assign(this.formValidate, this.editData);
                    // this.getListData();
                }
            },
            handleSubmit(name) { //保存
                this.isShowMessage = true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.saveLoading = true;
                        if (this.isEdits) {
                            this.formValidate.id = this.editData.id;
                            updateLookupAction(this).then((successFlag) => {
                                if(successFlag){
                                    this.$emit("handleBack",1);
                                }
                            });
                        } else {
                            addLookupAction(this).then((successFlag) => {
                                if(successFlag){
                                    this.$emit("handleBack",1);
                                }
                            });
                        }
                    } 
                })
            },
            handleSaveAndBack(name) { //保存并返回
                this.isShowMessage = true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.saveAndBackLoading = true;
                        if (this.isEdits) {
                            this.formValidate.id = this.editData.id;
                            updateLookupAction(this).then((successFlag) => {
                                if(successFlag){
                                    this.$emit("handleBack",2);
                                }
                            });
                        } else {
                            addLookupAction(this).then((successFlag) => {
                                if(successFlag){
                                    this.$emit("handleBack",2);
                                }
                            });
                        }
                    } 
                })
            },
            handleClickback() { //返回
                this.$emit("handleBack",0);
            },
            getListData() {  //根据父id查字典项
                queryValuseAction(this);
            },
            selectItem(data, index) { //选中
                this.data = data;
                this.selectIndex = index;
                this.isSelect = true;
            },
            editDetail(index) { //编辑
                this.isEdit = true;
                this.showAddOrEdit = true;
                this.editId = this.listData[index].id;
                this.formValuesValidate = this.listData[index];
            },
            remove(index) { //删除
                this.delIndex = index;
				this.deleteModelStatus = true;
            },
            addData(name) { //添加
                this.isEdit = false; //是否编辑字典项
                this.isShowMessage = false;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.saveLoading = true;
                        if (this.isEdits) {
                            this.formValidate.id = this.editData.id;
                            updateLookupAction(this).then((successFlag) => {
                                if(successFlag){
                                    this.showAddOrEdit = true;
                                }
                            });
                        } else {
                            addLookupAction(this).then((successFlag) => {
                                if(successFlag){
                                    this.showAddOrEdit = true;
                                }
                            });
                        }
                    } 
                })
            },
            handleSave(isEdit) { //保存
                this.$refs['formValuesValidate'].validate((valid) => {
                    if (valid) {
                        this.valuesSaveLoading = true;
                        this.formValuesValidate.lookupListId = this.editData.id;
						if(isEdit){
                            this.formValuesValidate.id = this.editId;
							updateValuesAction(this).then((successFlag) => {
                                if (successFlag) {
                                    this.showAddOrEdit = false;
                                    this.getListData();
                                }
                            });
						}else{
							addValuesAction(this).then((successFlag) => {
                                if (successFlag) {
                                    this.showAddOrEdit = false;
                                    this.getListData();
                                }
                            });
						}
                    } 
                })
            },
            saveAndAdd(isEdit) { //保存并增加
                this.$refs['formValuesValidate'].validate((valid) => {
                    if (valid) {
                        // this.valuesSaveLoading = true;
                        this.saveAndAddLoading = true;
                        this.formValuesValidate.lookupListId = this.editData.id;
						if(isEdit){
                            this.formValuesValidate.id = this.editId;
							updateValuesAction(this).then((successFlag) => {
                                if (successFlag) {
                                    this.handleReset();
                                    this.getListData();
                                }
                            });
						}else{
							addValuesAction(this).then((successFlag) => {
                                if (successFlag) {
                                    this.handleReset();
                                    this.getListData();
                                }
                            });
						}
                    } 
                })
            },
            handleCancle() { //返回
                this.showAddOrEdit = false;
            },
            sureDel() { //确定删除
                this.isLoading = true;
                deleteValuesAction(this);
            },
            cancelDel() { //取消删除
                this.deleteModelStatus = false;
            },
            // 清空验证
			handleReset () {
                this.$refs['formValuesValidate'].resetFields();
            },
        },
        created() {

        },
        mounted() {
            this.init();
        },
        watch:{
            isEdits: { //监听是否父组件的传的isEdits是否改变
                immediate:true,
                handler(curVal, oldVal) {
                    if(this.isEdits){
                        this.getListData();
					}
                }
            }	
		}
    }
</script>
<style lang="less" scoped>
    @import "../../../styles/searchAndOperate.less";
    .list {
        margin-top: 15px;
        font-size: 15px;
        .tb-header {
            height: 36px;
            background-color:#e0dedb;
            line-height: 36px;
            padding-left: 18px;
        }
    }
    .ivu-icon {
        line-height: 36px;
    }
    .addbtn-wrap {
        .ivu-btn {
            padding: 2px 8px;
            span {
                margin-left: 0px !important;
            }
        }
    }
</style>

