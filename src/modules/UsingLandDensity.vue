<template>
    <databox :title="'开发强度分布'">
        <div class="chart-container" v-echarts="option"></div>
    </databox>
</template>

<script>
    import echarts from 'echarts'
    let data=[
        {'name':'落星街道', value:'60'},
        {'name':'落星街道', value:'60'},
        {'name':'天凝镇', value:'90'},
        {'name':'落星街道', value:'60'},
        {'name':'落星街道', value:'60'},
        {'name':'落星街道', value:'60'},
    ]
    let option = {
        grid:{
            right:79
        },
        calculable : true,
        xAxis : [
            {
                name:'平方公里',
                nameLocation:'start',
                nameTextStyle:{
                    padding:[0,0,30,0]
                },
                type : 'value',
                position:'top',
                inverse:'true',
                axisLabel : {
                    show : true,
                    textStyle : {
                        fontSize : 14
                    },
                },
                axisTick : {
                    show : false
                },
                splitLine : {
                    lineStyle : {/*
                        color : '#1c2346',*/
                        type : 'dashed'
                    }
                },
                axisLine : {
                    show : true,
                    lineStyle : {/*
                        color : '#6981ee'*/
                    }
                },
            }
        ],
        yAxis : {
            position:'right',
            axisLabel : {
                textStyle : {
                    fontSize : 14,/*
                    color : '#6981ee',*/
                },
                rotate:-30
            },
            axisTick : {
                show : false
            },
            splitLine : {
                show : true,
                lineStyle : {
                    color : '#141832',
                }
            },
            axisLine : {
                show : true,
                lineStyle : {/*
                    color : '#6981ee'*/
                }
            },
            type : 'category',
            data:data.map(x=>x.name)
        },
        series : [
            {
                type : 'bar',
                data : data,
                name : '建设用地分布',
                barWidth : 14,
                label : {
                    normal : {
                        show : true,
                        position : 'left',
                        textStyle : {/*
                            color : '#0da5ee',*/
                            fontSize : 12,
                            fontFamily : 'screenLed',
                        },
                    }
                },
                itemStyle : {
                    normal : {
                        // color: '#1babf5',
                        color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset : 0,/*
                                color : '#00a0e9'*/
                            }, {
                                offset : 1,/*
                                color : '#34b4ff'*/
                            }
                        ]),
                        barBorderRadius : [10, 0, 0, 10]
                    }
                }
            },
        ],
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