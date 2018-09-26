/* * @Author: Hano.zhang * @Date: 2018-03-23 10:03:38 * @Last Modified by: Hano.zhang * @Last Modified time: 2018-03-23 10:23:17
*/

<style lang="less">
    @import "./homeDemo.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row class='chartsLayout'>
            <Col :xs="24" :sm="12" :md="6">
            <Card class='cardColor_blue'>
                <Row>
                    <Col :xs="6" :sm="12" :md="10" offset="2">
                    <Icon type="ios-people-outline" class="card_icon" :size="iconFontSize"></Icon>
                    </Col>
                    <Col :xs="18" :sm="12" :md="12">
                    <count-up style='text-aline:center;' class="infor-card-count user-created-count" id-name="allCustomer" textDescription=' 家  '
                        :end-val="count.allCustomerVal" :color="textColor" :descriptionColor="textColor" :countSize="bossCountFontSize">
                        <p style='text-align:center;' slot="intro">
                            <span>总客户数</span>
                        </p>
                    </count-up>
                    </Col>
                </Row>
            </Card>
            </Col>
            <Col :xs="24" :sm="12" :md="6">
            <Card class='cardColor_green'>
                <Row>

                    <Col :xs="6" :sm="12" :md="8" offset="2">
                    <Icon type="social-yen-outline" class="card_icon" :size="iconFontSize"></Icon>
                    </Col>
                    <Col :xs="18" :sm="12" :md="14">
                    <count-up style='text-aline:center;' class="infor-card-count user-created-count boss-normalLoans_total" id-name="normalLoans_total"
                        textDescription=' 万元  ' :end-val="count.normalLoans_total" :color="textColor" :descriptionColor="textColor"
                        :countSize="bossCountFontSizeSc">
                        <p style='text-align:center;' slot="intro">
                            <span>总放款金额</span>
                        </p>
                    </count-up>
                    </Col>
                </Row>
            </Card>
            </Col>
            <Col :xs="24" :sm="12" :md="6">
            <Card class='cardColor_yellow'>
                <Row>
                    <Col :xs="6" :sm="12" :md="10" offset="2">
                    <Icon type="ios-personadd-outline" class="card_icon" :size="iconFontSize"></Icon>
                    </Col>
                    <Col :xs="18" :sm="12" :md="12">
                    <count-up style='text-aline:center;' class="infor-card-count user-created-count" id-name="customer_add" textDescription=' 家  '
                        :end-val="count.customer_add" :color="textColor" :descriptionColor="textColor" :countSize="bossCountFontSize">
                        <p style='text-align:center;' slot="intro">
                            <span>新增客户数</span>
                        </p>
                    </count-up>
                    </Col>
                </Row>
            </Card>
            </Col>
            <Col :xs="24" :sm="12" :md="6">
            <Card class='cardColor_red'>
                <Row>

                    <Col :xs="6" :sm="12" :md="10" offset="2">
                    <Icon type="social-yen-outline" class="card_icon" :size="iconFontSize"></Icon>
                    </Col>
                    <Col :xs="18" :sm="12" :md="12">
                    <count-up style='text-aline:center;' class="infor-card-count user-created-count  boss-statistics" id-name="statistics" textDescription=' 万元  '
                        :end-val="count.statistics" :color="textColor" :descriptionColor="textColor" :countSize="bossCountFontSizeSc">
                        <p style='text-align:center;' slot="intro">
                            <span>新增放款金额</span>
                        </p>
                    </count-up>
                    </Col>
                </Row>
            </Card>
            </Col>
            <Col :xs="24" :sm="12" :md="9">
                <Card class="layoutCard layoutCardBlue">
                    <panCake :data="equipmentWarning" :isHomePage='isHomePage'></panCake>

                </Card>
            </Col>

            <Col :xs="24" :sm="12" :md="9">
                <Card class="layoutCard layoutCardWhite">
                    <!-- 数据分析 -->
                    <Row>
                        <Col span="12" class="colSpan">
                        <infor-card id-name="equipmentNet_count" :end-val="count.equipmentNet" iconType="social-instagram" :countSize="bossCountFontSizeSmall"
                            :iconSize="bossAuthorityIconSize" :color="bgGreen" textDescription=' (台)设备联网' intro-text="已联网的设备数统计。"></infor-card>
                        </Col>
                        <Col span="12" class="colSpan">
                        <infor-card id-name="equipmentLock_count" :end-val="count.equipmentLock" iconType="android-options" :color="bgBlue" textDescription=' (台)锁机设备'
                            :iconSize="bossAuthorityIconSize" :countSize="bossCountFontSizeSmall" intro-text="联网并锁机的设备数统计。"></infor-card>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12" class="colSpan">
                        <infor-card id-name="observed_count" :end-val="count.observed" iconType="android-person-add" :color="bgYellow" textDescription=' (家)观察户'
                            :iconSize="bossAuthorityIconSize" :countSize="bossCountFontSizeSmall" intro-text="当前总观察户数统计。"></infor-card>
                        </Col>
                        <Col span="12" class="colSpan">
                        <infor-card id-name="litigation_count" :end-val="count.litigation" iconType="person-stalker" :iconSize="bossAuthorityIconSize"
                            :countSize="bossCountFontSizeSmall" :color="bgRed" textDescription=' (家)法诉客户' intro-text="已诉讼客户数统计。"></infor-card>
                        </Col>
                    </Row>

                </Card>
            </Col>

            <Col :xs="24" :sm="12" :md="6">


                <Card class="layoutCard layoutCardBlue">
                    <p slot="title" class="card-title">
                        <Icon type="android-checkbox-outline"></Icon>
                        待办事项
                    </p>
                    <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                        <Icon type="plus-round"></Icon>
                    </a>
                    <Modal v-model="showAddNewTodo" title="添加新的待办事项" @on-ok="addNew" @on-cancel="cancelAdd">
                        <Row type="flex" justify="center">
                            <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
                        </Row>
                        <Row slot="footer">
                            <Button type="text" @click="cancelAdd">取消</Button>
                            <Button type="primary" @click="addNew">确定</Button>
                        </Row>
                    </Modal>
                    <div class="to-do-list-con">
                        <div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
                            <to-do-list-item :content="item.title"></to-do-list-item>
                        </div>
                    </div>

                </Card>

            </Col>

            <!-- 客户分析Echarts表； -->
            <Col :xs="24" :sm="12" :md="6">
                <Card class="layoutCard layoutCardWhite">
                    <panCake :data="customerData" :isHomePage='isHomePage'></panCake>
                </Card>
            </Col>
            <Col :xs="24" :sm="12" :md="18">
            <Card class="layoutCard layoutCardBlue">
                <customer-analysis :barWidth='barWidth' :xData="customerxData" :existingCustomer="customerExistingCustomer" :addCustomer="customerAddCustomer"
                    :customerScale="customerScale" :textSize='textSize'>
                </customer-analysis>

            </Card>
            </Col>






            <Col :xs="24" :sm="12" :md="18">
            <Card class="layoutCard layoutCardBlue">
                <observer-analysis :barWidth='barWidth' :textSize='textSize' :xData="observerxData" :allCustomer="observerCustomer" :observer="observer"
                    :averageUtilization="ObserverUtilization" :observerOur="observerOur" :observerNur="observerNur" :observerUr="observerUr">
                </observer-analysis>
            </Card>

            </Col>
            <Col :xs="24" :sm="12" :md="6">


            <Card class="layoutCard layoutCardWhite">
                <panCake :data="observerUrPie" :isHomePage='isHomePage'></panCake>

            </Card>

            </Col>
            <Col :xs="24" :sm="12" :md="9">


            <Card class="layoutCard layoutCardWhite">
                <panCake :data="litigationPie" :isHomePage='isHomePage'></panCake>
            </Card>

            </Col>
            <Col :xs="24" :sm="12" :md="15">


            <Card class="layoutCard layoutCardBlue">
                <litigation-analysis :barWidth='barWidth' :xData="litigationxData" :allCustomer="litigationAllCustomer" :litigation="litigation"
                    :textSize='textSize'>
                </litigation-analysis>
            </Card>

            </Col>




        </Row>



    </div>
</template>

<script>
    import axios from "axios";
    import countUp from "./components/countUp.vue";
    import inforCard from "./components/inforCard.vue";
    import customerAnalysis from "../components/Echarts/customerAnalysis";
    import observerAnalysis from "../components/Echarts/observerAnalysis";
    import litigationAnalysis from "../components/Echarts/litigationCustomerAnalysis";
    import Cookies from "js-cookie";
    import panCake from "@/views/components/Echarts/pancake";
    // 客户占比饼图
    import toDoListItem from "./components/toDoListItem";

    import {
        requestCloseWarning,
        requestMoveWarning,
        requestUrWarning,
        requestLinkEquipment,
        requestLockedEquipment,
        requestObserver,
        requestLitigation,
        requestCustomerAnalysis,
        requestObserverAnalysis,
        requestLitigationAnalysis
    } from "@/api/home";
    let getWaitPosition = self => {
        requestCloseWarning({}).then(res => {
            self.count.closeCustomer = Number(res.content);
        });
        requestMoveWarning({}).then(res => {
            self.count.loadEquipmentMoving = Number(res.content);
        });
        requestUrWarning({}).then(res => {
            self.count.urWarning = Number(res.content);
        });
        requestLinkEquipment({}).then(res => {
            self.count.equipmentNet = Number(res.content);
        });
        requestLockedEquipment({}).then(res => {
            self.count.equipmentLock = Number(res.content);
        });
        requestObserver({}).then(res => {
            self.count.observed = Number(res.content);
        });
        requestLitigation({}).then(res => {
            self.count.litigation = Number(res.content);
        });
        requestCustomerAnalysis({}).then(res => {
            if (res.code == 200) {
                self.count.allCustomerVal = Number(res.content.customers);
                self.count.normalLoans_total = Number(res.content.loans);
                self.count.customer_add = Number(res.content.newly_customers);
                self.count.statistics = Number(res.content.newly_loans);
                self.customerxData = [];
                self.customerExistingCustomer = [];
                self.customerAddCustomer = [];
                self.customerScale = [];
                res.content.data.forEach(v => {
                    self.customerxData.push(v.location);
                    self.customerExistingCustomer.push(v.stock);
                    self.customerAddCustomer.push(v.newly);
                    self.customerScale.push(parseInt(v.pro * 1000) / 10);
                });
            }
        });
        requestObserverAnalysis({}).then(res => {
            self.count.observeAllCustomerVal = Number(res.content.customers);
            self.count.observe_total = Number(res.content.loans);
            res.content.count.forEach(v => {
                self.observerxData.push(v.location);
                self.observer.push(v.observer);
                self.observerCustomer.push(v.normal);
                self.observerOur.push(v.our);
                self.observerUr.push(v.ur);
                self.observerNur.push(v.nur);
            });
        });
        requestLitigationAnalysis({}).then(res => {
            self.count.litigationCustomerAll = Number(res.content.customers);
            self.count.litigation_total = Number(res.content.loans);
            self.litigationxData = [];
            self.litigation = [];
            self.litigationAllCustomer = [];
            res.content.count.forEach(v => {
                self.litigationxData.push(v.location);
                self.litigation.push(v.litigation);
                self.litigationAllCustomer.push(v.total);
            });
        });
    };

    export default {
        name: "home",
        components: {
            countUp,
            inforCard,
            customerAnalysis,
            observerAnalysis,
            litigationAnalysis,
            panCake,
            toDoListItem
        },
        data() {
            return {
                isHomePage: true, //用于显示下层介绍
                showAddNewTodo: false,
                toDoList: [
                    {
                        title: "1(台)待确认设备"
                    },
                    {
                        title: "2(台)待基准定位"
                    },
                    {
                        title: "5(单)待审核锁机"
                    }
                ],
                newToDoItemValue: "",
                customerxData: [],
                customerExistingCustomer: [],
                customerAddCustomer: [],
                customerScale: [],

                observerxData: [],
                observer: [],
                observerCustomer: [],
                ObserverUtilization: [],
                observerUr: [],
                observerNur: [],
                observerOur: [],

                litigationxData: [],
                litigation: [],
                // litigationAverageUtilization:[],
                litigationAllCustomer: [],
                count: {
                    unconfirmedEquipment: 0,
                    equipmentPositioning: 0, //待基准定位
                    checkLockManage: 0,
                    checkUnlockManage: 0,
                    urWarning: 8,
                    utilization: 0, //稼动率预警
                    closeCustomer: 0, //关机预警
                    loadEquipmentMoving: 0, //位移预警
                    equipmentNet: 0, //联网设备
                    equipmentLock: 0, //锁机设备
                    observed: 0, //观察户
                    litigation: 0, //法诉客户
                    allCustomerVal: 0, //总客户数
                    normalLoans_total: 0, //总放款金额
                    customer_add: 0, //新增客户数
                    statistics: 0, //新增放款金额
                    observeAllCustomerVal: 0, //观察户数量
                    observe_total: 0, //观察户放款金额
                    litigationCustomerAll: 0, //法诉客户数量
                    litigation_total: 0 //法诉客户放款金额
                },
                iconFontSize: 60,
                bossAuthorityIconSize: 50,
                bossCountFontSize: "28px",
                bossCountFontSizeSc: "28px",
                bossCountFontSizeSmall: "28px",
                dateNow: "", //客户分析后面时间
                textColor: "white",
                barWidth: 52,
                textSize: 14,
                bgBlue: "#6fafcc",
                bgGreen: "#34bfa3",
                bgYellow: "#fec171",
                bgRed: "#F38181",
                customerData: [
                    { value: 35, name: "客户存量" },
                    { value: 5, name: "新增客户" }
                ],
                equipmentWarning: [
                    { value: 2, name: "关机预警" },
                    { value: 1, name: "位移预警设备" },
                    { value: 1, name: "稼动率预警客户" }
                ],
                observerUrPie: [
                    { value: 1, name: "观察户数" },
                    { value: 9, name: "总客户数" }
                ],
                litigationPie: [
                    { value: 3, name: "法诉客户" },
                    { value: 6, name: "总客户数" }
                ]
            };
        },
        computed: {},
        methods: {
            addNewToDoItem() {
                this.showAddNewTodo = true;
            },
            addNew() {
                if (this.newToDoItemValue.length !== 0) {
                    this.toDoList.unshift({
                        title: this.newToDoItemValue
                    });
                    setTimeout(() => {
                        this.newToDoItemValue = "";
                    }, 200);
                    this.showAddNewTodo = false;
                } else {
                    this.$Message.error("请输入待办事项内容");
                }
            },
            cancelAdd() {
                this.showAddNewTodo = false;
                this.newToDoItemValue = "";
            }
        },
        mounted() {
            let date = new Date();
            let userRole = Cookies.get("userRole");
            if (userRole == "zhang") {
                this.iconFontSize = 90;
                this.bossAuthorityIconSize = 60;
                this.bossCountFontSize = "58px";
                this.bossCountFontSizeSc = "36px";
                this.bossCountFontSizeSmall = "32px";
            }
            this.dateNow = this.$moment(date).format("YYYY年MMM"); // 一月 24日 2018, 5:56:22 下午

            getWaitPosition(this);
        }
    };
</script>

<style>
    .card_icon {
        line-height: 1.2;
    }
</style>
<style lang='less' scoped>
    @defaultblue :#6fafcc;
    @defaultgreen :#34bfa3;
    @defaultYellow: #fec171;
    @defaultred :#F38181;
    .chartsLayout {
        background-color: white;
        padding: 10px 0;
    }

    .card-title-wrap {
        i {
            transform: translateY(3px);
        }
    }

    .cardColor_blue {
        background-color: @defaultblue;
        div {
            color: white;
        }
    }

    .cardColor_green {
        background-color: @defaultgreen;
        div {
            color: white;
        }
    }

    .cardColor_yellow {
        background-color: @defaultYellow;
        div {
            color: white;
        }
    }

    .cardColor_red {
        background-color: @defaultred;
        div {
            color: white;
        }
    }
</style>