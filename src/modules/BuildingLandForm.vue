<template>
    <databox :title="'建设用地构成'">
        <div class="chart-container" v-echarts="option"></div>
    </databox>
</template>

<script>

import statelessStore from '@state/stateless-store'
const colorText=statelessStore.style['color-text']||'#fff'

let data = [
        {value: 10, name: 'rose1'},
        {value: 5, name: 'rose2'},
        {value: 15, name: 'rose3'},
        {value: 25, name: 'rose4'},
        {value: 20, name: 'rose5'},
        {value: 35, name: 'rose6'},
        {value: 30, name: 'rose7'},
        {value: 40, name: 'rose8'}
    ]
    let total = 0
    data.forEach(x => total += x.value)
    data.map(x => x.percent = (x.value / total).toFixed(4))


    let option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x: 'center',
            y: 'bottom',
            data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8'],
            orient: 'vertical',
            formatter: function (name) {
                let item = data.find(x => x.name === name)
                let text = name + '   ' + item.value + '公顷' + '    ' + (item.percent * 100).toFixed(2) + '%';
                return text
            }
        },
        calculable: true,
        series: [
            {
                name: '建筑用地构成',
                type: 'pie',
                radius: [40, 90],
                center: ['50%', '25%'],
                roseType: 'radius',
                label: {
                    normal: {
                        show: true,
                        color: colorText
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: true,
                        lineStyle: {
                            color: colorText
                        }
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: [
                    {value: 10, name: 'rose1'},
                    {value: 5, name: 'rose2'},
                    {value: 15, name: 'rose3'},
                    {value: 25, name: 'rose4'},
                    {value: 20, name: 'rose5'},
                    {value: 35, name: 'rose6'},
                    {value: 30, name: 'rose7'},
                    {value: 40, name: 'rose8'}
                ]
            },
        ]
    };

    export default {
        name: "BuildingLandForm",
        data() {
            return {
                'option': option
            }
        }
    }
</script>

<style scoped>

    .chart-container {
        height: 100%;
        width: 100%;
    }
</style>