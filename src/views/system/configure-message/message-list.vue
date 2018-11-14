<template>
    <section class='property-list'>
        <div class="portlet-title" >
			<Icon type="person-stalker"></Icon>
			<span class='title_text'>短信通道设置</span>
		</div>
        <Form ref="formValidate" class= 'formvalidate-wrap' :model="formValidate" :rules="ruleValidate" :label-width="140">
            <Row>
                <Col span="21" offset="1">
                    <FormItem label="发送URL" prop="sendURL">
                        <Input v-model="formValidate.sendURL" 
                            placeholder="请输入发送URL">
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="10" offset="1">
                    <FormItem label="Content-Type" prop="contentType">
                        <Select v-model="formValidate.contentType" >
                            <Option v-for="(item, index) in channelTypeSelect" placeholder="请选择Content-Type"  :value="item.code" :key="index">{{ item.value }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="10" offset="1">
                    <FormItem label="协议" prop="requestMethod">
                        <Select v-model="formValidate.requestMethod" >
                            <Option v-for="(item, index) in requestMethodSelect" placeholder="请选择协议"  :value="item.code" :key="index">{{ item.value }}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="10" offset="1">
                    <FormItem label="编码方式" prop="encoding">
                        <Select v-model="formValidate.encoding" >
                            <Option v-for="(item, index) in encodingSelect" placeholder="请输入编码方式"  :value="item.code" :key="index">{{ item.value }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                 <Col span="10" offset="1">
                    <FormItem label="编辑文本">
                        <Input 
                            v-model="formValidate.editorContent" 
                            type="textarea" 
                            :autosize="{minRows: 3,maxRows: 5}" 
                            placeholder="请输入编辑文本">
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            
            <Row>
                <Col span="21" offset="1">  
                    <FormItem label="参数列表" >
                        <div class="addbtn-wrap">
                            <Button type="primary"
                                @click="addData('formValidate')"
                                icon="pricetag"
                                :loading="addLoading"
                                >新增</Button>
                        </div>
                        <!-- 参数列表 -->
                        <div class="list" >
                            <i-table stripe  
                                :columns="columns1" 
                                :data="listData" 
                                @on-row-click='selectItem'
                                :loading="tableLoading">  
                            </i-table>
                        </div>
                    </FormItem>
                </Col>
            </Row>
        <div class="button-gropEl">
            <Button type="warning" @click='testSend' :loading='testLoading'>短信测试</Button>
			<Button type="primary" @click="handleSave" :loading='saveLoading'>保存</Button>
		</div>
        </Form>

        <!-- 参数列表 -->
        <params-form 
            v-if="paramsFormShow"
            :data="formItem"
            :isEdit="isEditStatus"
            @handleBack="handleBack">
        </params-form>

        <!-- 删除提示框 -->
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

        <!-- 加载动画 -->
        <Spin :fix='true' v-show='isLoading'>
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>

        
    </section>
</template>

<script>
    import paramsForm from './params-form.vue';
    
    import { getMessages,testMessages,saveMessage, saveParams, requestParamsList,updateParams } from '@/api/system/configure-message';
    const getMessagesAction = (self) => {
        return new Promise((resolve, reject) => {
            
            getMessages().then((res) => {
                if(res.code == 200 ){
                    self.formValidate = res.content;
                    self.init();
                }
                resolve();
            }).catch((err) => {
                reject(err);
            })
        });
        
    }
    const testMessagesAction = (self) => {
        return new Promise((resolve, reject) => {
            //如果是新增按钮的保存操作，新增按钮loading
            self.testLoading = true;
            testMessages(self.formValidate).then((res) => {
                self.testLoading = false;
                if (res.code == 100) {
                    self.$Message.success('测试成功');
                } else {
                    self.$Message.error('测试失败');
                }
                resolve();
            }).catch((err) => {
                self.$Message.error('测试失败');
                self.testLoading = false;
                reject(err);
            })
        });
        
    }
    //保存短信
    const saveMessageAction = (self) => {
        return new Promise((resolve, reject) => {
            //如果是新增按钮的保存操作，新增按钮loading
            if (self.saveAfter) {
                self.addLoading = true;
            } else {
                self.saveLoading = true;
            }
            saveMessage(self.formValidate).then((res) => {
                self.saveLoading = false;
                self.addLoading = false;
                if (res.code == 201) {
                    //如果是新增按钮的保存操作，不弹提示并加载子组件
                    if (self.saveAfter) {
                        self.saveAfter = false;
                        //加载子组件
                        self.paramsFormShow = true;
                                     
                    }else {
                        //根据是否保存并返回执行操作
                        if (self.saveAndBack) {
                            self.saveAndBack = false;
                        } 
                        self.$Message.success('保存成功');
                    }
                    
                    self.formValidate = res.content || {};
                    //主表id传给子组件
                    self.formItem.messagesId = res.content.id; 
                } else {
                    self.$Message.error('保存失败');
                }
                resolve();
            }).catch((err) => {
                self.saveLoading = false;
                self.addLoading = false;
                self.saveAfter = false;
                self.saveAndBack = false;
                reject(err);
            })
        });
    }
    
    //查询短信参数
    const requestParamsListAction = (self) => {
        return new Promise((resolve, reject) => {
            self.tableLoading = true;
            requestParamsList({ messagesId: self.formValidate.id }).then((res) => {
                if (res.code == 200) {
                    self.listData = res.content || [];
                } else {
                    self.$Message.error('参数列表查询失败');
                }
                self.tableLoading = false;
                resolve();
            }).catch((err) => {
                self.tableLoading = false;
                reject(err);
            })
        });
    }
    
    //通道类型下拉框
    const channelTypeSelect = [
        {
            code: 'application/json',
            value: 'application/json'
        },
        {
            code: 'application/javascript',
            value: 'application/javascript'
        },
        {
            code: 'application/xml',
            value: 'application/xml'
        }
    ]
   
    //请求方法下拉框
    const requestMethodSelect = [
        {
            code: 'GET',
            value: 'HTTP-GET'
        },
        {
            code: 'POST',
            value: 'HTTP-POST'
        }
    ]
    //编码方式下拉框encoding  
    const encodingSelect = [
        {
            code: 'UTF-8',
            value: 'UTF-8'
        },{
            code: 'GB2312',
            value: 'GB2312'
        }
    ]
    export default {
        
        name: 'message-form',
        components: {
            paramsForm,                 //参数表单
        },
        props: {
            
        },
        data() {
            return {
                testLoading:false,//测试短信loading
                addLoading: false,           //新增loading
                saveAndBack: false,         //保存并返回
                saveAfter: false,           //保存之后还有操作
                saveLoading: false,         //保存loading
                deleteModelStatus: false,   //删除弹框
                delIndex: '',               //删除参数索引
                paramsFormShow: false,      //参数表单组件显示
                tableLoading: false,        //表格加载
                isEditStatus: false,        //是否编辑
                showAddOrEdit: false,       //查看或编辑参数列表
                selectIndex: 0,             //选中索引
                isSelect: false,            //是否选中
                formItem: {},               //选中行数据
                isLoading: false,           //是否加载
                listData: [],               //参数列表数据
                formValidate: {
                    sendURL: '',            //发送URL
                    encoding: 'UTF-8',      //编码方式
                    backValue: '',          //返回值
                    contentType: 'application/json',    //通道类型
                    editorContent: '',      //编辑文本
                    requestMethod: 'GET',      //请求方法
                },
                ruleValidate: {             //校验规则
                    contentType: [
                        { required: true, message: '请选择Content-Type', trigger: 'change' }
                    ],
                    sendURL: [
                        { required: true, message: '请输入发送URL', trigger: 'change' }
                    ],
                    requestMethod: [
                        { required: true, message: '请选择协议', trigger: 'change' }
                    ],
                    encoding: [
                        { required: true, message: '请选择编码方式', trigger: 'change' }
                    ],
                },
                saveAndAddLoading: false,   //保存并新增按钮loading
                encodingSelect: encodingSelect,
                channelTypeSelect: channelTypeSelect,
                requestMethodSelect: requestMethodSelect,
                columns1: [
                    {
                        title: '参数序号',
                        key: 'paramNumber',
                        align: 'center',
                    },
                    {
                        title: '参数名',
                        key: 'paramName',
                        align: 'center',
                    },
                    {
                        title: '参数值',
                        key: 'paramValue',
                        align: 'center',
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
                                            this.editDetail(params.index, params.row)
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
                                            this.remove(params.index, params.row)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ]
            }
        },
        methods: {
            init() {
                this.getListData();
            },
            getListData(){
                requestParamsListAction(this);
            },
            //选中
            selectItem(data, index) {
                this.formItem = data;
                this.formItem.messagesId = this.formValidate.id;
                this.selectIndex = index;
                this.isSelect = true;
            },
            handleBack(val) {
                if(val != 1){
                    this.paramsFormShow = false;
                    this.isSelect = false;
                    this.isEditStatus = false;
				}
				if(val){
					this.getListData();
				}
            },
            addData(){
                this.saveAfter = true;
                this.isEditStatus = false;
                this.handleSave();
            },
            testSend() {
                if(this.formValidate.id){
                    testMessagesAction(this);
                }
            },
            handleSave() {
                this.$refs["formValidate"].validate((valid) => {
                    if (valid) {
                        saveMessageAction(this);
                    } 
                })
            },
            
            back() {
                this.$emit("handleBack", 0);
            },
            editDetail(index, data) { //编辑
                this.isEditStatus = true;
                this.paramsFormShow = true;
                this.formItem = Object.assign({},data,{ messagesId: this.formValidate.id });
                // this.editId = this.listData[index].id;
                // this.formItem = this.listData[index];
                // this.formItem.messagesId = this.formValidate.id;
            },
            remove(index, data) { //删除
                this.delIndex = index;
				this.deleteModelStatus = true;
            },
            sureDel() {
                this.$Message.success("删除成功");
                this.deleteModelStatus = false;
                // deleteParamsAction(this);
            },
            cancelDel() {
                this.deleteModelStatus = false;
            }
        },
        mounted() {
            getMessagesAction(this);
            
        }

    }
</script>

<style lang="less" scoped>
@import "../../../styles/searchAndOperate.less";
    .addbtn-wrap {
        .ivu-btn {
            padding: 2px 8px;
            span {
                margin-left: 0px !important;
            }
        }
    }
    .list {
        padding: 2px;
    }
</style>

