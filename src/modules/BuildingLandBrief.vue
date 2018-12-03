<template>
    <el-row :type="flex" style="flex-direction:column">
        <el-col :span="8">
            <databox :title="'建设用地现状'" :dheight="'280px'">
                <div class="chart-container" v-echarts="option"></div>
                <!--<el-row :gutter="5" style="height: 100%">
                    <el-col :span="8" style="height: 100%">

                    </el-col>
                </el-row>-->
            </databox>
        </el-col>
        <el-col :span="16">
            <databox :title="'建设用地现状'" :dheight="'280px'">
                <div class="chart-container" v-echarts="option"></div>
                <!--<el-row :gutter="5" style="height: 100%">
                    <el-col :span="8" style="height: 100%">

                    </el-col>
                </el-row>-->
            </databox>
        </el-col>
    </el-row>
</template>

<script>

    var rate = 0.56;
    var linear_color = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0,
            color: '#6959CD'
        }, {
            offset: 1,
            color: '#ede0ff'
        }]
    };
    let option = {
        title: {
            text: "开发强度",
            textStyle: {
                color: '#fff',
                fontSize: 14,
                fontWeight: 'bold'
            },
            left: 'center',
            bottom: '20%'
        },
        backgroundColor: '#111c4e',
        series: [{
            type: 'pie',
            hoverAnimation: false,
            radius: ['79%', '80%'],
            startAngle: 225,
            labelLine: {
                show: false
            },
            data: [{
                value: rate * 270,
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        formatter: (rate * 100).toFixed(0) + '%',
                        textStyle: {
                            color: '#fff',
                            fontSize: 30,
                            fontWeight: 'bold'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: linear_color,
                        borderWidth: 10
                    }
                }
            }, {
                value: 270 - rate * 270,
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(250,250,250,1)',
                        borderWidth: 2
                    }
                }
            }, {
                value: 90,
                itemStyle: {
                    normal: {
                        color: "rgba(0,0,0,0)"
                    }
                }
            }],
        }]
    };
    import databox from '@components/databox'

    export default {
        name: "BuildingLandBrief",
        components: {databox},
        data() {
            return {'option': option};
        }
    }


</script>

<style scoped>
    .chart-container {
        height: 100%;
        width: 100%;
    }
</style>