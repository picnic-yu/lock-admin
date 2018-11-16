<template>
    <section>
        <header>
            <div class="portlet-title">
                <span class='title_text'>
                    <Icon type="ios-browsers"></Icon>
                    <span style="display:inline-block;">{{titleText}}</span>
                </span>
            </div>
        </header>
        <section class='count-wrap'>
            <Row :gutter='30'>
                <Col span="8" class='count-item'>
                    <div class='title'>组合任务</div>
                    <div class='count'>{{recordCount.group}}个任务</div>
                </Col>
                <Col span="8" class='count-item'>
                    <div class='title'>单锁任务</div>
                    <div class='count'>{{recordCount.lock}}个任务</div>
                </Col>
                <Col span="8" class='count-item'>
                    <div class='title'>过期任务</div>
                    <div class='count'>{{recordCount.expired}}个任务</div>
                </Col>
            </Row>
        </section>
        <!-- 列表开始 -->
        <section v-if='!isShowForm'>
            <div class='table-wrap'>
                <!--操作和查询框,operate搜索框，操作框组件-->
                <div class='query-wrap border-wrap'>
                    <div class="operate-wrap">
                        <button-group 
                            class='operate' 
                            :deleteStatus='deleteStatus' 
                            :addStatus="true" 
                            :refreshStatus='true'
                            @addHandler='handleAdd'
                            @deleteHandler='deleteHandler'
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
                    @on-selection-change='selectionChange'
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
        <!-- 新增编辑弹窗开始 -->
        <Modal v-model="formModal" width="935">
	        <p slot="header" style="color:#2db7f5;text-align:left">
	            <span>{{modalTitle}}</span>
	        </p>
	        <div class='editModal-wrap'>
				<Form ref="taskForm"  :rules="ruleValidate" :model="taskForm" :label-width="100">
                    <Row>
                        <Col span="10" offset="1">
                            <FormItem label="执行人" prop="executorId">
                                <Select v-model="taskForm.executorId"
                                    placeholder="请选择执行人 "
                                    filterable
                                    remote
                                    :remote-method="remoteMethod1"
                                    :label='""'
                                    :loading="principalLoading"
                                >
                                    <Option v-for="item in principalList"
                                        placeholder="请选择执行人  " 
                                        :value="item.id" :key="item.id">{{ item.personNameMobile }}</Option>
                                </Select>
                                
                            
                            </FormItem>
                        </Col>
                        <Col span="10" offset="1">
                            <FormItem label="任务类别" prop="taskType">
                                <Select    v-model="taskForm.taskType"  placeholder="请输入任务类别">
                                    <Option v-for="item in taskTypeLookup" :value="item.code" :key="item.value">
                                        {{item.value}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </Col>
                    
                        <Col span="10" offset="1">
                            <FormItem label="锁具ID" prop="lockInfoId" v-if='taskForm.taskType == "1"'>
                                <Select v-model="taskForm.lockInfoId"
                                    placeholder="请选择锁具ID "
                                    filterable
                                    remote
                                    :remote-method="lockIdRemote"
                                    :label='""'
                                    :loading="lockIdLoading"
                                >
                                    <Option v-for="item in lockIdList"
                                        placeholder="请选择锁具ID  " 
                                        :value="item.id" :key="item.id">{{ item.lockId }}</Option>
                                </Select>
                                
                            </FormItem>
                            <FormItem label="组合号" prop="lockGroupId" v-if='taskForm.taskType == "2"'>
                                <Select v-model="taskForm.lockGroupId"
                                    placeholder="请选组合号 "
                                    filterable
                                    remote
                                    :remote-method="lockIdGroupIdRemote"
                                    :label='""'
                                    :loading="lockGroupIdLoading"
                                >
                                    <Option v-for="item in lockGroupIdList"
                                        placeholder="请选组合号  " 
                                        :value="item.id" :key="item.id">{{ item.groupNumber }}</Option>
                                </Select>
                                
                            </FormItem>
                        </Col>
                        <Col span="10" offset="1">
                            <FormItem label="监护组" prop="organizationInfoId" v-if='taskForm.taskType == "2"' >
                                <Select v-model="taskForm.organizationInfoId">
                                    <Option v-for="item in organizationList" :value="item.id" :key="item.organizationName">{{ item.organizationName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    
                        <Col span="10" offset="1">
                            <FormItem label="工作内容" prop="taskContent">
                                <Input v-model="taskForm.taskContent"  :maxlength="20"  placeholder="请输入工作内容"></Input>
                            </FormItem>
                        </Col>
                        <Col span="10" offset="1">
                           <FormItem label="起始时间"  prop="startTime" >
                                <DatePicker 
                                    type="date"
                                    :clearable='true'
                                    @on-change='changeStartTime'
                                    :value="taskForm.startTime" 
                                    placeholder="请选择起始时间" >
                                </DatePicker>
                            </FormItem>
                        </Col>
                    
                        <Col span="10" offset="1">
                            <FormItem label="截至时间"   prop="endTime" >
                                <DatePicker 
                                    type="date"
                                    :clearable='true'
                                    @on-change='changeEndTime'
                                    :value="taskForm.endTime" 
                                    placeholder="请选择截至时间" >
                                </DatePicker>
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
        <!-- 新增编辑弹窗结束 -->
    </section>
</template>

<script type="text/ecmascript-6">
import buttonGroup from '@/views/components/button-group/index.vue';
import searchForm from '@/views/components/search-form/index.vue';
import { getOrgList } from '@/api/organization';
import {getPrincipals} from '@/api/principals';
import { getTaskByPg, getTaskManageCount,deleteTaskByIds,addTask,editTask } from '@/api/task-list';
import { getLockinfoList } from '@/api/lock-manage/lock-info';
import { getLockGroupList } from '@/api/lock-manage/lock-setting';
import lookUpdata  from '@/libs/lookup/lookupInfo';
import lookupUtils from '@/libs/utils/lookupUtils';
import util from '@/libs/utils/util';
import expandRow from './table-expand.vue';
// 获取人员
const getPrincipalsAction = (self,personName) => {
    self.principalLoading = true;
    return new Promise((resolve, reject) => {
        getPrincipals({personName:personName}).then(response => {
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
// 获取组织列别
const getOrgListAction=function(self){
    
    getOrgList({}).then(res=>{
       
       if(res.code == 200){
            self.organizationList = res.content;
            self.organizationList.forEach((item) => {
                item.organizationInfoId = item.id;
            });
        }else{
            self.organizationList = [];
        }
    }).catch((e)=>{
        
        self.organizationList = [];
        
    })
}
// 获取列表
const getList=function(self,params){
    self.isLoading=true;
    getTaskByPg(params).then(res=>{
        self.isLoading = false;
        
        if(res.code == 200){
            self.total = res.content.rowCount;
            self.listData = res.content.data;
        }else{
            self.listData = [];
            self.total = 0;
        }
    }).catch(()=>{
        self.isLoading = false;
        self.listData = [];
        self.total = 0;
    })
}
// 新增任务
const addTaskAction=function(self){
    self.submit_loading=true;
    addTask(self.taskForm).then(res=>{
        self.submit_loading = false;
        
        if(res.code == 201){
            self.$Message.success('保存成功');
            self.formModal = false;
            self.getListData();
        }else{
            self.$Message.error('保存失败');
        }
    }).catch(()=>{
        self.submit_loading = false;
        self.$Message.error('保存失败');
    })
}

const editTaskAction=function(self){
    self.submit_loading=true;
    editTask(self.taskForm).then(res=>{
        self.submit_loading = false;
        
        if(res.code == 201){
            self.$Message.success('保存成功');
            self.formModal = false;
            self.getListData();
        }else{
            self.$Message.error('保存失败');
        }
    }).catch(()=>{
        self.submit_loading = false;
        self.$Message.error('保存失败');
    })
}
const getTaskManageCountAction=function(self){
    getTaskManageCount().then(res=>{
        if(res.code == 200){
            self.recordCount = res.content;
        }
    }).catch(()=>{
        
    })
}
// 锁具id远程加载，列表
// getLockinfoList
const getLockinfoListAction = (self,keyWords) => {
    self.lockIdLoading = true;
    return new Promise((resolve, reject) => {
        getLockinfoList({keyWords:keyWords, bindingStatus:1}).then(response => {
            if(response.code == 200 ){
                self.lockIdList = response.content;
            }
            self.lockIdLoading = false;
            resolve()
        }).catch(error => {
            reject(error);
            self.lockIdLoading = false;
        })
    })
};
// 组合查询
const getGroupListAction = (self,keyWords) => {
    self.lockGroupIdLoading = true;
    return new Promise((resolve, reject) => {
        getLockGroupList({keyWords:keyWords}).then(response => {
            if(response.code == 200 ){
                self.lockGroupIdList = response.content;
            }
            self.lockGroupIdLoading = false;
            resolve()
        }).catch(error => {
            reject(error);
            self.lockGroupIdList = [];
            self.lockGroupIdLoading = false;
        })
    })
};
// 删除
const deleteTaskByIdsAction = (self) => {
    deleteTaskByIds(self.ids).then(res=>{
        if(res.code == 204){
            self.$Message.success('删除成功');
            self.getListData();
        }else{
            self.$Message.error('删除失败');
        }
    }).catch((e)=>{
       self.$Message.error('删除失败');
    })
}
const statusList =  [
    {
        "code": "",
        "value": "全部"
    },
    {
        "code": "1",
        "value": "进行中"
    },
    {
        "code": "2",
        "value": "等待中"
    },
    // {
    //     'value': '全部',
    //     'code': '1'
    // },
    // {
    //     'value': '进行中',
    //     'value': '1'
    // },
    // {
    //     'value': '等待中',
    //     'code': '2'
    // }
];
export default {
    components: {
        buttonGroup,
        searchForm,
    },

    props: {},

    data() {
        return {
            lockGroupIdLoading:false,
            lockGroupIdList:[],
            principalLoading:false,
            principalList:[],
            lockIdLoading:false,
            lockIdList:[],
            organizationList:[],
            recordCount:{
                group:0,//组合任务
                lock:0,//单锁任务
                expired:0//过期任务
            },
            taskForm:{
                taskType:'1',//任务类别
                lockInfoId:'',//锁具ID
                lockGroupId:'',//组合号
                executorId:'',//执行人
                organizationInfoId:'',//监护组
                taskContent:'',//工作内容
                startTime:'',//起始时间
                endTime:'',//截至时间
            },
            submit_loading:false,
            ruleValidate:{
                lockInfoId: [
                    {required: true, message: '请选择锁具ID', trigger: 'change'}
                ],
                lockGroupId: [
                    {required: true, message: '请选择组合号', trigger: 'change'}
                ],
                executorId: [
                    {required: true, message: '请选择执行人', trigger: 'change'}
                ],
                organizationInfoId: [
                    {required: true, message: '请选择监护组', trigger: 'change'}
                ],
                startTime: [
                    {required: true, message: '请选择起始时间', trigger: 'change'}
                ],
                endTime: [
                    {required: true, message: '请选择截至时间', trigger: 'change'}
                ],
                taskContent: [
                    {required: true, message: '请输入工作内容', trigger: 'change'}
                ],
            },
            modalTitle:'新增',
            titleText:"授权记录",
            placeholderValue:"输入锁具ID",
            listData: [],
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
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '任务ID',
                    key: 'taskCode',
                    align: 'center'
                },
                {
                    title: '执行人',
                    key: 'executorName',
                    align: 'center'
                },
                {
                    title: '工作内容',
                    key: 'taskContent',
                    align: 'center'
                },
                {
                    title: '监护组',
                    key: 'organizationInfoName',
                    align: 'center'
                },
                {
                    title: '锁具ID/组合号',
                    key: 'fromNumber',
                    align: 'center'
                },
                 {
                    title: '状态',
                    key: 'displayStatus',
                    align: 'center'
                },
                // {
                //     title: '任务类别',
                //     key: 'displayTaskType',
                //     align: 'center'
                // },
               
                
                {
                    title: '起始时间',
                    key: 'displayST',
                    align: 'center'
                },
                {
                    title: '截至时间',
                    key: 'displayET',
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
                                        this.handleEdit(params.row)
                                    }
                                }
                            }, '编辑')
                        ]);
                    }
                }
            ],
            selectRowData: {},           //选择一行数据
            queryParam: {
                "pageSize": 10,
                "keyWords": '',
                "pageNumber": 0,
            },
            ids:'',//删除多个id
            deleteStatus:false,
            addStatus:true,         //新增按钮的状态
            removeInputFlag:0,
            isShowForm:false,
            deleteStatus:false,         //删除按钮显示状态
            editStatus:false,         //编辑按钮显示状态
            isView:false,               //是否查看页面
            purchaseOrderNumber: '',
            detailItem: {},                 //查看详情的数据
            searchdata:[{
                    title: "状态",
                    model: '全部',
                    code: '',
                    data: statusList
                }
            ],
            taskTypeLookup:lookUpdata.taskTypeLookup,
            formModal:false//表單modal
        }
    },

    watch: {},

    methods: {
        init () {
            console.log(this.taskTypeLookup)
            this.getListData();
        },
        changeStartTime(value){
            this.taskForm.startTime = value;
        },
        changeEndTime(value) {
            this.taskForm.endTime = value;
        },
        // 人员远程加载
        remoteMethod1 (query) {
            if (query !== '') {
                // this.companyName = query;
                
                getPrincipalsAction(this,query);
            } else {
                this.principalList = [];
            }
        },
        lockIdRemote(query){
            if (query !== '') {
                // this.companyName = query;
                
                getLockinfoListAction(this,query);
            } else {
                this.lockIdList = [];
            }
        },
        lockIdGroupIdRemote(query){
             if (query !== '') {
               
                getGroupListAction(this,query);
            } else {
                this.lockGroupIdList = [];
            }
        },
        // 选中table数据变化
        selectionChange(selection){
            selection.length == 0 ? this.deleteStatus = false : this.deleteStatus = true;
            
            let arr = [];
            selection.forEach((item) => {
                arr.push(item.id);
            });
            this.ids = arr.join(',');
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
            getTaskManageCountAction(this);
        },
        // 查询列表
        query(data) {
            this.queryParam.keyWords = data.keyWords;
            // this.queryParam.status = data.selectData[0].code;
            this.getListData();
        },   
        // 刷新页面
        refreshHandler(){
            this.queryParam.pageNumber = 0;
            this.queryParam.keyWords = '';
            this.removeInputFlag += 1;
        },
        // 删除多个
        deleteHandler() {
            deleteTaskByIdsAction(this);
        },
        // 新增
        handleAdd(){
            this.handleReset('taskForm');
            this.modalTitle = '新增';
            
            this.formModal = true;
            this.taskForm = {
                taskType:'1',//任务类别
                lockInfoId:'',//锁具ID
                lockGroupId:'',//组合号
                executorId:'',//执行人
                organizationInfoId:'',//监护组
                taskContent:'',//工作内容
                startTime:'',//起始时间
                endTime:''//截至时间
            }
        },
        handleEdit(row){
            this.handleReset('taskForm');
            this.modalTitle = '编辑';
            this.formModal = true;
            if(row.lockGroup){
                this.taskForm.lockGroupId = row.lockGroup.id;
            }
            if(row.lockInfo){
                this.taskForm.lockInfoId = row.lockInfo.id;
            }
            if(row.organizationInfo){
                this.taskForm.organizationInfoId = row.organizationInfo.id;
                
            }
            this.taskForm.startTime = row.displayST;
            this.taskForm.endTime = row.displayET;
            this.taskForm.id = row.id;
            this.taskForm.endTime = row.displayET;
            this.taskForm.taskType = row.taskType+'';
            this.taskForm.taskContent = row.taskContent;
            this.taskForm.executorId = row.executor.id;
        },
        handleSubmit(){
            this.$refs['taskForm'].validate((valid) => {
                if (valid) {
                    if(!this.taskForm.id){
                        addTaskAction(this);
                    }else{
                        editTaskAction(this);
                    }
                    
                } 
            })
        },
        // 清空表单
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        handleCancle(){
            this.formModal = false;
        },
    },

    mounted() {
        this.init();
        getOrgListAction(this);
    }

}
</script>

<style lang='less' scoped>
    @import "../../styles/searchAndOperate.less";
    .count-wrap{
        background: #FFF;
        margin-bottom:20px;
        .count-item{
            height:60px;
            margin:15px 0; 
            border-right:1px solid #ccc;
            .title{
                height:30px;
                line-height: 30px;
                text-align: center;
                font-family: 'PingFangSC-Regular', 'PingFang SC';
                color: rgba(0, 0, 0, 0.447058823529412);
                font-size: 14px;
            }
            .count{
                height:30px;
                line-height: 30px;
                text-align: center;
                font-family: 'Helvetica';
                color: rgba(0, 0, 0, 0.847058823529412);
                font-size: 24px;
            }
        }
        .count-item:last-child{
            border-right:none;
        }
        
    }
</style>