<template>
    <section class='property-list'>
        <div class="portlet-title" v-show='!showLog'>
			<Icon type="person-stalker"></Icon>
			<span class='title_text'>{{titleText}}</span>
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
                    <FormItem label="通道类型" prop="channelType">
                        <Select v-model="formValidate.channelType" >
                            <Option v-for="(item, index) in channelTypeSelect" placeholder="请输入通道类型"  :value="item.code" :key="index">{{ item.value }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="10" offset="1">
                    <FormItem label="请求方法" prop="requestMethod">
                        <Select v-model="formValidate.requestMethod" >
                            <Option v-for="(item, index) in requestMethodSelect" placeholder="请输入请求方法"  :value="item.code" :key="index">{{ item.value }}</Option>
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
                    <FormItem label="发送成功返回值">
                        <Input v-model="formValidate.backValue" >
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
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
            <Button type="warning" @click='testSend'>短信测试</Button>
			<Button type="primary" @click="handleSave" :loading='saveLoading'>保存</Button>
            <Button type="primary" @click="handleSaveAndBack" >保存并返回</Button>
            <Button type="primary" @click="back" >返回</Button>
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
    
    import { saveMessage, saveParams, requestParamsList } from '@/api/system/configure-message';
    

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
                        self.$emit("handleBack", 1);                        
                    }else {
                        //根据是否保存并返回执行操作
                        if (self.saveAndBack) {
                            self.saveAndBack = false;
                            self.$emit('handleBack', 2);
                        } else {
                            self.$emit("handleBack", 1);
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
                slef.addLoading = false;
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
            code: 'HTTP',
            value: 'HTTP'
        }
    ]
    //请求方法下拉框
    const requestMethodSelect = [
        {
            code: 'GET',
            value: 'GET'
        },
        {
            code: 'POST',
            value: 'POST'
        }
    ]
    //编码方式下拉框
    const encodingSelect = [
        {
            code: 'UTF-8',
            value: 'UTF-8'
        }
    ]
    export default {
        
        name: 'message-form',
        components: {
            paramsForm,                 //参数表单
        },
        props: {
            editData: {
                type: Object,
                default: function() {
                    return {};
                }
            },
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
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
                    channelType: 'HTTP',    //通道类型
                    editorContent: '',      //编辑文本
                    requestMethod: 'GET',      //请求方法
                },
                ruleValidate: {             //校验规则
                    channelType: [
                        { required: true, message: '请选择通道类型', trigger: 'change' }
                    ],
                    sendURL: [
                        { required: true, message: '请输入发送URL', trigger: 'change' }
                    ],
                    requestMethod: [
                        { required: true, message: '请选择请求方法', trigger: 'change' }
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
                this.handleSave();
            },
            testSend() {
                
            },
            handleSave() {
                this.$refs["formValidate"].validate((valid) => {
                    if (valid) {
                        saveMessageAction(this);
                    } 
                })
            },
            handleSaveAndBack() {
                this.saveAndBack = true;
                this.handleSave();
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
            if (this.isEdit) {
                this.formValidate = this.editData;
                this.init();
            }
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

