import store from '@state/store'

export const createMap = (container, loader) => {
    const esriLoader = loader;
    const config=store.getters('config/appConfig')

    esriLoader.loadModules(
        [
            'esri/config',
            'esri/core/urlUtils',
            'esri/views/MapView',
            'esri/Basemap',
            'esri/Map',
            'esri/layers/VectorTileLayer',
            'esri/layers/FeatureLayer',
            'esri/layers/WMTSLayer',
            'esri/layers/WebTileLayer',
            'esri/layers/Layer',
            "esri/geometry/SpatialReference",
            'esri/widgets/Expand',
            'esri/widgets/Legend',
            'esri/widgets/LayerList',
            'esri/widgets/Search'
        ], {url: 'https://js.arcgis.com/4.9/'}).then(
        ([
             esriConfig,
             UrlUtils,
             MapView,
             Basemap,
             Map,
             VectorTileLayer,
             FeatureLayer,
             WMTSLayer,
             WebTileLayer,
             Layer,
             SpatialReference,
             Expand,
             Legend,
             LayerList,
             Search]) => {
            const zoom = 2;
            let baseLayer = new WMTSLayer({
                url: "http://srv.zjditu.cn/ZJEMAP_2D/wmts"
            });
             /*esriConfig.request.trustedServers.push('http://ditu.zj.cn');
             esriConfig.request.trustedServers.push('t0.tianditu.com');
             esriConfig.request.trustedServers.push('t1.tianditu.com');
             esriConfig.request.trustedServers.push('t2.tianditu.com');
             esriConfig.request.trustedServers.push('t3.tianditu.com');
             esriConfig.request.trustedServers.push('t4.tianditu.com');*/
             esriConfig.request.proxyRules.push({proxyUrl:config.proxy,urlPrefix:'http://ditu.zj.cn'})

            const extend = [119.865, 29.117, 120.363, 28.756]
            const zjTdtUrlTemplate = config.proxy+'?http://ditu.zj.cn/services/wmts/emap?' +
                'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=UNTMZJEMAP&STYLE=default&TILEMATRIXSET=nativeTileMatrixSet' +
                '&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=image%2Fpng';
            const tdtUrlTemplate = 'http://{subDomain}.tianditu.com/vec_c/wmts?SERVICE=WMTS&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=c&TileMatrix={level}&TileRow={row}&TileCol={col}&style=default&format=tiles'
            const spatialReference = new SpatialReference({wkid: 4490});

            baseLayer = new WebTileLayer({
                urlTemplate: tdtUrlTemplate,
                subDomains: ["t0", "t1", "t2", "t3", "t4"],
               // spatialReference
            })

            let zjTdtuLayer=new WebTileLayer({
                urlTemplate: zjTdtUrlTemplate,
                spatialReference
            })


            //设置地图
            let basemap = new Basemap({
                baseLayers: [baseLayer],
                //baseLayers: [zjTdtuLayer],
                title: 'Zhejiang tiandi tu',
                id: 'td-map'
            });

            const map = new Map({
                basemap,
            });

            const view = new MapView({
                map,
                container,
                zoom
            });

            //添加图层
            /*let featuresServer = config.FeaturesServer;
            let firstLayer;
            config.layers.forEach((id) => {
                let url = featuresServer + id;
                let l = new FeatureLayer(url);
                if (!firstLayer) {
                    firstLayer = l;
                    view.extent = firstLayer.fullExtent;
                    firstLayer.when(() => {
                        view.extent = firstLayer.fullExtent;
                    })
                }
                map.add(l);
            });*/


            /*view.when(() => {
                console.log(firstLayer.fullExtent)
                const legend = new Legend({
                    view,
                    container: document.createElement('div')
                })
                const layerList = new LayerList({
                    view,
                    container: document.createElement('div')
                })
                const legendExpand = new Expand({
                    view,
                    contend: legend.domNode,
                    expandIconClass: 'esri-icon-collection',
                    expandTooltip: 'legend'
                })
                const layersExpand = new Expand({
                    view,
                    content: layerList.domNode,
                    expandIconClass: 'esri-icon-layer-list',
                    expandTooltip: 'Layers'
                })
                view.ui.add(layersExpand, 'top-right')
                view.ui.add(legendExpand, 'top-right')
            });*//*
            const searchWidget = new Search({
                view: view
            })
            view.ui.add(searchWidget, {
                position: 'top-left',
                index: 0
            })*/
            view.ui.remove('attribution')

        }
    )
}