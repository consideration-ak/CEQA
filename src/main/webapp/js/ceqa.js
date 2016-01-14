// 基于准备好的dom，初始化echarts实例
$(function(){
    var myChart = echarts.init(document.getElementById('draw'));

    myChart.showLoading();
    $.get('./les-miserables.gexf', function(xml) {
        myChart.hideLoading();

        var graph = echarts.tools.parse(xml);
        var categories = [{name:'实体'},{name:'属性'},{name:'类别'}];
        graph.nodes.forEach(function(node) {
            node.itemStyle = null;
            node.value = node.symbolSize;
            node.label.normal.show = node.symbolSize > 10;
            node.category = node.attributes.modularity_class;
        });
        option = {
            title: {
                text: '',
                subtext: '知识图谱',
                top: 'bottom',
                left: 'middle'
            },
            tooltip: {},
            legend: [{
                // selectedMode: 'single',
                data: categories.map(function(a) {
                    return a.name;
                })
            }],
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [{
                name: '知识图谱',
                type: 'graph',
                layout: 'circular',
                roam:true,
                data: graph.nodes,
                links: graph.links,
                categories: categories,
                roam: true,
                label: {
                    normal: {
                        position: 'left'
                    }
                },
                lineStyle: {
                    normal: {
                        curveness: 0.3
                    }
                }
            }]
        };

        myChart.setOption(option);
    }, 'xml');
});
