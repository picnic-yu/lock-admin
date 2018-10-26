<template>
    <section >
        <div class="portlet-title" >
            <Icon type="person-stalker"></Icon>
            <span class='title_text'>短信模板</span>
        </div>
         
       <Spin :fix='true' v-show='loading'>
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <Row >
            <Col span="11" offset="1" class='item' v-for='item in templateList' :key='item.id'>
                <Card :bordered="false">
                    <p slot="title">{{item.title}}</p>
                    <p class='message-content'>
                        {{item.templateContent}}
                    </p>
                    
                    <div class="button-wrap button-gropEl" >
                        <Button  @click='handleDelete(item)'>{{item.status == 1 ? '禁止' : '启用'}}</Button>
                        <Button  @click='handleEdit(item)' style='margin-left:20px;' >编辑</Button>
                    </div>
                </Card>
            </Col>
            
            
        </Row>
        <Modal v-model="editModalStatus" width="935">
	        <p slot="header" style="color:#2db7f5;text-align:left">
	            <span>编辑</span>
	        </p>
	        <div class='editModal-wrap'>
				<Form ref="messageForm"  :rules="ruleValidate" :model="messageForm" :label-width="100">
                    <Row>
                        <Col span="10" offset="1">
                            <FormItem label="标题" prop="title">
                                <Input v-model="messageForm.title"   placeholder="请输入标题"></Input>
                            </FormItem>
                        </Col>
                        <Col span="10" offset="1">
                            <FormItem label="模板编码" prop="templateCode">
                                <Input v-model="messageForm.templateCode"  placeholder="请输入模板编码"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                       <Col span="10" offset="1">
                            <FormItem label="模板内容" prop="templateContent">
                                <Input 
                                    type="textarea" 
                                    :autosize="{minRows: 2,maxRows: 4}" 
                                    v-model="messageForm.templateContent"  placeholder="请输入模板内容"></Input>
                            </FormItem>
                        </Col>
                    </Row>
				</Form>
                
	        </div>
	        <div slot="footer">
	        	<Button 
	            	type="info"
	            	size="large" 
	            	:loading="submit_loading" 
	            	@click="handleSubmit">
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

<script >
import { getMessagesTemplate, deleteMessagesTemplate, updateMessagesTemplate } from '@/api/system/configure-message';
const getMessagesTemplateAction = (self) => {
    self.loading = true;
    return new Promise((resolve, reject) => {
        
        getMessagesTemplate({}).then((res) => {
            if(res.code == 200 ){
                self.templateList = res.content;
            }
            self.loading = false;
            resolve();
        }).catch((err) => {
            self.loading = false;
            reject(err);
        })
    });
    
}
const deleteMessagesTemplateAction = (self,id) => {
    
    return new Promise((resolve, reject) => {
        
        deleteMessagesTemplate(id).then((res) => {
            if(res.code == 201 ){
                getMessagesTemplateAction(self);
                self.$Message.success('操作成功');
            }else{
                self.$Message.error('操作失败');
            }
           
            resolve();
        }).catch((err) => {
            self.$Message.error('操作失败');
            reject(err);
        })
    });
    
}
const updateMessagesTemplateAction = (self) => {
    
    return new Promise((resolve, reject) => {
        self.submit_loading = true;
        updateMessagesTemplate(self.messageForm).then((res) => {
            self.submit_loading = false;
            if(res.code == 201 ){

                self.editModalStatus = false;
                self.$Message.success('操作成功');
                getMessagesTemplateAction(self);
            }else{
                self.$Message.error('操作失败');
            }
           
            resolve();
        }).catch((err) => {
            self.submit_loading = false;
            self.$Message.error('操作失败');
            reject(err);
        })
    });
    
}

export default {

    components: {
        
    },

    props: {},

    data() {
        return {
            templateList:[],
            loading:false,
            submit_loading:false,
            editModalStatus:false,
            messageForm:{
                title:'',
                templateCode:'',
                templateContent:''
            },
            ruleValidate:{
                title: [
                    { required: true, message: '请输入标题', trigger: 'change' }
                ],
                templateCode: [
                    { required: true, message: '请输入模板编码', trigger: 'change' }
                ],
                templateContent: [
                    { required: true, message: '请输入模板内容', trigger: 'change' }
                ],
            }
        }

    },

    watch: {},

    methods: {
        handleSubmit(){
            this.$refs['messageForm'].validate((valid) => {
                if (valid) {
                   updateMessagesTemplateAction(this);
                } 
            })
        },
        handleCancle(){
            this.editModalStatus = false;
        },
        // 清空表单
        handleReset (name) {
            this.$refs[name].resetFields();
        },
       
        handleDelete(item){
            this.$Modal.confirm({
                title: '提示',
                content: `确定要${item.status == 1 ? '禁止' : '启用'}吗`,
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    deleteMessagesTemplateAction(this,item.id);
                },
                onCancel: () => {
                    
                    
                }
            })
        },
        handleEdit(item){
            this.handleReset('messageForm');
            Object.assign(this.messageForm,item);
            this.editModalStatus = true;
        }
    },

    mounted() {
        getMessagesTemplateAction(this);
    },

}
</script>

<style lang='less' scoped>
@import "../../../styles/searchAndOperate.less";
.content-wrap{
    background: #fff;
    padding:20px;
}
.card-list{
    width:90%;
    margin: 0 auto;
    .card-item{
        width:50%;
        box-sizing: border-box;
        padding:10px;
        float: left;
    }
}


.button-wrap{
    width:100%;
    border-top:1px solid #ccc;
    padding-top:10px;
}
.item{
    padding: 5px 15px;
}
.message-content{
    padding:10px 10px 15px;
}
</style>
