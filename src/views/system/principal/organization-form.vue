<template>
    <section class="page">
		<Modal v-model="formModel" width="510">
	        <p slot="header" style="color:#2db7f5;text-align:left">

	            <span v-if="!isEdit">新增组织信息</span>
                <span v-if="isEdit">编辑组织信息</span>
	        </p>
			<Form class='form-wrap' ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="130">
                <div >
                    <FormItem label="上级组织" prop="pid" v-if="formValidate.pid!==null">
                        <Select class="disabledEl" :disabled="isEdit" v-model="formValidate.pid" @on-change='selectOrganazation'>
                            <Option v-for="item in organizations" :value="item.id" :key="item.id">{{ item.organizationName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="统一社会信用代码" prop="socialUnityCd">
                        <Input  v-model="formValidate.socialUnityCd" :readonly="socialUnityCdReadonly" placeholder="请输入统一社会信用代码"></Input>
                    </FormItem>
                    <FormItem label="组织名称" prop="organizationName" >
                        <Input v-model="formValidate.organizationName" :maxlength=30 placeholder="请输入组织名称"></Input>
                    </FormItem>
                    <FormItem label="组织类型" prop="organizationType">
                        <!-- <Select v-model="formValidate.organizationType">
                            <Option v-for="(item,index) in organizationTypeSelect" :value="item.code" :key="index">{{ item.value }}</Option>
                        </Select> -->
                        <Input value="组织" readonly></Input>
                    </FormItem>
                    <FormItem label="说明" prop="organizationDescription">
                            <Input v-model="formValidate.organizationDescription" placeholder="请输入说明"></Input>
                    </FormItem>

                    <Row>
                            <FormItem label="Logo" prop="image"  enctype="multipart/form-data">
                                <VueImgInputer :imgSrc='imageUrl' :maxSize='700' accept="image/*" v-model="formValidate.image" theme="light" ></VueImgInputer>
                            </FormItem>
                            <!-- <FormItem label="设备图片" prop="image" v-if="!isEdit" enctype="multipart/form-data">
                            <div @click='displayImgStatus=true'>
                                <VueImgInputer :readonly ='true' accept="image/*" :imgSrc='imageUrl' :maxSize='700' v-model="formValidate.image" theme="light" ></VueImgInputer>
                            </div>
                            </FormItem> -->
                            
                    </Row>
                </div>
            </Form>
            <Spin :fix='true' v-show='isLoading'>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
	        <div slot="footer">
	        	<Button 
	            	type="info"
	            	size="large" 
	            	:loading="saveLoading" 
	            	@click="handelSave('formValidate')">
	            	保存
	            </Button>
				<Button 
	            	size="large" 
	            	@click="handleCancle">
	            	取消
	            </Button>
	        </div>
    	</Modal>
        
        
    </section>
</template>

<script type="text/ecmascript-6">
import { getOrganizations, addOrganization, updateOrganization, getOrganizationById } from '@/api/organization';
import VueImgInputer from 'vue-img-inputer';
import { upload } from '@/api/upload'
import lookUpdata from '@/libs/lookup/lookupInfo.js';
import {transformData} from '@/libs/utils/lookupUtils.js';

const organizationTypeSelect = [
        {
            code: 'ORG',
            value: '组织'
        },
        // {
        //     code: 'OFFICE',
        //     value: '办事处'
        // },
        // {
        //     code: 'DEPT',
        //     value: '部门'
        // }
    ]

/**
* 函数功能简述 获取组织信息列表
*@param    {object}  self     vue this 
*/
const getOrganizationsAction = (self) => {
    return new Promise((resolve, reject) => {
        getOrganizations({}).then(response => {
            if(response.code == 200){
                self.organizations = response.content;
            }
            resolve();
        }).catch(error => {
            reject(error)
        })
    })
};
/**
* 函数功能简述 新增组织请求
*@param    {object}  self    vue this 
*/
const addOrganizationAction = (self) => {
    self.saveLoading = true;
    return new Promise((resolve, reject) => {
        addOrganization(self.formValidate).then(response => {
            if(response.code == 201){
                self.$Message.success("保存成功");
                self.formModel= false;
                self.$emit('handleRefresh');
            }else{
                self.$Message.error("保存失败");
            }
            self.saveLoading = false;
            resolve();
        }).catch(error => {
            self.$Message.error("保存失败");
            self.saveLoading = false;
            reject(error);
        })
    })
};

const updateOrganizationAction = (self) => {
    self.saveLoading = true;
    return new Promise((resolve, reject) => {
        updateOrganization(self.formValidate.id, self.formValidate).then(response => {
            if(response.code == 201){
                self.$Message.success("保存成功");
                self.formModel= false;
                self.$emit('handleRefresh');
            }else{
                self.$Message.error("保存失败");
            }
            self.saveLoading = false;
            resolve();
        }).catch(error => {
            self.$Message.error("保存失败");
            self.saveLoading = false;
            reject(error);
        })
    })
};

// 查询组织
const getOrganizationByIdAction = async (self, id) => {
    self.isLoading = true;
    return new Promise((resolve, reject) => {
        getOrganizationById(id).then(response => {
            if(response.code == 200){
                
            }else{
                self.$Message.error("查询上级组织失败");
            }
            self.isLoading = false;
            resolve(response.content);
        }).catch(error => {
            self.$Message.error("查询上级组织失败");
            self.isLoading = false;
            reject(error);
        })
    })
}

const uploadImgAction = (self) => {
    return new Promise((resolve, reject) => {
        upload(self.formValidate.image).then(response => {
           if(response.code == 200){
                self.formValidate.organizationLogo = response.content;
            }else{
                self.$Message.error("图片保存失败");
            }
            resolve();
            }).catch(error => {
                self.$Message.error("图片保存失败");
                reject(error);
            })
        });
};

export default {
    components: {
        VueImgInputer
    },

    props: {
        formModelStatus: {
            type: Boolean,
            default: false
        },
        organizationData:{
            type:Object,
            default:function(){
                return {}
            }
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },

    data() {
        const self = this;
        return {
            isLoading: false,
            socialUnityCdReadonly: true,
            displayImgStatus: false,
            organizationTypeSelect: organizationTypeSelect,
            formModel: self.formModelStatus,
            saveLoading:false,
            formValidate:{
                pid:'',
                organizationName:'',
                organizationDescription:'',
                socialUnityCd:'',
                image:{},
                organizationLogo: '',//图片logo
                organizationType: 'ORG',
            },
            imageUrl: '',
            organizations:[],
            ruleValidate:{
                organizationName: [
                    { required: true, message: '请输入组织名称', trigger: 'change' }
                ],
                pid: [
                    { required: true, message: '请输入上级组织', trigger: 'change' }
                ],
                socialUnityCd:[
                    { required: true, message: '请输入统一社会信用代码', trigger: 'change' }
                ],
                organizationType: [
                    { required: true, message: '请输入组织类型', trigger: 'change' }
                ],
                
            }
        }

    },

    watch: {
        formModelStatus(val) {
                this.formModel = val;
                if(val){
                    this.$refs['formValidate'].resetFields();
                }
			},
        formModel(val){
            //组件内对formModel变更后向外部发送事件通知
            this.$emit('on-change', val);
        },
    },

    methods: {
        init(){
            getOrganizationsAction(this);
        },
        handleCancle(){
            this.formModel = false;
        },
        handelSave(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.formValidate.image) {
                        if (typeof this.formValidate.image == 'object'  && this.formValidate.image.name) {
                            uploadImgAction(this).then(response => {
                                if (this.isEdit) {
                                    updateOrganizationAction(this);
                                } else {
                                    addOrganizationAction(this);
                                }
                                
                            });
                        } else if (typeof this.formValidate.image == 'string') {
                            if (this.isEdit) {
                                    updateOrganizationAction(this);
                                } else {
                                    addOrganizationAction(this);
                                }
                        } else {
                            this.$Message.error('图片不能为空');
                        }
                        
                    } else {
                        this.$Message.error('图片不能为空');
                    }
                }
            })
        },
        async selectOrganazation(val){
            if (!this.isEdit) {
                let organ = await getOrganizationByIdAction(this, val);
                if (organ && organ.pid !== null) {
                    this.formValidate.socialUnityCd = organ.socialUnityCd;
                }
            }
        }
    },

    mounted() {
        this.init();
        if (this.isEdit) {
            this.formValidate = this.organizationData;
            this.formValidate.image = this.organizationData.organizationLogo;
            this.imageUrl = this.organizationData.organizationLogo;
        } else {
            //新增
            this.formValidate.pid = this.organizationData.id;
            this.socialUnityCdReadonly = this.organizationData.pid === null ? false : true;
        } 
    },

}
</script>

<style lang='less' scoped>
 
</style>
