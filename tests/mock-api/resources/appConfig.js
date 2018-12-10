module.exports = {
    data:{
        appTitle:'国土规划一张图',
        gisServer:'http://112.35.85.174:6080/arcgis/rest/services/jiangsPlan_GT_GHJBNTBHQ/MapServer/',
        baseMap:'http://srv.zjditu.cn/ZJEMAP_2D/wmts?request=getCapabilities&version=1.0.0&service=WMTS',
        layers:[0],
        proxy:'http://localhost:8080/esri_proxy/proxy.jsp'
    },
    theme:{
        name:'dark-blue'
    },
    json(data){
        return data
    }
}