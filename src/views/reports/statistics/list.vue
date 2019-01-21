<template>
    <section class="page">
        <div class='property-list'>
            <div class="portlet-title">
                <span class='title_text'>选择查询条件</span>
            </div>
            <div class="form-wrap">
                <Form :model="formItem" :label-width="80">
                    <Row>
                        <Col span="8">
                            <FormItem label="时间段：">
                                <DatePicker 
                                    :value="value2" 
                                    @on-change='handleDateChange'
                                    format="yyyy-MM-dd" 
                                    type="daterange" 
                                    placement="bottom-end" 
                                    placeholder="请选择时间段">
                                </DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="区域：">
                                <Select v-model="formItem.organizationInfoId" >
                                    <Option v-for="item in areaList" :value="item.id" :key="item.id">{{ item.organizationName }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem>
                                <Button type="primary" @click='handleQuery'>查询</Button>
                                <Button style="margin-left: 8px" @click='handleReset'>重置</Button>
                            </FormItem>
                        </Col>
                    </Row>
                        
        
                </Form>
                
            </div>
        </div>
        <div class="portlet-title">
            <span class='title_text'>数量统计</span>
        </div>
        <div class="card-wrap">

            <Row :gutter='16'>
                <Col span="8">
                    <card iconType='ios-location' cardTitle='区域' :cardNumber='countItem.organizationName'></card>
                    <card iconType='information' cardTitle='锁具活跃数量' :cardNumber='countItem.activeLocks' style='margin-top:10px;'></card>
                </Col>
                <Col span="8">
                    <long-card :countItem='countItem'></long-card>
                </Col>
                <Col span="8">
                    <card iconType='ios-unlocked-outline' cardTitle='已使用锁具' :cardNumber='countItem.usedLocks'></card>
                    <card iconType='plus' cardTitle='新增锁具' :cardNumber='countItem.newlyLocks' style='margin-top:10px;'></card>
                </Col>
            </Row>
        </div>
        <v-table 
            titleText='1.远程授权' 
            :listData='authList'
            :loading='authLoading' 
            :columns='authColumns'>
        </v-table>
        <v-table 
            :listData='orderList'
            :loading='orderLoading' 
            :columns='orderColumns'
            titleText='2.开锁工单统计'>

        </v-table>
        <v-table 
            :listData='unlockList' 
            :columns='unlockColumns'
            :loading='unlockLoading'
            titleText='3.开锁人开锁统计'>

        </v-table>
        <v-table 
            :listData='openList' 
            :columns='openColumns'
            :loading='openLoading'
            titleText='4.锁具开启统计'>
        </v-table>
        <v-table 
            :listData='dormancyList' 
            :loading='dormancyLoading'
            :columns='dormancyColumns'
            titleText='5.锁具活跃度'>
        </v-table>
    </section>
</template>

<script type="text/ecmascript-6">
import table from './table.vue';
import card from './card.vue';
import longCard from './long-card.vue';
import { getAuthlist,getDormancylist,getOpenlist,getUnlocklist,getOrderlist,getUserlist,getCount } from '@/api/reports/statistics';
// 获取区域
const getUserlistAction = function(self){
    
    getUserlist(self.formItem).then(res=>{
        if(res.code == 200){
            self.areaList = res.content;
        }else{
            self.areaList = [];
            
        }
        
    }).catch((e)=>{
        
        self.areaList = [];
        
    })
}

const getCountAction = function(self){
    
    getCount(self.formItem).then(res=>{
        if(res.code == 200){
            self.countItem = res.content;
        }
        
    }).catch((e)=>{
        
        
    })
}
// 获取远程授权
const getAuthlistAction = function(self){
    self.authLoading = true;
    getAuthlist(self.formItem).then(res=>{
        if(res.code == 200){
            self.authList = res.content;
        }else{
            self.authList = [];
            
        }
        self.authLoading = false;
    }).catch((e)=>{
        self.authLoading = false;
        self.authList = [];
        
    })
}
// 获取锁具活跃度
const getDormancylistAction = function(self){
    self.dormancyLoading=true;
    getDormancylist(self.formItem).then(res=>{
        if(res.code == 200){
            self.dormancyList = res.content;
        }else{
            self.dormancyList = [];
            
        }
        self.dormancyLoading = false;
    }).catch((e)=>{
        self.dormancyLoading = false;
        self.dormancyList = [];
        
    })
}

// 获取开启统计
const getOpenlistAction = function(self){
    self.openLoading = true;
    getOpenlist(self.formItem).then(res=>{
        if(res.code == 200){
            self.openList = res.content;
        }else{
            self.openList = [];
            
        }
        self.openLoading = false;
    }).catch((e)=>{
        self.openList = [];
        self.openLoading = false;
    })
}
// 开锁人开锁统计
const getUnlocklistAction = function(self){
    self.unlockLoading = true;
    getUnlocklist(self.formItem).then(res=>{
        if(res.code == 200){
            self.unlockList = res.content;
        }else{
            self.unlockList = [];
            
        }
        self.unlockLoading = false;
    }).catch((e)=>{
        self.unlockList = [];
        self.unlockLoading = false;
        
    })
}
// 工单统计
const getOrderlistAction = function(self){
    self.orderLoading = true;
    getOrderlist(self.formItem).then(res=>{
        if(res.code == 200){
            self.orderList = res.content;
        }else{
            self.orderList = [];
            
        }
        self.orderLoading = false;
    }).catch((e)=>{
        self.orderList = [];
        self.orderLoading = false;
    })
}
export default {
    components: {
        'v-table':table,
        longCard,
        card
    },

    props: {},

    data() {
        return {
            formItem:{
                endTime:'',
                startTime:'',
                organizationInfoId:''
            },
            countItem:{
                activeLocks: 0,
                authFrequency: 0,
                authQuantity: 0,
                locks: 0,
                newlyLocks: 0,
                organizationName: "",
                unlocksFrequency: 0,
                unlocksQuantity: 0,
                usedLocks: 0,
            },
            areaList:[],
            authLoading:false,
            orderLoading:false,
            unlockLoading:false,
            openLoading:false,
            dormancyLoading:false,
            value2: [],
            authList:[],
            dormancyList:[],
            orderList:[],
            orderColumns:[
                {
                    title: '任务目的',
                    key: 'orderType',
                    align: 'center'
                },
                {
                    title: '次数',
                    key: 'orderCount',
                    align: 'center'
                },
                {
                    title: '白天8点-17点',
                    key: 'quantity',
                    align: 'center'
                },
                {
                    title: '平均任务用时',
                    key: 'useTime',
                    align: 'center'
                },
                {
                    title: '最长任务用时',
                    key: 'longest',
                    align: 'center'
                }
            ],
            unlockList:[],
            unlockColumns:[
                {
                    title: '开锁人',
                    key: 'personName',
                    align: 'center'
                },
                {
                    title: '开锁次数',
                    key: 'unlockCount',
                    align: 'center'
                },
                {
                    title: '巡检',
                    key: 'patrolCount',
                    align: 'center'
                },
                {
                    title: '维护',
                    key: 'maintainCount',
                    align: 'center'
                },
                {
                    title: '抢修',
                    key: 'repairCount',
                    align: 'center'
                },
                {
                    title: '其他',
                    key: 'otherCount',
                    align: 'center'
                }
            ],
            openList:[],
            openColumns:[
                {
                    title: '锁具编号',
                    key: 'lockId',
                    align: 'center'
                },
                {
                    title: '开启次数',
                    key: 'unlockCount',
                    align: 'center'
                },
                {
                    title: '巡检',
                    key: 'patrolCount',
                    align: 'center'
                },
                {
                    title: '维护',
                    key: 'maintainCount',
                    align: 'center'
                },
                {
                    title: '抢修',
                    key: 'repairCount',
                    align: 'center'
                },
                {
                    title: '其他',
                    key: 'otherCount',
                    align: 'center'
                },
                {
                    title: '开启失败',
                    key: 'failCount',
                    align: 'center'
                }
            ],
            authColumns:[
                {
                    title: '授权人',
                    key: 'authorizer',
                    align: 'center'
                },
                {
                    title: '手机',
                    key: 'phoneNumber',
                    align: 'center'
                },
                {
                    title: '授权次数',
                    key: 'authFrequency',
                    align: 'center'
                }
            ],
            dormancyColumns:[
                {
                    title: '锁号',
                    key: 'lockId',
                    align: 'center'
                },
                {
                    title: '设施名称',
                    key: 'facilityName',
                    align: 'center'
                },
                {
                    title: '月度',
                    key: 'monthly',
                    align: 'center'
                },
                {
                    title: '季度',
                    key: 'quarter',
                    align: 'center'
                },
                {
                    title: '年度',
                    key: 'year',
                    align: 'center'
                },
                {
                    title: '距离上次开锁天数',
                    key: 'differDays',
                    align: 'center'
                }
            ],
            
        }

    },

    watch: {},

    methods: {
        handleQuery(){
            getUserlistAction(this);
            getAuthlistAction(this);
            getDormancylistAction(this);
            getOpenlistAction(this);
            getUnlocklistAction(this);
            getOrderlistAction(this);
            getCountAction(this);
        },
        handleReset(){
            this.value2 = [];
            this.formItem.organizationInfoId = '';
            this.handleQuery();
        },
        handleDateChange(data){
            if(data.length == 2){
                this.formItem.startTime = data[0];
                this.formItem.endTime = data[1];
            }
        }
    },

    mounted() {
        this.handleQuery();
    },

}
</script>

<style lang='less' scoped>
@import "../../../styles/searchAndOperate.less";
.form-wrap{
    background-color: #fff;
    padding-top:24px; 
}
</style>
