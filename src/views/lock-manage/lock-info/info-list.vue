<template>
    <section>
        <header>
            <div class="portlet-title">
                <span class='title_text'>
                    <Icon type="ios-search"></Icon>
                    <span style="display:inline-block;">{{titleText}}</span>
                </span>
            </div>
        </header>
        <!-- 列表开始 -->
        <section v-if='!isShowForm'>
            <div class='table-wrap'>
                <!--操作和查询框,operate搜索框，操作框组件-->
                <div class='query-wrap border-wrap'>
                    <div class="operate-wrap">
                        <button-group 
                            class='operate' 
                            :addStatus="false" 
                            :refreshStatus='true'
                            @refreshHandler = 'refreshHandler' >
                        </button-group>
                    </div>
                    <div class="search-wrap">
                        <searchForm 
                            class='search-component' 
                            :removeInputFlag='removeInputFlag'
                            :placeholderValue='placeholderValue'
                            @query='query' >
                        </searchForm>
                    </div>
                </div>
                <i-table stripe  
                    @on-expand='handleExpand'
					:columns="ipColum" 
					:data="listData" > 
				</i-table>
                <Spin :fix='true' v-show='isLoading'>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                </Spin>
            </div>
            <Page class='page-wrap' 
                show-elevator 
                show-total 
                :current ="queryParam.pageNumber+1" 
                :total="total" 
                @on-change='pageChange'>
            </Page>
        </section>
        <Modal v-model="editModalStatus" width="935">
	        <p slot="header" style="color:#2db7f5;text-align:left">
	            <span>编辑</span>
	        </p>
	        <div class='editModal-wrap'>
				<Form ref="lockForm"  :rules="ruleValidate" :model="lockForm" :label-width="100">
                    <Row>
                        <Col span="10" offset="1">
                            <FormItem label="锁具ID" prop="lockId">
                                <Input v-model="lockForm.lockId" disabled :maxlength=20 ></Input>
                            </FormItem>
                        </Col>
                        <Col span="10" offset="1">
                            <FormItem label="位置" prop="locationAddress">
                                <Input v-model="lockForm.locationAddress" :maxlength=20 placeholder="请输入位置"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col span="10" offset="1">
                            <FormItem label="位置编号" prop="locationCode">
                                <Input v-model="lockForm.locationCode"  :maxlength=20 placeholder="请输入位置编号"></Input>
                            </FormItem>
                        </Col>
                        <Col span="10" offset="1">
                            <FormItem label="门磁编号" prop="dmCode">
                                <Input v-model="lockForm.dmCode" :maxlength=20 placeholder="请输入门磁编号"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10" offset="1">
                            <FormItem label="所属单位" prop="organizationInfoId" >
                                <Select v-model="lockForm.organizationInfoId">
                                    <Option v-for="item in organizationList" :value="item.id" :key="item.organizationName">{{ item.organizationName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
				</Form>
                <Form ref="bindForm"  :rules="ruleValidateBind" :model="bindForm" :label-width="100">
                   
                    <Row>
                        <Col span="10" offset="1">
                            <FormItem label="姓名/手机号码" prop="principalId">
                                <Select v-model="bindForm.principalId"
                                    placeholder="请选择姓名/手机号码 "
                                    filterable
                                    remote
                                    :remote-method="remoteMethod1"
                                    :label='""'
                                    :loading="principalLoading"
                                >
                                    <Option v-for="item in principalList"
                                        placeholder="请选择姓名/手机号码  " 
                                        :value="item.id" :key="item.id">{{ item.personNameMobile }}</Option>
                                </Select>
                                
                            
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <Button type="primary" style='margin-left:10px; mairgin-top: 5px;'  @click="handleBind">绑定</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="21" offset="1">
                            <FormItem >
                               <Table :columns="bindColumn" :data="bindlistData" ></Table>
                            </FormItem>
                        </Col>
                        
                    </Row>
                    
				</Form>
	        </div>
	        <div slot="footer">
	        	<Button 
	            	type="info"
	            	size="large" 
	            	:loading="modal_loading" 
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

<script type="text/ecmascript-6">
import buttonGroup from '@/views/components/button-group/index.vue';
import searchForm from '@/views/components/search-form/index.vue';
import expandRow from './table-expand';
import { getLockInfo, deletelockInfo, getLockInfoById, bindlockStall, getBindingStaff, deleteBindStaff,updateLockinfo } from '@/api/lock-manage/lock-info';
import { getOrgList } from '@/api/organization';
import {getPrincipals} from '@/api/principals';
import { lookUpdata } from '@/libs/lookup/lookupInfo';
import lookupUtils from '@/libs/utils/lookupUtils';
import util from '@/libs/utils/util';
updateLockinfo
// 更新锁信息
const updateLockinfoAction = (self) => {
    self.modal_loading = true;
    updateLockinfo(self.lockForm).then(res=>{
        self.modal_loading = false;
        if(res.code == 201){
            self.$Message.success('保存成功');
            self.editModalStatus = false;
            getList(self,self.queryParam);
        }else{
            self.$Message.error('保存失败');
            
        }
    }).catch((e)=>{
        self.$Message.error('保存失败');
        self.modal_loading = false;
        
    })
}
// 获取绑定人员列表
const getBindingStaffAction = (self, id) => {
   
    getBindingStaff(id).then(res=>{
       if(res.code == 200){
            self.bindlistData = res.content;
            self.bindlistData.forEach((item) =>{
                item.mobileNumber = item.principal.mobileNumber;
                item.personName = item.principal.personName;
            });
            
        }else{
            self.bindlistData = [];
            
        }
    }).catch((e)=>{
       
        self.bindlistData = [];
        
    })
}
// 解绑
const deleteBindStaffAction = (self,id) => {
    deleteBindStaff(id).then(res=>{
        if(res.code == 204){
            self.$Message.success('解绑成功');
            getBindingStaffAction(self, self.lockForm.id);
            
        }else{
            self.$Message.error('解绑失败');
        }
    }).catch((e)=>{
       self.$Message.error('解绑失败');
    })
}

// 获取列表
const getList=function(self,params){
    self.isLoading=true;
    getLockInfo(params).then(res=>{
        self.isLoading = false;
        
       if(res.code == 200){
            self.total = res.content.rowCount;
            self.listData = res.content.data;
        }else{
            self.listData = [];
            self.total = 0;
        }
    }).catch((e)=>{
        self.isLoading = false;
        self.listData = [];
        self.total = 0;
    })
}
// 获取组织列别
const getOrgListAction=function(self){
    self.isLoading=true;
    getOrgList({}).then(res=>{
       
       if(res.code == 200){
            self.organizationList = res.content;
            self.organizationList.forEach((item) => {
                item.organizationInfoId = item.id;
            });
            console.log(self.organizationList)
        }else{
            self.organizationList = [];
            
        }
    }).catch((e)=>{
        
        self.organizationList = [];
        
    })
}
// 根据id获取锁具信息
const getLockInfoByIdAction=function(self,id){
    
    getLockInfoById(id).then(res=>{
       if(res.code == 200){
            Object.assign(self.lockForm, res.content,{organizationInfoId:res.content.organizationInfo.id});
            // sefl.lockForm.organizationInfoId = res.content.organizationInfo.id;
        }
       
    }).catch((e)=>{
        
        
    })
}

const deletelockInfoAction = (self,id) => {
    deletelockInfo(id).then(res=>{
        if(res.code == 201){
            self.$Message.success('删除成功');
            getList(self,self.queryParam)
        }else{
            self.$Message.error('删除失败');
        }
    }).catch((e)=>{
       self.$Message.error('删除失败');
    })
}
// 获取人员
const getPrincipalsAction = (self,personName) => {
    self.principalLoading = true;
    return new Promise((resolve, reject) => {
        getPrincipals({keyWords:personName}).then(response => {
            if(response.code == 200 ){
                self.principalList = response.content;
            }
            self.principalLoading = false;
            resolve()
        }).catch(error => {
            reject(error);
            self.principalLoading = false;
        })
    })
};
// 绑定人员

const bindlockStallAction=function(self){
    
    bindlockStall(self.bindForm).then(res=>{
       
        if(res.code == 201){
            self.$Message.success('绑定成功');
            getBindingStaffAction(self, self.lockForm.id);
        }else{
            self.$Message.error('绑定失败');
            
        }
    }).catch((e)=>{
        self.$Message.error('绑定失败');
        
        
    })
}
export default {
    components: {
        buttonGroup,
        searchForm,
    },

    props: {},

    data() {
        return {
            titleText:"锁信息管理",
            placeholderValue:"输入锁具ID",
            listData: [{}],
            isLoading: false,
            total: 0,
            ipColum:[
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '锁具id',
                    key: 'lockId',
                    align: 'center'
                },
                {
                    title: '位置',
                    key: 'locationAddress',
                    align: 'center'
                },
                {
                    title:'位置编号',
                    key:'locationCode',
                    align:'center'
                },
                {
                    title: '门磁编码',
                    key: 'dmCode',
                    align: 'center'
                },
                {
                    title: '所属单位',
                    key: 'organizationName',
                    align: 'center'
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
                                        this.handleEdit(params.index)
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
                                        this.handleDelete(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            selectRowData: {},           //选择一行数据
            queryParam: {
                "pageSize": 10,
                "keyWords": '',
                "pageNumber": 0,
                "status":1,
            },
            addStatus:true,         //新增按钮的状态
            removeInputFlag:0,
            isShowForm:false,
            deleteStatus:false,         //删除按钮显示状态
            editStatus:false,         //编辑按钮显示状态
            isView:false,               //是否查看页面
            purchaseOrderNumber: '',
            detailItem: {},                 //查看详情的数据
            modelStatus: false,             //查看详情model层状态
            lockForm:{
                lockId:'',
                locationAddress:'',//位置
                locationCode:'',//位置编号
                dmCode:'',//门磁编码
                organizationInfoId:'',//所属单位id
                
            },//编辑锁信息表单
            ruleValidate:{
                locationAddress: [
                    {required: true, message: '请输入位置', trigger: 'change'}
                ],
                locationCode: [
                    {required: true, message: '请输入位置编号', trigger: 'change'}
                ],
                dmCode: [
                    {required: true, message: '请输入门磁编码', trigger: 'change'}
                ],
                organizationInfoId: [
                    {required: true, message: '请输入所属单位', trigger: 'change'}
                ],
            },//规则校验
            editModalStatus:false,//编辑弹出层
            organizationList:[],
            principalLoading:false,
            principalList:[],//人员列表
            bindForm:{
                principalId:'',
                lockInfoId:''
            },
            ruleValidateBind:{
                principalId: [
                    {required: true, message: '请选择姓名/手机号码 ', trigger: 'change'}
                ]
            },
            modal_loading:false,//弹出层按钮loading
            bindlistData:[],
            bindColumn: [
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '姓名',
                    align: 'center',
                    key: 'personName'
                },
                {
                    title: '手机号',
                    align: 'center',
                    key: 'mobileNumber'
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
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.handleUntie(params.index)
                                    }
                                }
                            }, '解绑')
                        ]);
                    }
                }
            ],
        }
    },

    watch: {},

    methods: {
        init () {
            getOrgListAction(this);
            this.getListData();
        },
        pageChange(data) {
            this.queryParam.pageNumber = data -1;
            this.getListData();
        },
        //	获取列表页面
        getListData() {
            this.selectItems = [];
            this.deleteStatus = false;
            this.editStatus = false;
            this.isView = false;
            getList(this,this.queryParam);
        },
       
        // 查询列表
        query(data) {
            this.queryParam.sensorNumber = data.keyWords;
            // this.queryParam.ipAddress = data.inputList[0].value;
            // this.queryParam.iccid = data.inputList[1].value;
            // this.queryParam.imei = data.inputList[2].value;
            // this.queryParam.communicationPlan = data.selectData[0].code;
            this.getListData();
        },   
        // 刷新页面
        refreshHandler(){
            this.queryParam.pageNumber = 0;
            this.queryParam.keyWords = '';
            this.removeInputFlag += 1;
        },
        handleEdit(index){
            console.log(this.organizationList,'organizationList')
            console.log(this.lockForm,'lockForm');
            this.lockForm.id = this.listData[index].id;
            this.bindForm.lockInfoId = this.listData[index].id;
            this.handleReset('lockForm');
            this.handleReset('bindForm');
            this.editModalStatus = true;
            getLockInfoByIdAction(this,this.listData[index].id);
            getBindingStaffAction(this,this.listData[index].id)
        },
        handleSubmit(){
            this.$refs['lockForm'].validate((valid) => {
                if (valid) {
                    updateLockinfoAction(this);
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
        handleDelete(index){
            this.$Modal.confirm({
                title: '提示',
                content: '确定要删除吗',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    deletelockInfoAction(this,this.listData[index].id);
                },
                onCancel: () => {
                    
                    
                }
            })
        },
        handleExpand(row,status){
            console.log(row)
        },
        remoteMethod1 (query) {
            if (query !== '') {
                // this.companyName = query;
                
                getPrincipalsAction(this,query);
            } else {
                this.principalList = [];
            }
        },
        // 绑定
        handleBind(){
            this.$refs['bindForm'].validate((valid) => {
                if (valid) {
                    bindlockStallAction(this);
                } 
            })
        },
        // 解绑
        handleUntie(index){
            this.$Modal.confirm({
                title: '提示',
                content: '确定要解绑吗',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {

                    deleteBindStaffAction(this,this.bindlistData[index].id);
                },
                onCancel: () => {
                    
                    
                }
            })

        }
    },

    mounted() {
        this.init();
    }

}
</script>

<style lang='less' scoped>
    @import "../../../styles/searchAndOperate.less";
    .editModal-wrap{
        max-height:500px !important;
        overflow: auto;
    }
</style>