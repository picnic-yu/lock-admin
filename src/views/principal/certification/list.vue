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
        <!-- 列表开始 -->
        <section v-if='!isShowForm'>
            <div class='table-wrap'>
                <!--操作和查询框,operate搜索框，操作框组件-->
                <div class='query-wrap border-wrap'>
                    <div class="operate-wrap">
                        <button-group 
                            class='operate' 
                            :deleteStatus='deleteStatus' 
                            :addStatus="false" 
                            :refreshStatus='true'
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
                show-sizer
                transfer 
                :page-size-opts='pageSizeOpts'
                :current ="queryParam.pageNumber+1" 
                :total="total" 
                @on-page-size-change='pageSizeChange'
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
                            <FormItem label="姓名" >
                                <Input v-model="taskForm.personName" readonly></Input>
                            </FormItem>
                        </Col>
                        <Col span="10" offset="1">
                            <FormItem label="手机号" >
                                <Input v-model="taskForm.mobileNumber" readonly></Input>
                            </FormItem>
                        </Col>
                        <Col span="10" offset="1">
                            <FormItem label="工作单位" >
                                <Input v-model="taskForm.companyName" readonly></Input>
                            </FormItem>
                        </Col>
                        <Col span="10" offset="1">
                            <FormItem label="备注" >
                                <Input v-model="taskForm.remarks" readonly></Input>
                            </FormItem>
                        </Col>
                        <Col span="10" offset="1">
                            <FormItem label="头像" >
                                <img style='width:150px;height:150px;border-radius:50%;' :src="taskForm.userPhoto"  />
                            </FormItem>
                        </Col>
                    </Row>
                    <div class="picture">
                        <div class="item">
                            <img :src="taskForm.facadePhoto"  />
                        </div>
                        <div class="item">
                            <img :src="taskForm.backPhoto"  />
                        </div>
                        <div class="item">
                            <img :src="taskForm.handheldPhoto"  />
                        </div>
                        <div class="item">
                            <img :src="taskForm.attachment1"  />
                        </div>
                        <div class="item">
                            <img :src="taskForm.attachment2"  />
                        </div>
                    </div>
                    <div class="picture-dec">
                        <div class="item">
                            身份证正面
                        </div>
                        <div class="item">
                            身份证反面
                        </div>
                        <div class="item">
                            手持身份证
                        </div>
                        <div class="item">
                            附件一
                        </div>
                        <div class="item">
                            附件二
                        </div>
                    </div>
                    <Row>
                        <Col span="10" offset="1">
                            <FormItem label="证件号" prop="documentNumber">
                                <Input v-model="taskForm.documentNumber" placeholder="请输入证件号" ></Input>
                            </FormItem>
                        </Col>
                        <Col span="10" offset="1">
                            <FormItem label="证件地址" prop="documentAddress">
                                <Input v-model="taskForm.documentAddress" placeholder="请输入证件地址"></Input>
                            </FormItem>
                        </Col>
                        <Col span="10" offset="1">
                            <FormItem label="单位组别" prop="organizationInfoId"  >
                                <Select v-model="taskForm.organizationInfoId">
                                    <Option v-for="item in organizationList" :value="item.id" :key="item.organizationName">{{ item.organizationName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    
                        <Col span="10" offset="1">
                            <FormItem label="用户角色" prop="roleId">
                                <Select  v-model="taskForm.roleId">
                                    <Option v-for="item in roleList" :value="item.id" :key="item.id">
                                        {{ item.roleName }}
                                    </Option>
                                </Select>
                                
                            </FormItem>
                           
                        </Col>
                    
                        <Col span="10" offset="1">
                            
                        </Col>
                    </Row>
				</Form>
	        </div>
	        <div slot="footer">
	        	
	        	<Button v-if='taskForm.status == 2'
	            	type="info"
	            	size="large" 
	            	:loading="submit_loading" 
	            	@click="handleSubmit(3)">
	            	审核通过
	            </Button>
	            <Button 
                    v-if='taskForm.status == 2'
	            	type="info"
	            	size="large" 
	            	:loading="refusum_loading" 
	            	@click="handleSubmit(1)">
	            	不予通过
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


import { getCertifications, deleteCertifications,getCertificationInfo,editCertification } from '@/api/certification';
import lookUpdata  from '@/libs/lookup/lookupInfo';
import lookupUtils from '@/libs/utils/lookupUtils';
import util from '@/libs/utils/util';
import { getRoleListOfOrganization } from '@/api/principals';
// 获取角色列表
const getRoleList = (self) => {
    getRoleListOfOrganization().then(res => {
        if (res.code == 200) {
            self.roleList = res.content
            // if (self.isEdit) {
            //     self.formItem.roleId = self.formItem.role.id;
            //     self.formItem.roleName = self.formItem.role.roleName;
            // }
        }
    })
}
// 获取用户信息
const getCertificationInfoAction = (self,id) => {
    getCertificationInfo(id).then(res => {
        if (res.code == 200) {
            Object.assign(self.taskForm,res.content,{id});
           
        }
    })
}
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
    getCertifications(params).then(res=>{
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


const editCertificationAction=function(self,flag){
    if(flag==1){
        self.refusum_loading = true;
    }else{
        self.submit_loading=true;
    }
    
    editCertification(self.taskForm).then(res=>{
        self.submit_loading = false;
        self.refusum_loading = false;
        if(res.code == 201){
            self.$Message.success('保存成功');
            self.formModal = false;
            self.getListData();
        }else if(res.code == 101){
            self.$Message.error('操作失败,没有审核权限 ');
        }else{
            self.$Message.error('保存失败');
        }
    }).catch(()=>{
        self.refusum_loading = false;
        self.submit_loading = false;
        self.$Message.error('保存失败');
    })
}



// 删除
const deleteCertificationsAction = (self) => {
    deleteCertifications(self.ids).then(res=>{
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
            roleList:[],//角色列表
            lockGroupIdLoading:false,
            lockGroupIdList:[],
            principalLoading:false,
            principalList:[],
            lockIdList:[],
            organizationList:[],
            refusum_loading:false,
            taskForm:{
                documentAddress:'',//证件地址
                documentNumber:'',//证件号
                organizationInfoId:'',
                roleId:'',
            },
            submit_loading:false,
            ruleValidate:{
               
                roleId: [
                    {required: true, message: '请选择角色', trigger: 'change'}
                ],
                organizationInfoId: [
                    {required: true, message: '请选择单位组别', trigger: 'change'}
                ],
            },
            modalTitle:'编辑',
            titleText:"实名认证管理",
            placeholderValue:"",
            listData: [],
            isLoading: false,
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
                    title: '姓名',
                    key: 'personName',
                    align: 'center'
                },
                {
                    title: '手机号',
                    key: 'mobileNumber',
                    align: 'center'
                },
                {
                    title: '备注',
                    key: 'remarks',
                    align: 'center'
                },
                {
                    title: '修改时间',
                    key: 'displayLMT',
                    align: 'center'
                },
                 {
                    title: '状态',
                    key: 'displayStatus',
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
            pageSizeOpts:[10,20,50,100],
            formModal:false//表單modal
        }
    },

    watch: {},

    methods: {
        init () {
            
            this.getListData();
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
            this.$Modal.confirm({
                title: '提示',
                content: '确定要删除吗',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    deleteCertificationsAction(this);
                },
                onCancel: () => {
                    
                    
                }
            })
            
        },
    
        handleEdit(row){
            this.handleReset('taskForm');
            this.modalTitle = '实名认证';
            this.refusum_loading = false;
            this.submit_loading = false;
            this.formModal = true;
            getCertificationInfoAction(this,row.id);
            
        },
        // 修改  1未通过 3通过
        handleSubmit(flag){
            this.$refs['taskForm'].validate((valid) => {
                if (valid) {
                    this.taskForm.status = flag;
                    editCertificationAction(this,flag)
                    
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
        getRoleList(this);
    }

}
</script>

<style lang='less' scoped>
    @import "../../../styles/searchAndOperate.less";
    .editModal-wrap{
        max-height: 700px;
        overflow-y: auto;
        .picture{
            width:80%;
            margin:10px auto 0;
            border-top: 1px solid #e6e6e6;
            .item{
                width:20%;
                box-sizing: border-box;
                padding: 10px 10px 0;
                float:left;
                img{
                    width:100%;
                    height:100%;
                    min-width: 100px;
                    min-height: 100px;
                    border-radius: 8px;
                }
            }
        }
        .picture-dec{
            width:80%;
            margin:0 auto;
            .item{
                width:20%;
                box-sizing: border-box;
                padding: 0 10px 15px;
                float:left;
                text-align: center;
            }
        }
    }
</style>