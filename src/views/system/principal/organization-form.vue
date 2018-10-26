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
                    
                    <FormItem label="单位组别名" prop="organizationName" >
                        <Input v-model="formValidate.organizationName" :maxlength=30 placeholder="请输入单位组别名"></Input>
                    </FormItem>
                    <FormItem label="组管理员" prop="userName">
                            <Input v-model="formValidate.userName" placeholder="请输入组管理员"></Input>
                    </FormItem>
                    <FormItem label="管理员密码" prop="userPassword">
                            <Input v-model="formValidate.userPassword" placeholder="请输入管理员密码"></Input>
                    </FormItem>
                    <FormItem label="选择权限">
                        <Select 
                            multiple 
                            v-model="permissionArr"
                            @on-change='handleChangePermission' 
                            placeholder="可多选" >
                            <Option 
                                v-for="(item,index) in permissionList" 
                                :value="item.id" 
                                :key="item.id+'-'+ index">{{ item.permissionName }}</Option>
                        </Select>
                    </FormItem>
                   
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
import { getPermissionsList } from '@/api/system/permissionInfo';
import VueImgInputer from 'vue-img-inputer';
import { upload } from '@/api/upload'
import lookUpdata from '@/libs/lookup/lookupInfo.js';
import {transformData} from '@/libs/utils/lookupUtils.js';
/**
* 函数功能简述 获取组织信息列表
*@param    {object}  self     vue this 
*/
const getPermissionsListAction = (self) => {
    return new Promise((resolve, reject) => {
        getPermissionsList().then(response => {
            if(response.code == 200){
                self.permissionList = response.content;
            }
            resolve();
        }).catch(error => {
            reject(error)
        })
    })
};

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
            formModel: self.formModelStatus,
            saveLoading:false,
            formValidate:{
                pid:'',
                organizationName:'',
                organizationDescription:'',
                userName:'',
                userPassword:'',
                image:{},
                organizationLogo: '',//图片logo
            },
            permissionList:[],//权限列表
            permissionArr:[],
            organizations:[],
            ruleValidate:{
                organizationName: [
                    { required: true, message: '请输入单位组别名', trigger: 'change' }
                ],
                pid: [
                    { required: true, message: '请输入上级组织', trigger: 'change' }
                ],
                userPassword:[
                    { required: true, message: '请输入管理员密码', trigger: 'change' }
                ],
                userName:[
                    { required: true, message: '请输入组管理员', trigger: 'change' }
                ]
                
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
                    if (this.isEdit) {
                        updateOrganizationAction(this);
                    } else {
                        addOrganizationAction(this);
                    }
                }
            })
        },
        async selectOrganazation(val){
            if (!this.isEdit) {
                let organ = await getOrganizationByIdAction(this, val);
                
            }
        },
        handleChangePermission(val){
            console.log(val)
            this.formValidate.permissionIds = val.join(',');
        }
    },

    async mounted() {
        getPermissionsListAction(this);
        if(this.organizationData.id){
            
            let permissionArr = await getOrganizationByIdAction(this,this.organizationData.id);
            let arr = [];
            permissionArr.forEach((item) => {
                arr.push(item.id);
            });
            this.permissionArr = arr;
        }
       
        this.init();
        if (this.isEdit) {
            this.formValidate = this.organizationData;
            this.formValidate.image = this.organizationData.organizationLogo;
        } else {
            //新增
            this.formValidate.pid = this.organizationData.id;
        } 
    },

}
</script>

<style lang='less' scoped>
 
</style>
