<template>
    <databox>
        <div id="map-view"></div>
    </databox>
</template>


<script>
    /* eslint-disable no-console,no-undef */

    import * as esriLoader from "esri-loader";
    import {createMap} from "@components/esrimap";

    const ESRI_LOADER_OPTHION= {url:'https://js.arcgis.com/4.9/'}
    esriLoader.options=ESRI_LOADER_OPTHION;

    export default {
        name:'main-map',
        data() {
            return {}
        },
        mounted() {
            createMap('map-view',esriLoader);
        }
    }

</script>

<style lang="scss">
    @import url('https://js.arcgis.com/4.9/esri/themes/dark-blue/main.css');

    #map-view {
        width: 100%;
        height: 100%;
        .esri-display-object{
            filter: grayscale(100%) invert(100%);
            opacity: .5;
        }
    }
</style>
