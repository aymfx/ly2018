---
title: echart的柱状图和饼图的demo
date: 2017-10-13 10:56:34
tags: echarts
---

# 柱状图

``` javascript

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="./js/adaptive.js"></script>
    <!-- 引入 ECharts 文件 -->
    <script src="./js/echarts.js"></script>
    <link rel="stylesheet" href="./css/index.css">
</head>

<body>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main">
    </div>
    <script type="text/javascript">
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据

    option = {
        xAxis: [{
            type: 'category', 
            show: true,
            data: (function(){
                var a = ['2017年7月', '2017年8月', '2017年9月'],
                     s = [];
                for (var i = 0; i < a.length; i++) {
                    s.push({
                        value: a[i],
                        // 突出周一
                        textStyle: {
                            fontSize: 24,
                            color: '#ddd'
                        }
                    })
                }
                return s;
            })(),
            boundaryGap: true,
            axisTick: {
                alignWithLabel: false
            },

        }],
        yAxis: [{
            show: false
        }],
        series: [{
            name: 'ECharts例子个数统计',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: function(params) {
                        // build a color map as your need.
                        var colorList = [
                            '#fc9434', '#ff4950', '#00b0ec',
                        ];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'top',
                        distance:'20',
                        formatter: '{c}',
                        textStyle: {
                            fontSize: 24,
                            fontWeight: 'bold',
                        },

                    },
                    
                }
            },
            data: [80208929.00, 106432366, 89371857.00],
            barWidth: '40%',
            barGap: '1%',


        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    </script>
</body>

</html>

```


# 柱状图

``` javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="./js/adaptive.js"></script>
    <!-- 引入 ECharts 文件 -->
    <script src="./js/echarts.js"></script>
    <link rel="stylesheet" href="./css/index.css">
</head>

<body>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main">
    </div>
    <script type="text/javascript">
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    option = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : ({c}%)",
        textStyle:{
            fontSize:24,
        }
    },
    color:['#7057d3', '#8f79eb','#b09ffa'],
    series : [
        {
            name:'投资比例',
            type:'pie',
            radius : [150, 280],
            center : ['50%', 400],
            roseType : 'area',
            x: '50%',               // for funnel
            max: 80,                // for funnel
            sort : 'ascending',     // for funnel
            data:[
                {value:16.20, name:'90天'},
                {value:23.06, name:'60天'},
                {value:41.95, name:'30天'},
              
            ]
        }
    ],
    textStyle:{
            fontSize:30,
            fontWeight:700,
            color:'#000'
        }
};                
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    </script>
</body>

</html>
```