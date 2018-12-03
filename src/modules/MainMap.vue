<template>
    <databox :title="'map'" :dheight="'560px'">
        <div id="map-view"></div>
    </databox>
</template>


<script>
    /* eslint-disable no-console,no-undef */

    import * as esriLoader from "esri-loader";
    import {config} from "@src/config/config";
    import {createMap} from "@utils/esrimap";
    import databox from '@components/databox'

    const ESRI_LOADER_OPTHION= {url:'https://js.arcgis.com/4.9/'}
    esriLoader.options=ESRI_LOADER_OPTHION;

    export default {
        name:'main-map',
        components:{databox},
        data() {
            return {}
        },
        mounted() {
            createMap('map-view',esriLoader,config);
        }
    }

</script>

<style scoped>
    @import url('https://js.arcgis.com/4.9/esri/themes/light/main.css');

    #map-view {
        width: 100%;
        height: 100%;
    }

</style>
