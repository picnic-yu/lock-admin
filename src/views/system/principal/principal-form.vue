

<template>
    <div class="form-wrap">
        <Form ref="formItem" class= 'formvalidate-wrap' :rules="ruleValidate" :model="formItem" :label-width="140">
            
            <Row>
                <Col span="10" offset="1">
                    <FormItem label="登录名" prop="userName">
                        <Input :maxlength=20 v-model="formItem.userName">
                        </Input>
                    </FormItem>
                </Col>
                <Col span="10" offset="1">
                    <FormItem label="用户名" prop="personName">
                        <Input :maxlength=20 v-model="formItem.personName">
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="10" offset="1">
                    <FormItem label="工作单位" prop="companyName">
                        <Input :maxlength=20 v-model="formItem.companyName">
                        </Input>
                    </FormItem>
                </Col>
            
                <Col span="10" offset="1">
                    <FormItem label="所属组织" prop="principalOrganizationId">
                        <Select  v-model="formItem.principalOrganizationId">
                            <Option v-for="item in organizationData" :value="item.principalOrganizationId" :key="item.id">
                                {{ item.organizationName }}
                            </Option>
                        </Select>
                        
                    </FormItem>
                </Col>
            </Row>
            <Row>
                 <Col span="10" offset="1">
                    <FormItem label="手机号码" prop="mobileNumber">
                        <Input :maxlength=20 v-model="formItem.mobileNumber">
                        </Input>
                    </FormItem>
                </Col>
                <Col span="10" offset="1">
                    <FormItem label="电子邮箱" prop="emailAddress">
                        <Input v-model="formItem.emailAddress" :maxlength=40>
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                 <Col span="10" offset="1">
                    <FormItem label="用户角色" prop="roleId">
                        <Select  v-model="formItem.roleId" v-if="!formItem.role.isAdmin">
                            <Option v-for="item in roleList" :value="item.id" :key="item.id">
                                {{ item.roleName }}
                            </Option>
                        </Select>
                        <Input readonly :value="formItem.role.roleName" v-if="formItem.role.isAdmin">
                        </Input>
                    </FormItem>
                </Col>
                <Col span="10" offset="1">
					<FormItem label="是否启用" prop="enabled">
						<RadioGroup v-model="formItem.enabled">
                            <Radio 
                                v-for="item in enabledList" 
                                :key='item.code' 
                                :label="item.code">
                                {{item.label}}
                            </Radio>
                        </RadioGroup>
					</FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="10" offset="1" v-if="!isEdit"> 
                    <FormItem label="用户密码" prop="userPassword">
                        <Input type="password" :maxlength=30 v-model="formItem.userPassword" >
                        </Input>
                    </FormItem>
                </Col>
                <Col span="10" offset="1" v-if="!isEdit">
                    <FormItem label="确认密码" prop="confirmPassword">
                        <Input type="password" :maxlength=30 v-model="formItem.confirmPassword" :readonly="!passwordChanged">
                        </Input>
                    </FormItem>
                </Col>
            
            </Row>
            <Row>
                <Col span="10" offset="1" v-if="isEdit">
                    <FormItem label="用户密码">
                        <div>
                            <Button type="text" @click="editPasswordModal = true">修改密码</Button>
                        </div>
                    </FormItem> 
                </Col>
            </Row>
            
            
            <div class="button-gropEl">
                <Button type="primary" :loading='saveLoading' @click='handleSave()'>
                    保存
                </Button>
                </Button>   
                <Button type="ghost" @click='handleBack' >返回
                </Button>
            </div>
        </Form>
        
        <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
            <h3 slot="header" style="color:#1c2438">修改密码</h3>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                <Row>
                    <Col span="21" offset="1">
                        <FormItem label="新密码" prop="newPass">
                            <Input v-model="editPasswordForm.newPass" type="password" placeholder="请输入新密码" ></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="21" offset="1">
                        <FormItem label="确认新密码" prop="rePass">
                            <Input v-model="editPasswordForm.rePass" type="password" placeholder="请再次输入新密码" ></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
                <Button  @click="cancelEditPass">取消</Button>
            </div>
        </Modal>

        <Spin :fix='true' v-show='isLoading'>
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
</template>
<script>
    // import {  saveAndConfirmTrial } from '@/api/order-manage/trial-order';
    import util from '@/libs/utils/util';
    import { addUserByOrganizationId, updateUserByOrganizationId, getRoleListOfOrganization, checkUserName } from '@/api/principals';
    
    /**
    * 函数功能简述 保存并确认请求接口
    *@param    {object}  self     vue this 
    */
    const saveAndConfirmTrialAction = (self) => {
        // return new Promise((resolve, reject) => {
        //     saveAndConfirmTrial(self.formItem).then(response => {
        //         if (response.code == 200) {
        //             self.$Message.success('保存成功');
        //             self.$emit('handleBackList','2');
        //         }else{
        //             self.$Message.error('保存失败');
        //         }
        //         resolve();
        //     }).catch(error => {
        //         self.$Message.error('保存失败');
        //         reject(error);
        //     })
        // })
    }
    /**
    * 函数功能简述 新增试用单接口请求
    *@param    {object}  self     vue this 
    */
    let addUserByOrganizationIdAction = (self) => {
        self.saveLoading = true;
        return new Promise((resolve, reject) => {
            addUserByOrganizationId(self.formItem,self.formItem.organizationId).then(response => {
                if (response.code == 201) {
                    self.showAddOrEdit = false;
                    self.formItem.id = response.content.id;
                    self.$Message.success('保存成功');
                    self.$emit('handleBackList','1');                    
                }else if(response.code == 101){
                    self.$Message.error('该手机号码已经被注册');
                } else {
                    self.$Message.error('保存失败');
                }
                self.saveLoading = false;
                resolve()
            }).catch(error => {
                reject(error);
                self.$Message.error('保存失败');
                self.saveLoading = false;
            })
        })
    };
    let updateAction = (self) => {
        self.saveLoading = true;
        return new Promise((resolve, reject) => {
            updateUserByOrganizationId( self.formItem,self.formItem.organizationId,self.formItem.id,).then(response => {
                if (response.code == 201) {
                    self.showAddOrEdit = false;
                    self.$Message.success('保存成功');
                    self.$emit('handleBackList','1');
                    self.isSelect = false;
                }else if(response.code == 101){
                    self.$Message.error('该手机号码已经被注册');
                } else {
                    self.$Message.error('保存失败');
                }
                self.saveLoading = false;
                resolve();
            }).catch(error => {
                reject(error);
                self.saveLoading = false;
                self.$Message.error('保存失败');
            })
        })
    };

    const getRoleList = (self) => {
        getRoleListOfOrganization().then(res => {
            if (res.code == 200) {
                self.roleList = res.content
                if (self.isEdit) {
                    self.formItem.roleId = self.formItem.role.id;
                    self.formItem.roleName = self.formItem.role.roleName;
                }
            }
        })
    }
    export default {
        props: {
            isEdit: {
                type: Boolean,
                default: false

            },
            editData: {
                type: Object,
                default: function () {
                    return {};
                }
            },
            organizationData:{
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data() {
            const checkConfirm = (rule, value, callback) => {
                if (value === this.editPasswordForm.newPass || value == this.formItem.userPassword) {
                    callback()
                } else {
                    callback(new Error('确认密码不正确！'));
                }
            }

            const validatePassword = (rule, value, callback) => {
                var re = /^\w{4,10}$/;
                if (!re.test(value)) {
                    this.passwordChanged = false
                    callback(new Error('密码包含字母、数字、下划线，长度4-10个字符'));
                } else {
                    this.passwordChanged = true
                    callback();
                }
            };

            const userNameValidate = (rule, value, callback) => {
                checkUserName({
                    userName: value,
                    id: this.editData.id
                }).then(res => {
                    if (res.code == 404) {
                        callback()
                    } else {
                        callback(new Error('登录名重复'))
                    }
                })
            }
            return {
                savePassLoading: false,
                editPasswordForm: {},
                editPasswordModal: false,
                role: {},
                formItem: {
                    role: {},
                    principalOrganizationId: '', //所属组织
                    userPassword: '', //用戶密碼
                    confirmPassword: '', //确认密码
                    userName: '', //登陆用户
                    personName: '', //真实姓名
                    enabled: 0, //是否启用
                    mobileNumber: '', //移动电话
                    emailAddress: '', //邮箱地址
                    roleId: '', //角色信息
                    organizationId:'', //组织信息
                    companyName:''
                },
                passwordValidate: {
                    newPass: [
                        { validator: validatePassword }
                    ],
                    rePass: [
                        { validator: checkConfirm }
                    ]
                },
                passwordChanged: false,
                isLoading: false,
                isBack: false,
                loading1: false,
                enabledList:[
                    {
                        code: 0,
                        label: '否'
                    },
                    {
                        code: 1,
                        label: '是'
                    }
                ],

                organizations: [],
                ruleValidate: {
                    principalOrganizationId: [
                        {
                            required: true,
                            message: "请选择所属组织",
                            trigger: "change"
                        }
                    ],
                    userName: [
                        {
                            required: true,
                            message: "请输入登录名",
                            trigger: "change"
                        },
                        {
                            validator: userNameValidate,
                            trigger: 'blur'
                        }
                    ],
                    personName: [
                        {
                            required: true,
                            message: "请输入用户名",
                            trigger: "change"
                        }
                    ],
                    companyName:[
                        {
                            required: true,
                            message: "请输入工作单位",
                            trigger: "change"
                        }
                    ],
                    userPassword: [
                        { validator: validatePassword}
                    ],
                    confirmPassword: [
                        { validator: checkConfirm }
                    ],
                    roleId: [
                        {
                            required: true,
                            message: "请输入用户角色",
                            trigger: "blur"
                        }
                    ],
                    emailAddress: [
                        {
                            required: false,
                            message: "请输入电子邮箱",
                            trigger: "change"
                        },
                        { type: "email", message: "请输入正确的电子邮箱", trigger: "change" }
                    ],
                    mobileNumber: [
                        {
                            required: true,
                            validator: this.$check.phone
                        }
                    ]
                },
               
                saveLoading:false,              //保存按钮loading状态
                roleList:[]
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            async init() { 
                this.isLoading = true; 
                getRoleList(this)
                this.isLoading = false; 
                if(this.$store.state.app.organizationData.id){
                    this.formItem.organizationId = this.$store.state.app.organizationData.id;
                }
                if (this.isEdit) {
                    //编辑时候赋值
                    Object.assign(this.formItem, this.editData);
                }
            },
            // 开始时间选择
            changeStartDate(date){
                this.formItem.startDate = date;
            },
            // 结束时间选择
            changeEndDate(date){
                this.formItem.endDate = date;
            },
            //返回
            handleBack() {
                this.$emit('handleBackList');
            },
            //保存
            handleSave() {
                this.$refs['formItem'].validate(valid=>{
                    if(valid){
                        if (this.isEdit) {
                            //编辑
                            this.formItem.id = this.editData.id;
                            updateAction(this);
                        } else {
                            //保存
                            if (this.formItem.id) {
                                updateAction(this);
                            } else {
                                addUserByOrganizationIdAction(this);
                            }
                        }
                    }
                })
            },
            saveEditPass() {
                this.$refs['editPasswordForm'].validate(valid => {
                    if (valid) {
                        this.formItem.userPassword = this.editPasswordForm.newPass || this.dto.userPassword;
                        this.handleSave();
                    }
                })
                this.editPasswordModal = false;
                this.$refs['editPasswordForm'].resetFields();
            },
            cancelEditPass() {
                this.editPasswordModal = false;
                this.$refs['editPasswordForm'].resetFields();
            }
        },
        watch: {
           
            '$store.state.app.organizationData'(val){
                if(val.id){
                    this.formItem.organizationId = val.id;
                }
            },
            organizationData(val){
                
            }
        },
        components: {
			
		},
    }
</script>
<style scoped lang='less'>
    .portlet-body {
        background-color: #fff;
        padding: 10px;
        height: auto;
    }

    .control-group {
        height: 55px;
        .error_text {
            color: red;
            padding-left: 10px;
        }
    }

    .dec {
        display: inline-block;
        vertical-align: middle;
        width: 160px;
        text-align: right;
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        margin-right: 10px;
    }

    .symbol {
        display: inline-block;
        vertical-align: middle;
        width: 7px;
        text-align: right;
        height: 25px;
        color: red;
        line-height: 25px;
        font-size: 14px;
    }

    .form_operate {
        padding-left: 180px;
        margin: 20px 0;
    }
</style>