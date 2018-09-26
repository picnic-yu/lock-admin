<template>
    <section>
        <div class="portlet-title" >
            <Icon type="person-stalker"></Icon>
            <span class='title_text'>邮件配置</span>
        </div>
        <Form ref="formValidate" class= 'formvalidate-wrap' :model="formValidate" :rules="ruleValidate" :label-width="140">
            <Row>
                <Col span="10" offset="1">
					<FormItem label="邮箱主机" prop="host">
						<Input v-model="formValidate.host" 
							placeholder="请输入邮箱主机"  >
						</Input>
					</FormItem>
                </Col>
                <Col span="10" offset="1">
					<FormItem label="SSL加密" prop="ssl">
                        <RadioGroup v-model="formValidate.ssl">
                            <Radio 
                                v-for="item in sslList" 
                                :key='item.code' 
                                :label="item.code">
                                {{item.label}}
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="10" offset="1">
					<FormItem label="发送账号" prop="amount">
						<Input v-model="formValidate.amount" 
							placeholder="请输入发送账号"  >
						</Input>
					</FormItem>
                </Col>
                <Col span="10" offset="1">
					<FormItem label="发送密码" prop="password">
						<Input v-model="formValidate.password" 
							placeholder="请输入发送密码"  >
						</Input>
					</FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="10" offset="1">
					<FormItem label="默认端口" prop="port">
						<Input v-model="formValidate.port" 
							placeholder="请输入默认端口"  >
						</Input>
					</FormItem>
                </Col>
                <Col span="10" offset="1">
					<FormItem label="邮件主题" prop="title">
						<Input v-model="formValidate.title" 
							placeholder="请输入邮件主题"  >
						</Input>
					</FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="22" offset="1">
					<FormItem label="邮件模板" prop="editorContent">
						<div id="editorElem" style="text-align:left">
                            
                        </div>
					</FormItem>
                </Col>
            </Row>
            <div class="button-gropEl">
                <Button type="warning"  @click="handleSubmit('formValidate',1)" :loading='testLoading'>测试发送</Button>
                <Button type="primary" @click="handleSubmit('formValidate',0)" :loading='saveLoading' style="margin-left: 8px">保存</Button>
            </div>
        </Form>
        
        <!-- 发送邮件开始 -->
        <section>
            <Modal v-model="sendMailModelStatus" width="510">
	        <p slot="header" style="color:#2db7f5;text-align:left">
	            <span>发送邮件</span>
	        </p>
            <Form ref="sendEmail" :rules="ruleSendMail" :model="sendEmail" :label-width="100">
                <div >
                    <FormItem label="接收邮箱" prop="sendTo">
                        <Input v-model="sendEmail.sendTo" :maxlength=60 placeholder="请输入邮箱地址" style='width:80%'></Input>
                    </FormItem>
                </div>
            </Form>
	        <div slot="footer">
	            <Button 
	            	type="info"
	            	size="large" 
	            	:loading="sendLoading" 
	            	@click="handleSendMail('sendEmail')">
	            	发送
	            </Button>
	        </div>
    	</Modal>
        </section>
    </section>
    
</template>
<script>
import E from 'wangeditor';
import { addConfigureMail,updateConfigureMail,sendEmail } from '@/api/configure-mail';
/**
* 函数功能简述 新增邮件配置接口
*@param    {object}  self     vue this 
*/
const addConfigureMailAction = (self) => {
    self.saveLoading = true;
    return new Promise((resolve, reject) => {
        addConfigureMail(self.formValidate).then(response => {
            if(response.code == 200 ){
                self.formValidate.id = response.content.id;
                self.sendEmail.id = response.content.id;
                self.$Message.success('保存成功');
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
}
/**
* 函数功能简述 发送邮件
*@param    {object}  self     vue this 
*/
const sendEmailAction = (self) => {
    self.sendLoading = true;
    return new Promise((resolve, reject) => {
        sendEmail(self.sendEmail).then(response => {
            if(response.code == 200 ){
                self.$Message.success('发送成功');
                self.sendMailModelStatus = false;
                
            }else{
                self.$Message.error('发送失败');
            }
            self.sendLoading = false;
            resolve();
        }).catch(error => {
            self.sendLoading = false;
            self.$Message.error('发送失败');
            reject(error);
        })
    })
}
/**
* 函数功能简述   更新邮件配置请求接口
*@param    {object}  self     vue this 
*/
// const updateConfigureMailAction = (self) => {
//     self.saveLoading = true;
//     return new Promise((resolve, reject) => {
//         updateConfigureMail(self.formValidate).then(response => {
//             if(response.code == 200 ){
//                 self.formValidate.id = resolve.content.id;
//                 self.$Message.success('保存成功');
//             }else{
//                 self.$Message.error('保存失败');
//             }
//             self.saveLoading = false;
//             resolve();
//         }).catch(error => {
//             self.saveLoading = false;
//             self.$Message.error('保存失败');
//             reject(error);
//         })
//     })
// }
export default {
    name:"configure-mail",
    data () {
        return {
            formValidate: {
                id:'',
                host: '',
                port: '',
                amount: '',
                password: '',
                title: '',
                ssl: 0,
                editorContent:''
            },
            sslList:[
                {
                    code: 0,
                    label: '否'
                },
                {
                    code: 1,
                    label: '是'
                }
            ],
            ruleValidate: {
                host: [
                    { required: true, message: '请输入邮箱主机', trigger: 'change' }
                ],
                port: [
                    { required: true, message: '请输入默认端口', trigger: 'change' },
                ],
                amount: [
                    { required: true, message: '请输入发送账号', trigger: 'change' }
                ],
                password: [
                    { required: true, message: '请输入发送密码', trigger: 'change' }
                ],
                title: [
                    { required: true, message: '请输入邮件主题', trigger: 'change' },
                ]
            },
            saveLoading:false,
            testLoading:false,
            sendMailModelStatus:false,
            ruleSendMail: {    
                sendTo:[
                    {
                        required: true,
                        message: "请输入正确的邮箱地址",
                        trigger: "change"
                    },
                    { type: "email", message: "请输入正确的邮箱", trigger: "change" }
                ]
            },
            sendEmail:{
                sendTo:'',
                id:''
            },
            sendLoading:false
        }
    },
    mounted() {
        var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.formValidate.editorContent = html
        }
        
        editor.customConfig.customAlert =  (info) => {
            // info 是需要提示的内容
            // alert('自定义提示：' + info)
            // this.$Message.error(info);
        }
        
        editor.create();
    },
    watch:{
        'formValidate.editorContent'(val){

        },
        sendMailModelStatus(val){
            if(!val){
                this.testLoading = false;
            }else{
                this.handleReset('sendEmail');
            }
        }
    },
    methods: {
        /**
        * 函数功能简述 form表单验证后提交
        *@param    {string}  name     form表单ref 
        *@param    {boolean}  flag     0保存1测试
        */
        handleSubmit (name,flag) {
            if(flag){
                // 测试邮件
                if(!this.formValidate.id){
                    this.$Message.error('保存后才可以测试发送');
                }else{
                    // 弹出发送给谁
                    this.testLoading = true;
                    this.sendMailModelStatus = true;
                }
            }else{
                // 保存
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        addConfigureMailAction(this);
                    } 
                })
            }
        },
        // 发送邮件提交model
        handleSendMail(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                   sendEmailAction(this);
                } 
            })
        },
        /**
        * 函数功能简述 form 表单清空
        *@param    {string}  name     ref 
        */
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>
<style lang='less'>
	@import "../../../styles/searchAndOperate.less";
</style>
