<template>
    <!-- 高德地图 -->
    <div class="amap-box">
        <!-- 操作框 Start -->
        <div class="operate-box">
            <Row>
                <Col span="22" offset="1">
                    <Select v-model="formValidate.province" @on-change="provinceChange" filterable clearable placeholder="请选择省份" style="text-align:'center'">
                        <Option v-for="(item, index) of provinceArr" :value="item.label" :key="index">{{item.label}}</Option>
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col span="22" offset="1">
                    <Input v-model="formValidate.keyword" placeholder="按公司名查找">
                        <Button slot="append" icon="ios-search"></Button>
                    </Input>
                    
                </Col>
            </Row>
            
            <ul class="operate-bottom" >
                <li v-for="(item, index) in operateLiArr" :key="index" :style="{backgroundColor: item.bgColor}">
                    <div class="icon-wrap" :style="{backgroundColor: item.icon.bgColor}"><Icon :size="item.icon.size" :type="item.icon.type" :color="item.icon.color"></Icon></div>
                    <div class="content" >{{item.label}}<span>{{item.data}}</span>台</div>
                </li>
                <li class="btn-query"><Button type="primary" @click="devSearchModal=true">设备查询</Button></li>
            </ul>
        </div>
        <!-- 操作框 End -->


        <!-- 地图容器 Start -->
        <div id="map-container"></div>
        <!-- 地图容器 End -->

        <!-- 标注详情 Start -->
        <Modal v-model="showInfo" width="953px">
			<header slot="header" style="text-align:left;font-size:15px;">
                设备详情
			</header>
                
           

            <Tabs >
                <TabPane label="当前状态">
                    <Form  :label-width="80">
                        <Row>
                            <Col span="10"  offset="1">
                            <!-- 设备编号：{{data.identification}} -->
                            <FormItem label="设备编号" >
                                <Input  :maxlength=30 v-model="data.identification"></Input>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1">
                            <!-- 设备地址：{{data.locationAddress?data.locationAddress : '--'}} -->
                            <FormItem label="设备地址" >
                                <Input  :maxlength=30 v-model="data.locationAddress"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10" offset="1">
                            <!-- 设备状态:{{data.status?data.status : '--'}} -->
                            <FormItem label="设备状态" >
                                <Input  :maxlength=30 value="正常"></Input>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1">
                            <!-- IMEI:{{equipCoordinates}} -->
                            <FormItem label="IMEI" >
                                <Input  :maxlength=30 v-model="equipCoordinates"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>

                <TabPane label="通讯信息">
                    <Form  :label-width="80">
                        <Row>
                            <Col span="10"  offset="1">
                            <!-- 设备编号：{{data.identification}} -->
                            <FormItem label="设备编号" >
                                <Input  :maxlength=30 v-model="data.identification"></Input>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1">
                            <!-- 设备地址：{{data.locationAddress?data.locationAddress : '--'}} -->
                            <FormItem label="设备地址" >
                                <Input  :maxlength=30 v-model="data.locationAddress"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10" offset="1">
                            <!-- 设备状态:{{data.status?data.status : '--'}} -->
                            <FormItem label="设备状态" >
                                <Input  :maxlength=30 value="正常"></Input>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1">
                            <!-- IMEI:{{equipCoordinates}} -->
                            <FormItem label="IMEI" >
                                <Input  :maxlength=30 v-model="equipCoordinates"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>

                <TabPane label="设备信息">
                    <Form  :label-width="80">
                        <Row>
                            <Col span="10"  offset="1">
                            <!-- 设备编号：{{data.identification}} -->
                            <FormItem label="设备编号" >
                                <Input  :maxlength=30 v-model="data.identification"></Input>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1">
                            <!-- 设备地址：{{data.locationAddress?data.locationAddress : '--'}} -->
                            <FormItem label="设备地址" >
                                <Input  :maxlength=30 v-model="data.locationAddress"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="10" offset="1">
                            <!-- 设备状态:{{data.status?data.status : '--'}} -->
                            <FormItem label="设备状态" >
                                <Input  :maxlength=30 value="正常"></Input>
                            </FormItem>
                            </Col>
                            <Col span="10" offset="1">
                            <!-- IMEI:{{equipCoordinates}} -->
                            <FormItem label="IMEI" >
                                <Input  :maxlength=30 v-model="equipCoordinates"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>

            </Tabs>

        </Modal>


        <!-- <div class="dev-info" v-show="showInfo">
            <div class="close" @click="showInfo=false">
                    <span>X</span>
                </div>
            <div class="top-header">
                <div class="top-title">设备信息</div>
            </div>
            
            <div class="left-side">
                <ul>
                    <li @click="toggleLi={firstLi:true,secondLi:false,thirdLi:false};" :class="{'li-active':toggleLi.firstLi}">
                        当前状态 
                    </li>
                    <li @click="toggleLi={firstLi:false,secondLi:true,thirdLi:false};" :class="{'li-active':toggleLi.secondLi}">
                        通讯信息
                    </li>
                    <li @click="toggleLi={firstLi:false,secondLi:false,thirdLi:true};" :class="{'li-active':toggleLi.thirdLi}">
                        设备信息
                    </li>
                </ul>
            </div>
            
            <div class="center-side">
                <div class="center-bar" :class="{active1:toggleLi.firstLi, active2:toggleLi.secondLi, active3:toggleLi.thirdLi}">
                </div>
            </div>

            <div class="right-side">
                <div v-show="toggleLi.firstLi">
                    1
                    <p>设备编号：{{data.identification}}</p>
                    <p>设备地址：{{data.locationAddress}}</p>
                    <p>设备状态：正常</p>
                    <p>设备坐标：{{data.wgLon}}, {{data.wgLat}}</p>
                </div>

                <div v-show="toggleLi.secondLi">
                    2
                    <p>设备编号：{{data.identification}}</p>
                    <p>设备地址：{{data.locationAddress}}</p>
                    <p>设备状态：正常</p>
                    <p>设备坐标：{{data.wgLon}}, {{data.wgLat}}</p>
                </div>

                <div v-show="toggleLi.thirdLi">
                    3
                </div>
            </div>
        </div> -->
        <!-- 标注详情 End -->


        <!-- 设备查询 -->
        <Modal v-model="devSearchModal" width="953px">
			<header slot="header" style="text-align:left;font-size:15px;">
                设备查询
			</header>
                
            <Form  :label-width="60">
                <Row>
                    <Col span="10" >
                    <FormItem label="ICCID" >
                        <Input  :maxlength=30 placeholder="请输入ICCID"></Input>
                    </FormItem>
                    
                    </Col>
                    <Col span="10" offset="1">
                        <Button type="primary">查询</Button>
                    </Col>
                </Row>
            
            </Form>

            	<Tabs >
                    <TabPane label="基本信息">
                        <Form  :label-width="140">
                            <Row>
                                <Col span="10" offset="1">
                                <FormItem label="客户" >
                                    <Input  :maxlength=30 ></Input>
                                </FormItem>
                                </Col>
                                <Col span="10" offset="1">
                                <FormItem label="最终用户" >
                                    <Input  :maxlength=30 ></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                <FormItem label="ICCID" >
                                    <Input  :maxlength=30 ></Input>
                                </FormItem>
                                </Col>
                                <Col span="10" offset="1">
                                <FormItem label="IMEI" >
                                    <Input  :maxlength=30 ></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                <FormItem label="IMSI" >
                                    <Input  :maxlength=30 ></Input>
                                </FormItem>
                                </Col>
                                <Col span="10" offset="1">
                                <FormItem label="MSISDN" >
                                    <Input  :maxlength=30 ></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                <FormItem label="IP地址" >
                                    <Input  :maxlength=30 ></Input>
                                </FormItem>
                                </Col>
                                <Col span="10" offset="1">
                                <FormItem label="SIM卡状态" >
                                    <Input  :maxlength=30 ></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                <FormItem label="激活时间" >
                                    <Input  :maxlength=30 ></Input>
                                </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </TabPane>
                    <TabPane label="用量信息">
                        <Form  :label-width="140">
                            <Row>
                                <Col span="10" offset="1">
                                <FormItem label="套餐计划" >
                                    <Input  :maxlength=30 ></Input>
                                </FormItem>
                                </Col>
                                <Col span="10" offset="1">
                                <FormItem label="通信计划" >
                                    <Input  :maxlength=30 ></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                <FormItem label="月使用量(M)" >
                                    <Input  :maxlength=30 ></Input>
                                </FormItem>
                                </Col>
                                <Col span="10" offset="1">
                                <FormItem label="是否到达使用量限额" >
                                    <Input  :maxlength=30 ></Input>
                                </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </TabPane>
                </Tabs>

        </Modal>
        <!-- 设备查询 End -->

    </div>
</template>

<script>
import points from "@/libs/lookup/point.js";
import areaList from "@/libs/lookup/city";
import clusterSafeIcon from "@/images/cluster-safe.png"; //聚合图标
import clusterWarnIcon from "@/images/cluster-warn.png"; //聚合图标
import markerSafeIcon from "@/images/marker-safe.png"; //单个点标注图标
import markerWarnIcon from "@/images/marker-warn.png"; //单个点标注图标
import { queryEquipLocations, updateEquipLocations } from "@/api/map/equip-location";

let queryAction = (self) =>  {
    self.showInfo = false;
    return new Promise((resolve, reject) => {
        queryEquipLocations(self.queryParam).then(response => {
            if(response.code == 200) {
                self.listData = response.content;
                self.mapInit(self.queryParam.province);
            } else {
                self.mapInit(self.queryParam.province);
                self.$Message.error('查询失败');
            }
            resolve();
        })
        .catch(error => {
            self.$Message.error('查询失败');
            reject(error);
        })
    })
};

// name: "equip-locations",
export default {
  name: "equip-locations",
  computed: {
      equipCoordinates: function() {//设备坐标
          return this.data.wgLon + ',' + this.data.wgLat;
      }
  },
  data() {
    return {
        formValidate: {
            province: "",
            keyword: ""
        },
        provinceArr: areaList, //省列表数据
        showInfo: false, //点击标注marker显示信息窗口
        operateLiArr: [//
            {
                label: '设备联网',
                data: 3980,
                bgColor: '#fff',
                icon: {
                    bgColor: '#fff',
                    color: '#34bfa3',
                    type: 'wifi',
                    size: 30
                },
            },
            {
                label: '有效数据',
                data: 3950,
                bgColor: '#fff',
                icon: {
                    bgColor: '#fff',
                    color: '#6fafcc',
                    type: 'android-send',
                    size: 30
                },
            },
            {
                label: '采集数据',
                data: 3980,
                bgColor: '#fff',
                icon: {
                    bgColor: '#fff',
                    color: '#fec171',
                    type: 'ios-pulse-strong',
                    size: 30
                },
            },
            {
                label: '信息丢失',
                data: 3980,
                bgColor: '#fff',
                icon: {
                    bgColor: '#fff',
                    color: '#F38181',
                    type: 'android-warning',
                    size: 30
                },
            },
        ],
        toggleLi: {
            firstLi: true,
            secondLi: false,
            thirdLi: false
        },
        queryParam: {   //分页查询参数                 
            companyName: '',
            province: '',
            searchType: ''
        },
        listData:[], //查询数据集合
        data: {
            
        }, //点击时单个数据
        modal_loading: false,
        colors:{
            bgBlue:"#6fafcc",
            bgGreen:"#34bfa3",
            bgYellow:"#fec171",
            bgRed:"#F38181"
        },
        devSearchModal: false,
        devSearchData: {

        }
        
    };
  },
  methods: {
    mapInit(provinceName) {
        var self = this;
        var cluster; //聚合
        var markers = []; //标注集合
        var district; //地区查询对象
        var polygons = []; //绘制边界 数据集合

        var map = new AMap.Map("map-container", {
            resizeEnable: true,
            // center: [120.722045, 31.320614],
            center: [118.762765,32.060875],
            zoom: 4
        });
        //绘制边界
        if (provinceName) {
            this.drawDistrictBoundaries(map, district, polygons, provinceName);
        }
        

        //添加标注marker,注册点击事件
        this.listData.forEach((item, index, arr) => {
            let markericon = markerSafeIcon;    
            //可以在这里判断是否警告，然后渲染单个背景颜色
            // if (index % 5 == 0) {
            //     markericon = markerWarnIcon;
            // } 
            let single_marker = new AMap.Marker({
                // position: this.listData[index]["lnglat"],
                position: [item.wgLon, item.wgLat],
                content: `<img src="${markericon}">`,
                offset: new AMap.Pixel(-15, -15)
            });
            AMap.event.addListener(single_marker, "click", () => {
                // infoWindow.open(map, single_marker.getPosition());
                this.showInfo = true;
                this.data = item;
            });
            markers.push(single_marker);
        });
        
        let count = markers.length;
        //自定义图标
        let _renderCluserMarker = function(context) {
            
            let div = document.createElement("div");
            let size = Math.round(40 + Math.pow(context.count / count, 1 / 5) * 30);
            let backgroundImage = `url(${clusterSafeIcon})`;
            div.style.backgroundImage = backgroundImage;
            div.style.width = size + "px";
            div.style.height = size + "px";
            div.style.lineHeight = size + "px";
            div.style.backgroundPosition = "center";
            div.style.backgroundSize = "cover";
            div.innerHTML = context.count;
            div.style.fontSize = "12px";
            div.style.color = "#000";
            div.style.textAlign = "center";
            div.style.cursor = "pointer";

            context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
            context.marker.setContent(div);
        };

        cluster = new AMap.MarkerClusterer(map, markers, {
            gridSize: 80,
            renderCluserMarker: _renderCluserMarker
        });
        map.setFitView();
    },
    provinceChange(val) { //省份改变事件
        this.queryParam.province = val;
        this.mapInit(this.queryParam.province)
        // this.getListData();
    },
    getListData() { //查询数据集合
        queryAction(this);
    },
    drawDistrictBoundaries(map, district, polygons, name) { //绘制省份边界
        let opts = {
            subdistrict: 1,   //返回下一级行政区
            extensions: 'all',  //返回行政区边界坐标组等具体信息
            level: 'province'  //查询行政级别为 省 province 市 city 
        };
        district = new AMap.DistrictSearch(opts);
        // district.setLevel('province');
        district.search(name, function(status, result) {
            polygons.forEach((val, index, arr) => {
                val.setMap(null);
            });
            let bounds = result.districtList[0].boundaries;
            polygons = [];
            if (bounds) {
                bounds.forEach((val, index, arr) => {
                    //生成行政区划polygon
                    let polygon = new AMap.Polygon({
                        map: map,
                        strokeWeight: 3,
                        path: val,
                        fillOpacity: 0,
                        fillColor: '#fff',
                        strokeColor: 'green'
                    });
                    polygons.push(polygon);
                });
                map.setFitView();//地图自适应
            }
        });
    }
  },
  mounted() {
    this.getListData();
    this.mapInit()
  }
};

</script>
<style lang="less" scoped>
@import "../../styles/searchAndOperate.less";
@orange: #e74c3c;
@blue: #2d8cf0;


.amap-box {
    .info {
        border: 1px solid #ccc;
        width: 200px;
        height: 200px;
    }

    // position: relative;
    #map-container {
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 98%;
        height: 96%;
        border: 1px solid #ccc;
        box-shadow: 0px 0px 10px 2px #aaa;
    }

    .operate-box {
        // color: #000;
        box-shadow: 0px 0px 10px 1px #57a3f3;
        border-radius: 6px;
        width: 200px;
        // height: 260px;
        position: absolute;
        right: 30px;
        top: 30px;
        background-color: #fff;
        border: 1px solid #e9eaec;
        z-index: 2;
        .ivu-row {
            margin-top: 10px;
        }
        .sub-box {
            height: 20px;
            border-top: 1px solid #ccc;
        }
        .ivu-input-group-append .ivu-btn {
            background-color: #2d8cf0;
            color: #fff;
            border-radius: 0px 4px 4px 0;
        }
        ul.operate-bottom {
            // ul {
                margin-top: 10px;
                // position: absolute;
                // bottom: 0px;
                // left: 0px;
                // height: 160px;
                // border: 1px solid #000;
                list-style: none;

                li {
                    box-sizing: content-box;
                    line-height: 40px;
                    font-size: 14px;
                    height: 40px;
                    width: 100%;
                    text-align: center;
                    border-top: 1px solid #ccc;
                    cursor: pointer;
                    &:hover {
                        .content{
                            // background-color: @blue;
                            background-color: inherit;
                            // color: #fff;
                            // color: #fff;
                        }
                    }
                    
                    .icon-wrap {
                        height: 40px;
                        float: left;
                        width: 50px;
                        color: #fff;
                        text-align: center;
                        i {
                            line-height: 40px;
                            height: 100%;
                            width: 100%;
                        }
                    }
                    .content {
                        margin-left: 40px; 
                        text-align: left;
                        background-color: #fff;
                    }
                    span {
                        // color: red;
                        padding: 5px;
                        text-align: center;
                        font-size: 16px;
                        font-weight: 900;
                    }
                }
            // }
        }
    }

    .dev-info {
        position: absolute;
        background-color: #fff;
        width: 60%;
        height: 60%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 4;
        border-radius: 6px;
        padding: 50px 0 0 0;
        display: flex;
        justify-content: center;
        align-items: center;


        .close {
            width: 35px;
            height: 50px;
            line-height: 50px;
            position: absolute;
            right: 0;
            top: 0;
            color: #999;
            z-index: 2;
            // background-color: @blue;
            cursor: pointer;
            &:hover {
                // background-color: @blue;
                span {
                    color: #000;
                    
                }
            }
            span {
                display: inline-block;
                height: 100%;
                width: 100%;
                line-height: 50px;
                text-align: center;
            }
        }
        .top-header {
            position: absolute;
            width: 100%;
            height: 50px;
            top: 0;
            left: 0;
            padding: 15px 15px;
            border-bottom: 1px solid #e9eaec;
            color: #1c2438;
            
            .top-title {
                float: left;
                height: 20px;
                line-height: 20px;
                color: #1c2438;
                font-weight: 700;
                white-space: nowrap;
                overflow: hidden;
                font-size: 14px;
            }
            
        }



        .left-side {
            width: 150px;
            height: 100%;
            // float: left;
            display: flex;
            justify-content: left;
            align-items: center;
            ul,
            li {
                margin: 0;
                padding: 0;
                list-style: none;
                text-align: center;
                display: flex;
            }
            ul {
                // border-right: 2px solid #ccc;
                width: 100%;
                height: 70%;
                flex-direction: column;
                justify-content: space-around;
                align-items: stretch;
                padding-right: 2px;
            }
            .li-active {
                color: #333333;
                // border-right: 6px solid @blue;
                // margin-right: -6px;
            }

            li {
                flex-grow: 1;
                font-size: 16px;
                color: rgba(51, 51, 51, 0.5);
                justify-content: center;
                align-items: center;
                cursor: pointer;
                &:hover {
                    // margin-right: -6px;
                    // border-right: 6px solid @blue;
                    color: #333333;
                    // transition: all 0.4s ease-in-out;
                }
                &::selection {
                    background-color: inherit;
                }
            }
        }
        .center-side {
            position: relative;
            height: 70%;
            width: 2px;
            background-color: #ccc;

            .center-bar {
                background-color: @blue;
                position: absolute;
                width: 6px;
                // background-color: pink;
                height: 100% / 3;
                left: -2px;
                top:0;
                transition: top 0.4s ease-in-out;
            }
            .active1 {
                
            
            }
            .active2 {
                top: 100% / 3;

            }
            .active3 {
                top: 100% * 2 /3;

            }
        }
        .right-side {
            margin-left: 15px;
            width: 100%;
            flex-grow: 7;
            height: 100%;
            & > div {
                transition: all 0.4 ease-in-out;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: space-around;
            }
        }
    }

    .dev-search {
        position: absolute;
        background-color: #fff;
        width: 60%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 4;
        border-radius: 6px;
        .portlet-title {
            .close {
                float: right;
                margin-right: 15px;
                color: #999;
                cursor: pointer;
                &:hover {
                    color: #333;
                }
            }
        }
    }

}
</style>
