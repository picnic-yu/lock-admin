<template lang="html">
    <section class="page">
        <section class='count-wrap'>
            <Row :gutter='30'>
                <Col span="5" class='count-item'>
                    <div class='title'>锁具总数</div>
                    <div class='count'>{{recordCount.lockCount}}</div>
                </Col>
                <Col span="5" class='count-item'>
                    <div class='title'>用户总数</div>
                    <div class='count'>{{recordCount.userCount}}</div>
                </Col>
                <Col span="5" class='count-item'>
                    <div class='title'>累计开锁次数</div>
                    <div class='count'>{{recordCount.unlockCount}}</div>
                </Col>
                 <Col span="5" class='count-item'>
                    <div class='title'>累计授权次数</div>
                    <div class='count'>{{recordCount.authCount}}</div>
                </Col>
                <Col span="4" class='count-item'>
                    <div class='title'>30天活跃锁数</div>
                    <div class='count'>{{recordCount.activeCount}}</div>
                </Col>
            </Row>
        </section>
        <section>
            <Row :gutter='30'>
                <Col span="16">
                    <!-- 高德地图 -->
                    <div class="amap-box chart-mask">
                        <!-- 地图容器 Start -->
                        <div id="map-container"></div>
                        <!-- 地图容器 End -->
                        <Spin :fix='true' v-show='isLoading'>
                            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                            <div>Loading</div>
                        </Spin>
                    </div>
                </Col>
                <Col span="8" class="org_lock">
                        <zk-table
                        ref="table"
                        sum-text="sum"
                        index-text="#"
                        :data="treeData"
                        :columns="columns"
                        :stripe="props.stripe"
                        :border="props.border"
                        :show-header="props.showHeader"
                        :show-summary="props.showSummary"
                        :show-row-hover="props.showRowHover"
                        :show-index="props.showIndex"
                        :tree-type="props.treeType"
                        :is-fold="props.isFold"
                        :expand-type="props.expandType"
                        :selection-type="props.selectionType">
                    </zk-table>
                    <Spin :fix='true' v-show='isLoading'>
                        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                        <div>Loading</div>
                    </Spin>
                </Col>
            </Row>
			</section>
    </section>
    
</template>

<script>
import Vue from 'vue'
import ZkTable from 'vue-table-with-tree-grid'
import buttonGroup from '@/views/components/button-group/index.vue';
Vue.component(ZkTable.name, ZkTable);
import { getTotal,getOrgTree,getOrgLockMap } from '@/api/home/index';
import markerSafeIcon from "@/images/point_green.png";      //单个点标注图标-安全
import markerWarnIcon from "@/images/marker-warn.png";      //单个点标注图标-警告
import clusterSafeIcon from "@/images/cluster-safe.png";    //聚合图标-安全
import clusterWarnIcon from "@/images/cluster-warn.png";    //聚合图标-警告
import "../../styles/map.less";

const getIndexTotal=function(self){
    getTotal().then(res=>{
        if(res.code == 200){
            self.recordCount = res.content;
        }
    }).catch(()=>{
        
    })
}

const getLockMap=function(self){
    if (!self.queryParam.organizationInfoCode) {
        self.queryParam.organizationInfoCode = "0001";
        }
    getOrgLockMap({ "organizationInfoCode": self.queryParam.organizationInfoCode }).then(response=>{
        if (response.code == 200) {
                self.listData = response.content || [];
            } else {
                self.$Message.error('查询失败');
            }
        self.mapInit();
        self.isLoading = false;
        resolve();
    }).catch(()=>{
        
    })
}
// 查询组织树
const queryOrganizationAction = (self) => {
	self.isLoading = true;
	return new Promise((resolve, reject) => {
		getOrgTree().then(response => {
			if(response.code == 200){
				self.treeData = [response.content]
			}
			resolve();
			self.isLoading = false;
		}).catch(error => {
			reject(error);
			self.isLoading = false;
		})
	})
};
export default {
    name: 'org-tree',
    computed: {
        equipCoordinates: function() {//设备坐标
            return this.data.wgLon + ',' + this.data.wgLat;
        }
    },
	data() {
		return {
			props: {
				stripe: false,
				border: false,
				showHeader: true,
				showSummary: false,
				showRowHover: true,
				showIndex: false,
				treeType: true,
				isFold: true,
				expandType: false,
				selectionType: false,
            },
            recordCount:{
                lockCount:0,//锁具数
                userCount:0,//用户数
                unlockCount:0,//开锁次数
                authCount:0,//授权次数
                activeCount:0//活跃统计
            },
            treeData: [],
            listData:[],                 //查询数据集合
            organizationData:{},
			isLoading:false,
			treeData: [],
			columns: [
				{
					label: '地区',
					prop: 'organizationName',
					width: '200px',
				},
				{
					label: '设备数量',
                    prop: 'lockCount'
				}
            ],
            queryParam: {                    
                organizationInfoCode: '0001',            //省份
            },
			formTreeData: {},
			selectDataItem: {}
		};
	},
	computed: {
		propList() {
			return Object.keys(this.props).map(item => ({
				name: item,
			}));
		},
	},
	mounted(){
        this.mapInit();
		this.init();
	},
	methods: {
        
		init(){
            this.getIndexTotal();
            this.selectTree();
            this.lockMap();
		},
        getIndexTotal(){
            getIndexTotal(this);
        },
        selectTree(){
            queryOrganizationAction(this);
        },
        lockMap(){
            Object.assign(this.queryParam, this.formValidate);
            getLockMap(this);
        },
        //地图初始化
        mapInit() {
            this.isLoading = true;
            let provinceName = '';
            let cluster;            //聚合
            let markers = [];       //标注集合
            let district;           //地区查询对象
            let polygons = [];      //绘制边界 数据集合
            let massMarkers = [];   //麻点数据
            let mass = {};          //麻点对象
            let lastZoom = 4;       //上一次的地图缩放比
            let pointSimplifierIns = {} ; // 海量点
            let pointSimplifierInsData = []; // 海量点数据
            //地图
            let map = new AMap.Map("map-container", {
                resizeEnable: true,
                zoom: 4
            });

            AMapUI.loadUI(['control/BasicControl'], function(BasicControl) {
                //添加一个缩放控件
                map.addControl(new BasicControl.Zoom({
                    position: 'rb'
                }));
            });

            //绘制边界
            if (provinceName) {
                this.drawDistrictBoundaries(map, district, polygons, provinceName);
            }

            //添加标注marker,注册点击事件
            this.listData.forEach((item, index, arr) => {
                if (item && item.lon && item.lat) { 
                    //添加麻点数据
                    massMarkers.push({
                        lnglat: [item.lon, item.lat],
                        content: item
                    });

                    // 添加海量点数据
                    pointSimplifierInsData.push(item);
                    let markericon = markerSafeIcon;    
                    let single_marker = new AMap.Marker({
                        zIndex: 110,
                        position: [item.lon, item.lat],
                        content: `<div style="width: 18px; height: 18px; background-color: #59e432; border-radius: 50%; border:1px solid rgba(0,0,0,0.3)">`,
                        offset: new AMap.Pixel(-15, -15)
                    });
                    AMap.event.addListener(single_marker, "click", () => {
                        this.showInfo = true;
                        item.equipmentNumber = new String(item.equipmentNumber);
                        this.data = item;
                        //弹窗标签页设置为第一页
                        this.currInfoTab = 'pg1';
                        //重置标签页的加载和隐藏
                        this.resetTabs(this.currInfoTab, this.infoTabs, true);
                    });
                    markers.push(single_marker);
                }
            });
            
            AMapUI.load(['ui/misc/PointSimplifier', 'lib/$'], (PointSimplifier, $) => {
                if (!PointSimplifier.supportCanvas) {
                    alert('当前环境不支持 Canvas！');
                    return;
                }

                pointSimplifierIns = new PointSimplifier({
                    zIndex: 100,
                    map: map, //所属的地图实例
                    autoSetFitView: false,
                    getPosition: function(item) {
                        //返回经纬度
                        if (item && item.wgLon && item.wgLat) {
                            return [item.wgLon, item.wgLat];
                        } else {
                            return null;
                        }
                    },
                    getHoverTitle: function(dataItem, idx) {
                        return null;
                    },
                    renderOptions: {
                        //点的样式
                        pointStyle: {
                            content: "circle",
                            width: 18,
                            height: 18,
                            fillStyle: "#59e432",
                            lineWidth: 1,
                            strokeStyle: "rgba(0,0,0,0.3)"
                        },
                        pointHoverStyle: {
                            width: 0,
                            height: 0,
                            lineWidth: 0,
                        },
                    }
                });
                pointSimplifierIns.on('pointClick ', (e, item) => {
                    this.showInfo = true;
                    item.data.equipmentNumber = new String(item.data.equipmentNumber);
                    this.data = item.data;
                    //弹窗标签页设置为第一页
                    this.currInfoTab = 'pg1';
                    //重置标签页的加载和隐藏
                    this.resetTabs(this.currInfoTab, this.infoTabs, true);
                });

                // 监听地图缩放
                map.on('zoomchange', (e) => {
                    if (map.getZoom() >= 18) {
                        // 麻点图显示     
                        cluster.clearMarkers();
                        if (pointSimplifierIns && pointSimplifierIns._data ) {
                            pointSimplifierIns.show();
                        } else {
                            pointSimplifierIns.setData(pointSimplifierInsData);
                        }
                        // mass.show();
                        // pointSimplifierIns.setData(this.listData);
                    } else {
                        if (lastZoom >=18) {
                            // 聚合图显示
                            cluster.setMarkers(markers);
                            // mass.hide();
                            // pointSimplifierIns.setData([]);
                            if (pointSimplifierIns) {
                                pointSimplifierIns.hide();
                            }
                        }
                    }
                    lastZoom = map.getZoom();
                });

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
            //聚合
            cluster = new AMap.MarkerClusterer(map, markers, {
                gridSize: 80,
                renderCluserMarker: _renderCluserMarker,
                minClusterSize: 2,
                zoomOnClick: true
            });
            this.isLoading = false;
        },
        drawDistrictBoundaries(map, district, polygons, name) { //绘制省份边界
            let opts = {
                subdistrict: 1,     //返回下一级行政区
                extensions: 'all',  //返回行政区边界坐标组等具体信息
                level: 'province'   //查询行政级别为 省 province 市 city 
            };
            //地区查询
            district = new AMap.DistrictSearch(opts);
            district.search(name, function(status, result) {
                polygons.forEach((val, index, arr) => {
                    val.setMap(null);
                });
                //边界数据集合
                let bounds = result.districtList.find((val) => {
                    return val.level == 'province';
                }).boundaries;
                polygons = [];
                if (bounds) {
                    bounds.forEach((val, index, arr) => {
                        //生成行政区划polygon
                        let polygon = new AMap.Polygon({
                            map: map,
                            strokeWeight: 2,
                            path: val,
                            fillOpacity: 0,
                            fillColor: '#fff',
                            strokeColor: '#34bfa3'
                        });
                        polygons.push(polygon);
                    });
                    //地图自适应
                    map.setFitView();
                }
            });
        },
	},
	components: {
		buttonGroup
	},
};
</script>

<style lang='less'>
		.control-group {
		height: 55px;
		.error_text {
			color: red;
			padding-left: 110px;
		}
	}
	
	.dec {
		display: inline-block;
		vertical-align: middle;
		width: 90px;
		text-align: right;
		height: 25px;
		line-height: 25px;
		font-size: 14px;
		margin-right: 10px;
		.symbol{
			color:red;
		}
	}
	.ivu-tabs-bar{
		margin-bottom: 0;
	}
	.ivu-modal-body{
		/*height:300px;*/
	}
</style>


<style lang='less' scoped>
    .count-wrap{
        background: #FFF;
        margin-bottom:20px;
        .count-item{
            height:60px;
            margin:10px 0; 
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

<style lang='less'>
	.iview-tree-wrap{
		padding:10px 30px;
		border: 1px solid #e6e6e6;
		border-radius: 10px;
		min-height:300px;
		background: #fff;
	}
</style>

<style lang="less" scoped>

//右侧操作框 li
div.amap-box {
    .operate-box {
        ul.operate-bottom {
            li:nth-child(2) {
                .icon-wrap {
                    color: transparent;
                }
                &:hover {
                    background-color: transparent;
                    color: transparent;
                }
            }
        }
    }
}
.org_lock{
    float: right;
}
div.amap-box #map-container{
    margin-top:1px;
    height: 400px;
}

</style>