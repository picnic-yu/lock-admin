<template>
    <section>
        <header>
            <div class="portlet-title">
                <span class='title_text'>
                    <Icon type="ios-cloud-upload-outline"></Icon>
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
                            :publishStatus="true" 
                            :refreshStatus='true'
                            @handlePublish='handleExport'
                            @refreshHandler = 'refreshHandler' >
                        </button-group>
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
        </section>
        
        
        <!-- 导入数据开始 -->
        <importdata 
			:importstatus='importstatus' 
			:actionUrl = 'url'
            :organizationList='organizationList'
			@importSuccess='importSuccess'
			@on-change="importstatusChange" 
            :editData='lockForm'
			:modeltitle='importtitle'>
		</importdata>
        <!-- 导入数据结束 -->
    </section>
</template>

<script type="text/ecmascript-6">
import buttonGroup from '@/views/components/button-group/index.vue';
import searchForm from '@/views/components/search-form/index.vue';
import importdata from './import-data.vue';
import { getAppList } from '@/api/system/app';

import util from '@/libs/utils/util';
import BASE_URL from '@/api/config.js';


// 获取列表
const getList=function(self,params){
    self.isLoading=true;
    getAppList(params).then(res=>{
        self.isLoading = false;
        
        if(res.code == 200){
            
            self.listData = res.content;
        }else{
            self.listData = [];
            
        }
    }).catch(()=>{
        self.isLoading = false;
        self.listData = [];
        
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
            titleText:"APP版本控制",
            placeholderValue:"输入锁具ID",
            listData: [],
            isLoading: false,
            pageSizeOpts:[10,20,50,100],
            total: 0,
            ipColum:[
                {
                    title: '名称',
                    key: 'versionName',
                    align: 'center'
                },
                {
                    title: '版本',
                    key: 'appVersionCode',
                    align: 'center'
                },
                {
                    title: '备注',
                    key: 'remarks',
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
            importtitle:'APP发布',
            url:`${BASE_URL}/app/version/`,
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
            this.getListData();;
        },
        // 导入数据
        handleExport(){
            this.lockForm = {}
            this.importstatus = true;
        },
        
        handleEdit(index){
            this.lockForm = this.listData[index];
            this.importstatus = true;
           
        },
        
        // 清空表单
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        
        handleCancle(){
            this.editModalStatus = false;
            this.distributeModal = false;
        },
       
    },

    mounted() {
        this.init();
    }

}
</script>

<style lang='less' scoped>
    @import "../../../styles/searchAndOperate.less";
</style>