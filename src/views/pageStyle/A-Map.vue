/*
 * @Author: Hano.zhang 
 * @Date: 2018-03-19 10:50:09 
 * @Last Modified by: wangtengfei
 * @Last Modified time: 2018-03-21 09:17:46
 */

<template>
    <!-- 高德地图 -->
    <section class="page amapBox">
        <div id="container"></div>
    </section>
</template>

<script type="text/ecmascript-6">
import points from '@/libs/lookup/point';
 export default {
    components: {},

    props: {},

    data() {
        return {

        }
   
    },

    watch: {},

    methods: {
        mapInit(){
            let self=this;
            var cluster, markers = [];
            var map = new AMap.Map("container", {
                resizeEnable: true,
                center:[105,34],
                zoom: 4
            });
            for(var i=0;i<points.length;i+=1){
            markers.push(new AMap.Marker({
                position:points[i]['lnglat'],
                content: '<img src="http://api0.map.bdimg.com/images/marker_red_sprite.png">',
                    offset: new AMap.Pixel(-15,-15)
                }))
            }
            for(let i=0;i<markers.length;i++){
                AMap.event.addListener(markers[i], 'click', function() {
                    infoWindow.open(map, markers[i].getPosition());
                });
            }
            var sts = [{
                url: "http://a.amap.com/jsapi_demos/static/images/blue.png",
                size: new AMap.Size(32, 32),
                offset: new AMap.Pixel(-10, -10)
            }, {
                url: "http://a.amap.com/jsapi_demos/static/images/green.png",
                size: new AMap.Size(32, 32),
                offset: new AMap.Pixel(-16, -16)
            }, {
                url: "http://a.amap.com/jsapi_demos/static/images/orange.png",
                size: new AMap.Size(36, 36),
                offset: new AMap.Pixel(-18, -18)
            },{
                url: "http://a.amap.com/jsapi_demos/static/images/red.png",
                size: new AMap.Size(48, 48),
                offset: new AMap.Pixel(-20, -20)
            },{
                url: "http://a.amap.com/jsapi_demos/static/images/darkRed.png",
                size: new AMap.Size(48, 48),
                offset: new AMap.Pixel(-24, -24)
            }];
            cluster = new AMap.MarkerClusterer(map, markers, {
                styles: sts,
                gridSize:80
            });
            // cluster = new AMap.MarkerClusterer(map, markers,{gridSize:80});

            var title = '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>',
            content = [];
            content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里");
            content.push("电话：010-64733333");
            content.push("<a href='http://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>");

            var infoWindow = new AMap.InfoWindow({
                isCustom: true,  //使用自定义窗体
                content: self.createInfoWindow(title, content.join("<br/>"),map),
                offset: new AMap.Pixel(16, -45)
            });


 

            // var distCluster = new DistrictCluster({
            //     map: map, //所属的地图实例
            //     zIndex:11,
            //     getPosition: function(item) {
            //         if (!item) {
            //             return null;
            //         }
            //         var parts = item.split(',');
            //         //返回经纬度
            //         return [parseFloat(parts[0]), parseFloat(parts[1])];
            //     },
            //     getHoverTitle: function(dataItem, idx) {
            //         return idx + ': ' + dataItem;
            //     },
            //     renderOptions: {
            //         //显示在所辖数据点的平均位置
            //         getClusterMarkerPosition: DistrictCluster.ClusterMarkerPositionStrategy.AVERAGE_POINTS_POSITION,
            //         getClusterMarker: function(feature, dataItems, recycledMarker) {
            //             //label内容
            //             var content =feature.properties.name+' ('+dataItems.length+')';
            //             var label = {
            //                 offset: new AMap.Pixel(16, 18), //修改label相对于marker的位置
            //                 content: content
            //             };
            //             //存在可回收利用的marker
            //             if (recycledMarker) {
            //                 //直接更新内容返回
            //                 recycledMarker.setLabel(label);
            //                 return recycledMarker;
            //             }
            //             //返回一个新的Marker
            //             return new AMap.Marker({
            //                 label: label
            //             });
            //         }
            //     }
            // });

            // window.distCluster = distCluster;
            // $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body);
            // $.get('http://a.amap.com/amap-ui/static/data/10w.txt', function(csv) {
            //     $('#loadingTip').remove();
            //     var data = csv.split('\n');
            //     distCluster.setData(data);
            // });
        },
        createInfoWindow(title, content,map) {
            var info = document.createElement("div");
            info.className = "info";

            //可以通过下面的方式修改自定义窗体的宽高
            //info.style.width = "400px";
            // 定义顶部标题
            var top = document.createElement("div");
            var titleD = document.createElement("div");
            var closeX = document.createElement("img");
            top.className = "info-top";
            titleD.innerHTML = title;
            closeX.src = "http://webapi.amap.com/images/close2.gif";
            closeX.onclick =()=>map.clearInfoWindow()

            top.appendChild(titleD);
            top.appendChild(closeX);
            info.appendChild(top);

            // 定义中部内容
            var middle = document.createElement("div");
            middle.className = "info-middle";
            middle.style.backgroundColor = 'white';
            middle.innerHTML = content;
            info.appendChild(middle);

            // 定义底部内容
            var bottom = document.createElement("div");
            bottom.className = "info-bottom";
            bottom.style.position = 'relative';
            bottom.style.top = '0px';
            bottom.style.margin = '0 auto';
            var sharp = document.createElement("img");
            sharp.src = "http://webapi.amap.com/images/sharp.png";
            bottom.appendChild(sharp);
            info.appendChild(bottom);
            return info;
        },

    },

    mounted() {
        // let self=this;
        // AMapUI.load(['ui/geo/DistrictCluster', 'lib/$'], function(DistrictCluster, $) {
        // window.DistrictCluster = DistrictCluster;
        // //启动页面
        // self.mapInit(DistrictCluster, $);
        // });
        this.mapInit()
    },

 }
</script>

<style  lang='less' scoped>
    #container{
        width:80%;
        height:460px;
        margin:15px 0 0 20px;
    }
</style>
<style lang="less">
    .amapBox{
        .info {
        border: solid 1px silver;
        }
        div.info-top {
            position: relative;
            background: none repeat scroll 0 0 #F9F9F9;
            border-bottom: 1px solid #CCC;
            border-radius: 5px 5px 0 0;
        }
        div.info-top div {
            display: inline-block;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
            line-height: 31px;
            padding: 0 10px;
        }
        div.info-top img {
            position: absolute;
            top: 10px;
            right: 10px;
            transition-duration: 0.25s;
        }
        div.info-top img:hover {
            box-shadow: 0px 0px 5px #000;
        }
        div.info-middle {
            font-size: 12px;
            padding: 6px;
            line-height: 20px;
        }
        div.info-bottom {
            height: 0px;
            width: 100%;
            clear: both;
            text-align: center;
        }
        div.info-bottom img {
            position: relative;
            z-index: 104;
        }
        span {
            margin-left: 5px;
            font-size: 11px;
        }
        .info-middle img {
            float: left;
            margin-right: 6px;
        }
    }
    
</style>



