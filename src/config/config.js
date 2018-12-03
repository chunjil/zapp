const HOST = 'http://112.35.85.174:6080/arcgis/rest/services/';
const SERVICE_SUFFIX='MapServer';
export const config={
    host: "http://112.35.85.174:6080/arcgis/rest/services/",
    FeaturesServer:'http://112.35.85.174:6080/arcgis/rest/services/jiangsPlan_GT_GHJBNTBHQ/MapServer/',
    BaseMapService:'http://srv.zjditu.cn/ZJEMAP_2D/wmts?request=getCapabilities&version=1.0.0&service=WMTS',
    layers:[0],
    proxy:'http://localhost:8080/esri_proxy/proxy.jsp'

    
}