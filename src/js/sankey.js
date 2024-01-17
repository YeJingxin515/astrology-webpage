import sankeyData from '../data/sankeyData.js';
var dom = document.getElementById('Sankey-Chart');
var myChart = echarts.init(dom, null, {
    renderer: 'svg',
    useDirtyRect: false
});

// 设置节点labels
sankeyData.nodes.forEach(node => {
    node.label = {
        show: true,
        fontFamily: "SongTi-regular",
        color: "#fff"
    };
    if (node.y === 50) {
        node.label.position = "top";
    } else {
        node.label.
        position = "bottom";
    }

     // 根据节点的y值判断是否使用本地图片
     if (node.y === 450) {
        node.symbol = 'image://src/image/sankey-icon/1.png',
        node.symbolSize = [30, 30]; // 设置图片的大小
    }
    
});

// 设置连接线颜色与源节点一样
sankeyData.links.forEach(link => {
    const sourceNode = sankeyData.nodes.find(node => node.name === link.source);
    link.lineStyle = {
        color: sourceNode.itemStyle ? sourceNode.itemStyle.color : 'white'
    };
});

var option;

option = {
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    layout: "force",
    series: [
        {
            type: 'graph',
            layout: 'none',
            roam: true,
            label: {
                show: true,
                fontFamily: "SongTi-regular",
                position: "top",
                color: "#fff"
            },
            symbolSize: 20,//节点大小
            roam: false,//不可拖拽和缩放
            edgeSymbol: ['none', 'none'],
            edgeLabel: {
                fontSize: 20
            },
            data: sankeyData.nodes,
            // links: [],
            links: sankeyData.links,
            lineStyle: {
                opacity: 0.3,
                width: 1,
                // curveness: 0,
                color: "source"
            },
            itemStyle: {
                color: "white",
            },
            emphasis: {
                focus: 'adjacency',
                lineStyle:{
                    opacity: 1,
                    width: 1.5,
                }
            }
        }
    ]
};

if (option && typeof option === 'object') {
    myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);