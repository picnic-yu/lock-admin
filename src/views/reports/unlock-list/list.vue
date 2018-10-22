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
                            :searchdata='searchdata'
                            :inputList='inputList'
                            :removeInputFlag='removeInputFlag'
                            :placeholderValue='placeholderValue'
                            @query='query' >
                        </searchForm>
                    </div>
                </div>
                <i-table stripe  
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
        
    </section>
</template>

<script type="text/ecmascript-6">
import buttonGroup from '@/views/components/button-group/index.vue';
import searchForm from '@/views/components/search-form/index.vue';

import { getLockSeed } from '@/api/lock-manage/lock-seed';
import { lookUpdata } from '@/libs/lookup/lookupInfo';
import lookupUtils from '@/libs/utils/lookupUtils';
import util from '@/libs/utils/util';

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
    name:'shutdown-list',
    components: {
        buttonGroup,
        searchForm,
    },

    props: {},

    data() {
        return {
            titleText:"锁具种子管理",
            placeholderValue:"输入锁具ID",
            listData: [],
            isLoading: false,
            total: 0,
            ipColum:[
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
                    title: '密钥',
                    key: 'lockPassword',
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
                    key: 'distributionTime',
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
                                        this.handleEdit(params.row)
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
                "communicationPlan":'node-1'
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
            inputList:[
                {
                    title: "IP地址",
                    placeholder:'请输入IP地址',
                    value:''
                },
                {
                    title: "ICCID",
                    placeholder:'请输入ICCID',
                    value:''
                },
                {
                    title: "IMEI",
                    placeholder:'请输入IMEI',
                    value:''
                }
            ],
            searchdata: [
            ]
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
        //	获取列表页面
        getListData() {
            this.selectItems = [];
            this.deleteStatus = false;
            this.editStatus = false;
            this.isView = false;
            getList(this,this.queryParam);
        },
        handleEdit(row){

        },
        handleDelete(){

        },
        // 查询列表
        query(data) {
            this.queryParam.sensorNumber = data.keyWords;
            this.queryParam.ipAddress = data.inputList[0].value;
            this.queryParam.iccid = data.inputList[1].value;
            this.queryParam.imei = data.inputList[2].value;
            this.queryParam.communicationPlan = data.selectData[0].code;
            this.getListData();
        },   
        // 刷新页面
        refreshHandler(){
            this.queryParam.pageNumber = 0;
            this.queryParam.keyWords = '';
            this.removeInputFlag += 1;
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