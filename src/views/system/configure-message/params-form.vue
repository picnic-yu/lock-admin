<template>
    <section>
        <Modal v-model="showModal" width="510" @on-cancel="handleCancle">
	        <p slot="header" style="color:#2db7f5;text-align:left">
	            <span v-if='!isEdit'>新增参数信息</span>
	            <span v-if='isEdit'>编辑参数信息</span>
	        </p>
			<Form class='form-wrap' ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <div >
                    <Row>
                        <Col span="21">
                            <FormItem label="参数序号" prop="paramNumber">
                                <Input v-model="formValidate.paramNumber" :maxlength=10 placeholder="请输入字典项编码"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="21">
                            <FormItem label="参数名" prop="paramName">
                                <Input v-model="formValidate.paramName" :maxlength=10 placeholder="请输入字典项编码"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="21">
                            <FormItem label="参数值" prop="paramValue">
                                <Input v-model="formValidate.paramValue" :maxlength=10 placeholder="请输入字典项编码"></Input>
                            </FormItem>
                        </Col>
                    </Row>

                </div>
		    </Form>
	        <div slot="footer">
	        	<Button 
	            	type="info"
	            	size="large" 
	            	:loading="saveLoading" 
	            	@click="handleSave">
	            	保存
	            </Button>
				<Button 
	            	size="large" 
	            	@click="handleCancle">
	            	返回
	            </Button>
	        </div>
    	</Modal>
    </section>
</template>

<script>
    import { saveMessage, saveParams,updateParams } from '@/api/system/configure-message';
    // 更新参数
    const updateParamsAction = (self) => {
        return new Promise((resolve, reject) => {
            if (self.saveAndAdd) {
                self.saveAndAddLoading = true;
            } else {
                self.saveLoading = true;
            }
            updateParams(self.formValidate).then((res) => {
                self.saveLoading = false;
                self.saveAndAddLoading = false;
                if (res.code == 201) {
                    self.$Message.success('保存成功');
                    if (self.saveAndAdd) {
                        self.saveAndAdd = false;
                        self.$refs['formValidate'].resetFields();
                        self.$emit('handleBack', 1);
                    } else {
                        self.$emit('handleBack', 2);
                    }
                } else {
                    self.$Message.error('保存失败');
                }
                resolve();
            }).catch((err) => {
                self.saveAndAdd = fase;
                reject(err);
            })
        });
    }
    //保存参数
    const saveParamsAction = (self) => {
        return new Promise((resolve, reject) => {
            if (self.saveAndAdd) {
                self.saveAndAddLoading = true;
            } else {
                self.saveLoading = true;
            }
            saveParams(self.formValidate).then((res) => {
                self.saveLoading = false;
                self.saveAndAddLoading = false;
                if (res.code == 201) {
                    self.$Message.success('保存成功');
                    if (self.saveAndAdd) {
                        self.saveAndAdd = false;
                        self.$refs['formValidate'].resetFields();
                        self.$emit('handleBack', 1);
                    } else {
                        self.$emit('handleBack', 2);
                    }
                } else {
                    self.$Message.error('保存失败');
                }
                resolve();
            }).catch((err) => {
                self.saveAndAdd = fase;
                reject(err);
            })
        });
    }
    export default { 
        props: {
            isEdit: {
                type: Boolean,
                default: false
            },
            data: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        data() {
            return {
                showModal: true,
                formValidate: {
                    messagesId: '',
                    paramNumber: '',        //参数序号
                    paramName: '',          //参数名
                    paramValue: '',         //参数值
                },
                saveLoading: false,         //保存loading
                saveAndAddLoading: false,   //保存并新增loading
                saveAndAdd: false,           //是否返回      
                ruleValidate: {             //校验规则
                    paramNumber: [
                        { required: true, message: '请输入参数序号', trigger: 'change' }
                    ],
                    paramName: [
                        { required: true, message: '请输入参数名', trigger: 'change' }
                    ],
                    paramValue: [
                        { required: true, message: '请输入参数值', trigger: 'change' }
                    ],
                },       
            }
        },
        methods: {
            handleCancle() {
                this.$emit("handleBack", 0);
            },
            handleSave() {
                this.$refs["formValidate"].validate((valid) => {
                    if (valid) {
                        if(this.formValidate.id){
                            updateParamsAction(this);
                        }else{
                            saveParamsAction(this);
                        }
                        
                    } 
                })
            },
                // 清空表单
            handleReset (name) {
                this.$refs[name].resetFields();
            },
        },
        mounted() {
            this.showModal = true;
            this.handleReset("formValidate");
            this.formValidate  = this.data;
        }
    }
</script>

<style lang="less" scoped>

</style>
