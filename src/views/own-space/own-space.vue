<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card style="padding:20px 50px;">
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate">
                    <Row>
                        <Col span="19" offset="2">
                            <FormItem label="所属组织：">
                                <div>
                                    <Input v-model="userForm.organizationName" readonly class="disabledEl"></Input>
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="9" offset="2">
                           <FormItem label="登录名：">
                               <div >
                                    <Input v-model="userForm.userName" readonly class="disabledEl"></Input>
                                </div>
                            </FormItem> 
                        </Col>
                        <Col span="9" offset="1">
                            <FormItem label="用户名：">
                                <div>
                                    <Input v-model="userForm.personName" readonly class="disabledEl"></Input>
                                </div>
                            </FormItem>
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col span="9" offset="2">
                           <FormItem label="用户手机：" prop="mobileNumber">
                                <div >
                                    <Input v-model="userForm.mobileNumber" ></Input>
                                </div>
                            </FormItem>
                        </Col>
                        <Col span="9" offset="1">
                            <FormItem label="用户邮箱：" prop="emailAddress">
                                <div>
                                    <Input v-model="userForm.emailAddress" ></Input>
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                   
                    <Row>
                        <Col span="9" offset="2">
                           <FormItem label="用户密码：">
                                <div>
                                    <Button type="text" @click="editPasswordModal = true">修改密码</Button>
                                </div>
                            </FormItem> 
                        </Col>
                    </Row>

                    <Row type="flex" justify="center">
                        <Col span="button-gropEl">
                            <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存</Button>  
                            <Button type="text" style="width: 100px;" @click="cancelEditUserInfor">取消</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Card>
        
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

    </div>
</template>

<script>

import { getLoginPrincipal, updateUserByOrganizationId } from '@/api/principals';

let updateUser = (self, obj) => {
    self.save_loading = true;
    updateUserByOrganizationId(obj).then(response => {
        if (response.code === 201) {
            self.dto = response.content;
            self.dto.organizationName = response.content.organizationInfo.organizationName;
            self.$Message.success('保存成功');
        } else {
            self.$Message.error('保存失败');
        }
        self.save_loading = false;
    }).catch(() => {
        self.$Message.error('保存失败');
        self.save_loading = false;
    })
}

const getLoginPrincipalAction = (self) =>  {
    // self.loadingUserList = true;
    return new Promise((resolve, reject) => {
        getLoginPrincipal(self.queryParam).then(response => {
            if(response.code == 200) {
               self.userForm = response.content
               self.userForm.organizationName = response.content.organizationInfo.organizationName;
               self.dto = response.content;
            }
            // self.loadingUserList = false;
            resolve();
        }).catch(error => {
            // self.loadingUserList = false;
            reject(error);
        })
    })
};
export default {
    name: 'ownspace_index',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };
       const validePassword = (rule, value, callback) => {
           var re = /^\w{4,10}$/;
           if (!re.test(value)) {
                callback(new Error('密码包含字母、数字、下划线，长度4-10个字符'));
            } else {
                callback();
            }
       };
       
       const checkConfirm = (rule, value, callback) => {
            if (value === this.editPasswordForm.newPass) {
                callback()
            } else {
                callback(new Error('确认密码不正确！'));
            }
        }
        return {
            editPasswordModal: false,
            userForm: {},
            editPasswordForm: {},
            dto: {}, // dto
            save_loading: false,
            identifyError: '', // 验证码错误
            savePassLoading: false,
            oldPassError: '',
            identifyCodeRight: false, // 验证码是否正确
            passwordValidate: {
                newPass: [
                    { validator: validePassword }
                ],
                rePass: [
                    { validator: checkConfirm }
                ]
            },
            inforValidate: {
                emailAddress: [
                    {
                        required: false, 
                        message: '请输入正确的电子邮箱', 
                        type:'email'
                    }
                ],
                mobileNumber: [
                    {
                        required: false,
                        validator: this.$check.phone
                    }
                ],
            },
            gettingIdentifyCodeBtnContent: '获取验证码' // “获取验证码”按钮的文字
        };
    },
    methods: {
        
        // 取消
        cancelEditUserInfor () {
            this.userForm = Object.assign({}, this.dto);
            this.$store.commit('removeTag', 'ownspace_index');
            localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            let lastPageName = '';
            if (this.$store.state.app.pageOpenedList.length > 1) {
                lastPageName = this.$store.state.app.pageOpenedList[1].name;
            } else {
                lastPageName = this.$store.state.app.pageOpenedList[0].name;
            }
            this.$router.push({
                name: lastPageName
            });
        },
        // 保存
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    let formData = {
                        id: this.dto.id,
                        userPassword: this.userForm.userPassword,
                        mobileNumber: this.userForm.mobileNumber,
                        emailAddress: this.userForm.emailAddress,
                        organizationId: this.dto.organizationInfo.id,
                        enabled: 1,
                        personName: this.dto.personName,
                        roleId: this.dto.role.id,
                        userName: this.dto.userName
                    }
                    updateUser(this, formData)                        
                }
            });
        },
        saveEditPass() {
            this.$refs['editPasswordForm'].validate(valid => {
                if (valid) {
                    this.userForm.userPassword = this.editPasswordForm.newPass || this.dto.userPassword;
                    this.saveEdit();
                }
            })
            this.editPasswordModal = false;
            this.$refs['editPasswordForm'].resetFields();
        },
        init () {
            getLoginPrincipalAction(this);
        },
        cancelEditPass() {
            this.editPasswordModal = false;
            this.$refs['editPasswordForm'].resetFields();
        }
    },
    mounted () {
        this.init();
    }
};
</script>
