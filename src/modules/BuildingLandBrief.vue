<template>
    <databox :title="'建设用地现状'" :dheight="'100%'">
        <div class="chart-container" v-echarts="option"></div>
    </databox>
</template>

<script>

    import statelessStore from '@state/stateless-store'
    const colorText=statelessStore.style['color-text']||'#fff'
    const colorChartMan=statelessStore.style['color-chart-theme-main']||'#6981ee'
    const colorChartSub=statelessStore.style['color-chart-theme-sub']||'#0da5ee'

    var rate = 0.56;
    var linear_color = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0,
            color: colorChartMan
        }, {
            offset: 1,
            color: colorChartSub
        }]
    };
    let option = {
        title: {
            text: "开发强度",
            textStyle: {
                color: colorText,
                fontSize: 14,
                fontWeight: 'bold'
            },
            left: 'center',
            bottom: '20%'
        },
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
                            color: colorText,
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

    export default {
        name: "BuildingLandBrief",
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