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
                            :exportStatus="true" 
                            :refreshStatus='true'
                            :distributeStatus='distributeStatus'
                            @handleDistribute='handleDistribute'
                            @handleExport='handleExport'
                            @refreshHandler = 'refreshHandler' >
                        </button-group>
                    </div>
                    <div class="search-wrap">
                        <searchForm 
                            class='search-component' 
                            :searchdata='searchdata'
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
                show-sizer
                transfer 
                :page-size-opts='pageSizeOpts'
                :current ="queryParam.pageNumber+1" 
                :total="total" 
                @on-page-size-change='pageSizeChange'
                @on-change='pageChange'>
            </Page>
        </section>
        <Modal v-model="editModalStatus" width="500">
	        <p slot="header" style="color:#2db7f5;text-align:left">
	            <span>编辑</span>
	        </p>
	        <div class='editModal-wrap'>
				<Form ref="lockForm"  :rules="ruleValidate" :model="lockForm" :label-width="90">
                     <FormItem label="锁具ID" prop="lockId">
                        <Input v-model="lockForm.lockId" disabled :maxlength=20 ></Input>
                    </FormItem>
                    <FormItem label="锁具版本" prop="lockVersion">
                       
                        <Select   v-model="lockForm.lockVersion" placeholder="请选择锁具版本">
                            <Option v-for="item in lockVersionList" :value="item.code" :key="item.value">
                                {{item.value}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="所属单位" prop="organizationInfoId" >
                        <Select v-model="lockForm.organizationInfoId" :disabled="true">
                            <Option v-for="item in organizationList" :value="item.id" :key="item.organizationName">{{ item.organizationName }}</Option>
                        </Select>
                    </FormItem>
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
        <!-- 批量分发开始 -->
        <Modal v-model="distributeModal" width="500">
	        <p slot="header" style="color:#2db7f5;text-align:left">
	            <span>批量分发</span>
	        </p>
	        <div class='editModal-wrap'>
				<Form ref="distributeForm"  :rules="distributeValidate" :model="distributeForm" :label-width="90">
                    
                    <FormItem label="分发单位" prop="organizationInfoId" >
                        <Select v-model="distributeForm.organizationInfoId">
                            <Option v-for="item in organizationList" :value="item.id" :key="item.organizationName">{{ item.organizationName }}</Option>
                        </Select>
                    </FormItem>
				</Form>
                
	        </div>
	        <div slot="footer">
	        	<Button 
	            	type="info"
	            	size="large" 
	            	:loading="distributeLoading" 
	            	@click="handleSubmitDistribute">
	            	确定
	            </Button>
	        	
	            
				<Button 
	            	size="large" 
	            	@click="handleCancle">
	            	取消
	            </Button>
	        </div>
    	</Modal>
        <!-- 批量分发结束 -->
        <!-- 导入数据开始 -->
        <importdata 
			:importstatus='importstatus' 
			:actionUrl = 'url'
            :organizationList='organizationList'
			@importSuccess='importSuccess'
			@on-change="importstatusChange" 
			:modeltitle='importtitle'>
		</importdata>
        <!-- 导入数据结束 -->
    </section>
</template>

<script type="text/ecmascript-6">
import buttonGroup from '@/views/components/button-group/index.vue';
import searchForm from '@/views/components/search-form/index.vue';
import importdata from './import-data.vue';
import { getLockSeed,getLockSeedInfo,updateLockSeedInfo,deletelockSeed,sendSeed } from '@/api/lock-manage/lock-seed';
import { lookUpdata } from '@/libs/lookup/lookupInfo';
import lookupUtils from '@/libs/utils/lookupUtils';
import util from '@/libs/utils/util';
import BASE_URL from '@/api/config.js';

import { getOrgList } from '@/api/organization';

const statusList = [
    {
        code: 0,
        value:'未分发'
    },
    {
        code: 1,
        value:'已分发'
    }
]
// 批量分发
const sendSeedAction = (self) => {
    self.distributeLoading = true;
    sendSeed(self.distributeForm).then(res=>{
        self.distributeLoading = false;
        if(res.code == 201){
            self.$Message.success('分发成功');
            self.distributeModal = false;
            getList(self,self.queryParam)
        }else if(res.code == 404){
            self.$Message.error('请选择种子');
        }else if(res.code == 401){
            self.$Message.error('请先删除重新分发锁具的顺序开锁设置和任务');
        }else{
            self.$Message.error('分发失败');
        }
    }).catch((e)=>{
        self.distributeLoading = false;
        self.$Message.error('分发失败');
    })
}
// 删除种子信息

const deletelockSeedAction = (self,id) => {
    deletelockSeed(id).then(res=>{
        if(res.code == 204){
            self.$Message.success('删除成功');
            getList(self,self.queryParam)
        }else if(res.code == 101){
            self.$Message.error('请先删除顺序开锁设置和任务');
        }else{
            self.$Message.error('删除失败');
        }
    }).catch((e)=>{
       self.$Message.error('删除失败');
    })
}
// 更新锁信息
const updateLockSeedInfoAction = (self) => {
    self.modal_loading = true;
    updateLockSeedInfo(self.lockForm).then(res=>{
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
// 根据id获取锁具信息
const getLockSeedInfoAction=function(self,id){
    
    getLockSeedInfo(id).then(res=>{
       if(res.code == 200){
            Object.assign(self.lockForm, res.content,{organizationInfoId:res.content.organizationInfo.id});
            // sefl.lockForm.organizationInfoId = res.content.organizationInfo.id;
        }
       
    }).catch((e)=>{
        
        
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
// 获取列表
const getList=function(self,params){
    self.isLoading=true;
    getLockSeed(params).then(res=>{
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
export default {
    components: {
        buttonGroup,
        searchForm,
        importdata
    },

    props: {},

    data() {
        return {
            titleText:"锁具种子管理",
            placeholderValue:"输入锁具ID",
            listData: [],
            isLoading: false,
            pageSizeOpts:[10,20,50,100],
            total: 0,
            ipColum:[
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
                    title: '锁具id',
                    key: 'lockId',
                    align: 'center'
                },
                {
                    title: '版本',
                    key: 'version',
                    align: 'center'
                },
                {
                    title: '分发状态',
                    key: 'status',
                    align: 'center'
                },
                {
                    title: '录入时间',
                    key: 'displayCT',
                    align: 'center'
                },
                {
                    title: '分发时间',
                    key: 'displayDBT',
                    align: 'center'
                },
                {
                    title: '最后修改时间',
                    key: 'displayLMT',
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
                "pageNumber": 0
            },
            addStatus:true,         //新增按钮的状态
            removeInputFlag:0,
            isShowForm:false,
            deleteStatus:false,         //删除按钮显示状态
            editStatus:false,         //编辑按钮显示状态
            isView:false,               //是否查看页面
            purchaseOrderNumber: '',
            detailItem: {},                 //查看详情的数据
            modal_loading: false,             //model层状态
            
            distributeStatus:false,//分发按钮
            lockVersionList:[
                {
                    code: 1,
                    value:'自动锁'
                },
                {
                    code: 0,
                    value:'手动锁'
                },
            ],
            searchdata: [
                {
                    title: "分发状态",
                    model: '全部',
                    code: '',
                    data: statusList
                }
            ],
            lockForm:{
                lockId:'',
                organizationInfoId:'',//所属单位id
                lockVersion:1
            },//编辑锁信息表单
            ruleValidate:{
                organizationInfoId: [
                    {required: true, message: '请选择分发单位', trigger: 'change'}
                ],
            },//规则校验
            editModalStatus:false,//编辑弹出层
            organizationList:[],
            importstatus:false,
            importtitle:'上传',
            url:`${BASE_URL}/lock/seed/import`,
            distributeModal:false,
            distributeLoading:false,
            distributeForm:{
                lockSeedIds:'',
                organizationInfoId:''
            },
            distributeValidate:{
                organizationInfoId: [
                    {required: true, message: '请选择分发单位', trigger: 'change'}
                ],
            }
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
        pageSizeChange(size){
            this.queryParam.pageSize = size;
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
        // 导入数据modal弹窗状态变化
        importstatusChange(val){
            this.importstatus = val;
        },
        // 导入数据回调
        importSuccess(){
            this.getListData();
        },
        // 选中table数据变化
        selectionChange(selection){
            selection.length == 0 ? this.distributeStatus = false : this.distributeStatus = true;
            
            let arr = [];
            selection.forEach((item) => {
                arr.push(item.id);
            });
            this.distributeForm.lockSeedIds = arr.join(',');
        },
        // 查询列表
        query(data) {
            this.queryParam.keyWords = data.keyWords;
            
            this.queryParam.distributionStatus = data.selectData[0].code;
            this.getListData();
        },   
        // 刷新页面
        refreshHandler(){
            this.queryParam.pageNumber = 0;
            this.queryParam.keyWords = '';
            this.removeInputFlag += 1;
        },
        // 导入数据
        handleExport(){
            this.importstatus = true;
        },
        // 批量分发
        handleDistribute(){
            this.distributeModal = true;
            this.handleReset('distributeForm');
            
        },
        handleEdit(index){
            this.lockForm.id = this.listData[index].id;
            this.handleReset('lockForm');
            this.editModalStatus = true;
            getLockSeedInfoAction(this,this.listData[index].id);
           
        },
        handleDelete(index){
            this.$Modal.confirm({
                title: '提示',
                content: '确定要删除吗',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    deletelockSeedAction(this,this.listData[index].id);
                },
                onCancel: () => {
                    
                    
                }
            })
        },
        // 清空表单
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        handleSubmit(){
            this.$refs['lockForm'].validate((valid) => {
                if (valid) {
                    updateLockSeedInfoAction(this);
                } 
            })
        },
        handleCancle(){
            this.editModalStatus = false;
            this.distributeModal = false;
        },
        // 确认分发调用接口
        handleSubmitDistribute(){
            this.$refs['distributeForm'].validate((valid) => {
                if (valid) {
                    sendSeedAction(this);
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
</style>