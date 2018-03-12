<template>
  <div id="allmap" style="width:100%;height:100%"></div>
</template>

<script>
  // import BMap from 'BMap';
  // import { MP } from './map'

  export default {
    props: {
      // 父组件传值
      // 定义经度
      longitude: {
        type: Number,
        default: 116.480967
      },
      // 定义纬度
      latitude: {
        type: Number,
        default: 39.913285
      }
    },
    data () {
      return {
        data_info: [
          [116.417854, 39.921988, '乐天银泰百货八层', '地址：北京市东城区王府井大街88号乐天银泰百货八层', 1],
          [116.406605, 39.921585, '东华门大街', '地址：北京市东城区东华门大街', 0],
          [116.412222, 39.912345, '正义路甲5号', '地址：北京市东城区正义路甲5号', 0]
        ]
      }
    },
    mounted () {
      // 创建Map实例
      var map = new BMap.Map('allmap')
      // 添加平移缩放控件
      map.addControl(new BMap.NavigationControl())
      // 添加比例尺控件 anchor: BMAP_ANCHOR_TOP_RIGHT 位置为右上角
      map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_RIGHT}))
      // 添加缩略地图控件 
      map.addControl(new BMap.OverviewMapControl())
      // 启用滚轮缩放大小
      map.enableScrollWheelZoom()

      // 设置地图主题 此主题为 midnight 午夜蓝
      // var mapStyle={ style : "midnight" }  
      // map.setMapStyle(mapStyle);
      // 初始化地图,设置中心点坐标和地图级别
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 15)

      var size = new BMap.Size(80, 20)
      map.addControl(new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size,
        // 切换城市之间事件
        // onChangeBefore: function(){
        //    alert('before');
        // },
        // 切换城市之后事件
        // onChangeAfter:function(){
        //   alert('after');
        // }
      }))
      // var point = new BMap.Point(this.longitude, this.latitude);
      // 创建标注点
      // var marker = new BMap.Marker(point);
      // 创建文字标注
      // var label = new BMap.Label("出现故障", {offset: new BMap.Size(20, -10)});
      // 将文字标注添加到地图中
      // marker.setLabel(label);
      // 将标注添加到地图中
      // map.addOverlay(marker);
      // 跳动的动画
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE);

      // 点击标注点事件 获取标注点信息
      // marker.addEventListener("click",getAttr);
      // function getAttr(){
      //     // 获取marker的位置
      //     var p = marker.getPosition();
      //     alert("出现故障的位置是" + p.lng + "," + p.lat);
      // }

      // // 添加纯文字的信息窗口
      // // 设置信息框宽高
      // var opts = {
      //     width: 200,
      //     height: 100,
      //     title: "南京电力自动化设备三厂"
      // }
      // // 创建信息窗口对象
      // var infoWindow = new BMap.InfoWindow("地址：江苏省南京市浦口区桥北村436号", opts);
      // // 点击开启信息窗口
      // marker.addEventListener("click",function(){
      //     map.openInfoWindow(infoWindow, point);
      // });
      var data_info = this.data_info
      var opts = {
        width: 250,
        height: 80,
      }
      for (var i = 0; i < data_info.length; i++) {
        var marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1]))
        var content = '<h4>' + data_info[i][2] + '</h4><p>' + data_info[i][3] + '</p>'
        // if(data_info[i][4] == 0){
        // 将标注点添加到地图中
        map.addOverlay(marker)
        addClickHandler(content, marker)
        // 若1，则为发生故障，赋予标注点动画效果
        if (data_info[i][4] == 1) {
          var label = new BMap.Label('出现故障', {offset: new BMap.Size(20, -10)})
          marker.setLabel(label)
          marker.setAnimation(BMAP_ANIMATION_BOUNCE)
        }
        // }
        // if(data_info[i][4] == 1){

        //     var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
        //     var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]),{icon:myIcon});
        //     map.addOverlay(marker);
        //     addClickHandler(content, marker);
        // }
      }

      // 点击开启信息窗口
      function addClickHandler (content, marker) {
        marker.addEventListener('click', function (e) {
          openInfo(content, e)
        })
      }

      function openInfo (content, e) {
        var p = e.target
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
        var infoWindow = new BMap.InfoWindow(content, opts)  // 创建信息窗口对象 
        map.openInfoWindow(infoWindow, point) //开启信息窗口
      }

      // var bounds = null;
      // var linesPoints = null;
      // var spoi1 = new BMap.Point(116.380967,39.913285);    // 起点1
      // var spoi2 = new BMap.Point(116.380967,39.953285);    // 起点2
      // var epoi  = new BMap.Point(116.424374,39.914668);    // 终点
      // var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/Mario.png", new BMap.Size(32, 70), {imageOffset: new BMap.Size(0, 0)});
      // function initLine(){
      //    bounds = new Array();
      //    linesPoints = new Array();
      //    map.clearOverlays();                                                    // 清空覆盖物
      //    var driving3 = new BMap.DrivingRoute(map,{onSearchComplete:drawLine});  // 驾车实例,并设置回调
      //        driving3.search(spoi1, epoi);                                       // 搜索一条线路
      //    var driving4 = new BMap.DrivingRoute(map,{onSearchComplete:drawLine});  // 驾车实例,并设置回调
      //        driving4.search(spoi2, epoi);                                       // 搜索一条线路
      // }
      // function run(){
      //    for(var m = 0;m < linesPoints.length; m++){
      //        var pts = linesPoints[m];
      //        var len = pts.length;
      //        var carMk = new BMap.Marker(pts[0],{icon:myIcon});
      //        map.addOverlay(carMk);
      //        resetMkPoint(1,len,pts,carMk)
      //    }

      //    function resetMkPoint(i,len,pts,carMk){
      //        carMk.setPosition(pts[i]);
      //        if(i < len){
      //            setTimeout(function(){
      //                i++;
      //                resetMkPoint(i,len,pts,carMk);
      //            },100);
      //        }
      //    }

      // }
      // function drawLine(results){
      //    var opacity = 0.45;
      //    var planObj = results.getPlan(0);
      //    var b = new Array();
      //    var addMarkerFun = function(point,imgType,index,title){
      //        var url;
      //        var width;
      //        var height
      //        var myIcon;
      //        // imgType:1的场合，为起点和终点的图；2的场合为车的图形
      //        if(imgType == 1){
      //            url = "http://lbsyun.baidu.com/jsdemo/img/dest_markers.png";
      //            width = 42;
      //            height = 34;
      //            myIcon = new BMap.Icon(url,new BMap.Size(width, height),{offset: new BMap.Size(14, 32),imageOffset: new BMap.Size(0, 0 - index * height)});
      //        }else{
      //            url = "http://lbsyun.baidu.com/jsdemo/img/trans_icons.png";
      //            width = 22;
      //            height = 25;
      //            var d = 25;
      //            var cha = 0;
      //            var jia = 0
      //            if(index == 2){
      //                d = 21;
      //                cha = 5;
      //                jia = 1;
      //            }
      //            myIcon = new BMap.Icon(url,new BMap.Size(width, d),{offset: new BMap.Size(10, (11 + jia)),imageOffset: new BMap.Size(0, 0 - index * height - cha)});
      //        }

      //        var marker = new BMap.Marker(point, {icon: myIcon});
      //        if(title != null && title != ""){
      //            marker.setTitle(title);
      //        }
      //        // 起点和终点放在最上面
      //        if(imgType == 1){
      //            marker.setTop(true);
      //        }
      //        map.addOverlay(marker);
      //    }
      //    var addPoints = function(points){
      //        for(var i = 0; i < points.length; i++){
      //            bounds.push(points[i]);
      //            b.push(points[i]);
      //        }
      //    }   
      //    // 绘制驾车步行线路
      //    for (var i = 0; i < planObj.getNumRoutes(); i ++){
      //        var route = planObj.getRoute(i);
      //        if (route.getDistance(false) <= 0){continue;}
      //        addPoints(route.getPath());
      //        // 驾车线路
      //        if(route.getRouteType() == BMAP_ROUTE_TYPE_DRIVING){
      //            map.addOverlay(new BMap.Polyline(route.getPath(), {strokeColor: "#0030ff",strokeOpacity:opacity,strokeWeight:6,enableMassClear:true}));
      //        }else{
      //        // 步行线路有可能为0
      //            map.addOverlay(new BMap.Polyline(route.getPath(), {strokeColor: "#30a208",strokeOpacity:0.75,strokeWeight:4,enableMassClear:true}));
      //        }
      //    }   
      //    map.setViewport(bounds);    
      //    // 终点
      //    addMarkerFun(results.getEnd().point,1,1);
      //    // 开始点
      //    addMarkerFun(results.getStart().point,1,0);
      //    linesPoints[linesPoints.length] = b;
      // }
      // initLine();
      // setTimeout(function(){
      //    run();
      // },1500);
    }
  }
</script>