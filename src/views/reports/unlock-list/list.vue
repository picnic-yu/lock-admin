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
                    <div class='title'>锁具操作达人</div>
                    <div class='count'>{{recordCount.talent}}</div>
                </Col>
                <Col span="8" class='count-item'>
                    <div class='title'>使用频次最高锁具</div>
                    <div class='count'>{{recordCount.most}}</div>
                </Col>
                <Col span="8" class='count-item'>
                    <div class='title'>本周累计开关锁</div>
                    <div class='count'>{{recordCount.total}}</div>
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
        
    </section>
</template>

<script type="text/ecmascript-6">
import buttonGroup from '@/views/components/button-group/index.vue';
import searchForm from '@/views/components/search-form/index.vue';

import {getUnlockCount, deleteUnlock, getUnlockList } from '@/api/reports/unlock-list';
import { lookUpdata } from '@/libs/lookup/lookupInfo';
import lookupUtils from '@/libs/utils/lookupUtils';
import util from '@/libs/utils/util';

// 获取列表
const getList=function(self,params){
    self.isLoading=true;
    getUnlockList(params).then(res=>{
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
const getUnlockCountAction=function(self){
    getUnlockCount().then(res=>{
        if(res.code == 200){
            self.recordCount = res.content;
        }
    }).catch(()=>{
        
    })
}
// 删除
const deleteUnlockAction = (self) => {
    deleteUnlock(self.ids).then(res=>{
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
            recordCount:{
                talent:'',//锁具操作达人
                total:0,//本周累计开关锁
                most:''//使用频次最高锁具
            },
            titleText:"开关锁记录",
            placeholderValue:"输入锁具ID或执行人",
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
                    title: '锁具id',
                    key: 'lockId',
                    align: 'center'
                },
                {
                    title: '执行人',
                    key: 'executorName',
                    align: 'center'
                },
                {
                    title: '任务类别',
                    key: 'displayTaskType',
                    align: 'center'
                },
                {
                    title: '动作',
                    key: 'displayActionType',
                    align: 'center'
                },
                {
                    title: '操作时间',
                    key: 'displayAT',
                    align: 'center'
                },
                {
                    title: '锁具位置',
                    key: 'locationAddress',
                    align: 'center'
                }
            ],
            selectRowData: {},           //选择一行数据
            queryParam: {
                "pageSize": 10,
                "keyWords": '',
                "pageNumber": 0,
            },
            pageSizeOpts:[10,20,50,100],
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
            getUnlockCountAction(this);
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
                    deleteUnlockAction(this);
                },
                onCancel: () => {
                    
                    
                }
            })
            
        },
        
    },

    mounted() {
        this.init();
    }

}
</script>

<style lang='less' scoped>
    @import "../../../styles/searchAndOperate.less";
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