<template>
    <section>
        <div class="portlet-title" >
            <Icon type="clipboard"></Icon>
            <span class='title_text'>帮助与反馈</span>
        </div>
        <div ref="editor" style="text-align:left"></div>
        <!-- <Form ref="formValidate" class= 'formvalidate-wrap' :model="formValidate" :rules="ruleValidate" :label-width="140">
            <Row>
                <Col span="23">
					<FormItem label="帮助与反馈内容" prop="helpContent">
						<div ref="editor" style="text-align:left"></div>
					</FormItem>
                </Col>
                
            </Row>
            
            
        </Form> -->
        <div class="button-gropEl" style='margin-top:20px'>
                
            <Button type="primary" @click="handleSubmit('formValidate',0)" :loading='saveLoading' >保存</Button>
        </div>
       
    </section>
    
</template>
<script>
import E from 'wangeditor'
import { getFeedback,saveFeedback } from '@/api/system/feedback/index.js';
/**
* 函数功能简述 新增邮件配置接口
*@param    {object}  self     vue this 
*/
const saveFeedbackAction = (self) => {
    self.saveLoading = true;
    return new Promise((resolve, reject) => {
        saveFeedback(self.formValidate).then(response => {
            if(response.code == 201 ){
                
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
* 函数功能简述 新增邮件配置接口
*@param    {object}  self     vue this 
*/
const getFeedbackAction = (self,editor) => {
    
    return new Promise((resolve, reject) => {
        getFeedback().then(response => {
            if(response.code == 200 ){
                self.formValidate = response.content;
                editor.txt.html(response.content.helpContent)
            }
            resolve();
        }).catch(error => {
            
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
               
                helpContent:''
            },
            saveLoading:false,
            
        }
    },
    mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editor.customConfig.onchange = (html) => {
            this.formValidate.helpContent = html
        }
        editor.create()
        getFeedbackAction(this,editor);
        
    },
    watch:{
       
        
    },
    methods: {
        /**
        * 函数功能简述 form表单验证后提交
        *@param    {string}  name     form表单ref 
        *@param    {boolean}  flag     0保存1测试
        */
        handleSubmit (name,flag) {
            // 保存
            if(!this.formValidate.helpContent){
                return this.$Message.error('帮助与反馈内容不能为空');
            }
            saveFeedbackAction(this);
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
    .w-e-text-container{
        min-height: 600px;
    }
</style>
