import * as echarts from 'echarts'

export function render (el: HTMLElement | null, theme:string) {
  if (el === null) {
    return null
  } else {
    return theme ? echarts.init(el, theme) : echarts.init(el)
  }
}

echarts.registerTheme('chalk', {
  color: [
    '#0ba82c',
    '#2c6eff',
    '#16f2d9',
    '#fe211e',
    '#fa6900',
    '#eedd78',
    '#73a373',
    '#73b9bc',
    '#7289ab',
    '#91ca8c',
    '#f49f42'
  ],
  backgroundColor: '#222733',
  textStyle: {},
  title: {
    textStyle: {
      color: '#ffffff'
    },
    subtextStyle: {
      color: '#dddddd'
    }
  },
  line: {
    itemStyle: {
      normal: {
        borderWidth: '4'
      }
    },
    lineStyle: {
      normal: {
        width: '3'
      }
    },
    symbolSize: '0',
    symbol: 'circle',
    smooth: true
  },
  radar: {
    itemStyle: {
      normal: {
        borderWidth: '4'
      }
    },
    lineStyle: {
      normal: {
        width: '3'
      }
    },
    symbolSize: '0',
    symbol: 'circle',
    smooth: true
  },
  bar: {
    itemStyle: {
      normal: {
        barBorderWidth: 0,
        barBorderColor: '#ccc'
      },
      emphasis: {
        barBorderWidth: 0,
        barBorderColor: '#ccc'
      }
    }
  },
  pie: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  scatter: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  boxplot: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  parallel: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  sankey: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  funnel: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  gauge: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#fc97af',
        color0: 'transparent',
        borderColor: '#fc97af',
        borderColor0: '#87f7cf',
        borderWidth: '2'
      }
    }
  },
  graph: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    },
    lineStyle: {
      normal: {
        width: '1',
        color: '#ffffff'
      }
    },
    symbolSize: '0',
    symbol: 'circle',
    smooth: true,
    color: [
      '#759aa0',
      '#dd6b66',
      '#e69d87',
      '#8dc1a9',
      '#ea7e53',
      '#eedd78',
      '#73a373',
      '#73b9bc',
      '#7289ab',
      '#91ca8c',
      '#f49f42'
    ],
    label: {
      normal: {
        textStyle: {
          color: '#293441'
        }
      }
    }
  },
  map: {
    itemStyle: {
      normal: {
        areaColor: '#f3f3f3',
        borderColor: '#999999',
        borderWidth: 0.5
      },
      emphasis: {
        areaColor: 'rgba(255,178,72,1)',
        borderColor: '#eb8146',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#893448'
        }
      },
      emphasis: {
        textStyle: {
          color: 'rgb(137,52,72)'
        }
      }
    }
  },
  geo: {
    itemStyle: {
      normal: {
        areaColor: '#f3f3f3',
        borderColor: '#999999',
        borderWidth: 0.5
      },
      emphasis: {
        areaColor: 'rgba(255,178,72,1)',
        borderColor: '#eb8146',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#893448'
        }
      },
      emphasis: {
        textStyle: {
          color: 'rgb(137,52,72)'
        }
      }
    }
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#666666'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#aaaaaa'
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: [
          '#e6e6e6'
        ]
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          'rgba(250,250,250,0.05)',
          'rgba(200,200,200,0.02)'
        ]
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#666666'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#aaaaaa'
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: [
          '#e6e6e6'
        ]
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          'rgba(250,250,250,0.05)',
          'rgba(200,200,200,0.02)'
        ]
      }
    }
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#666666'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#aaaaaa'
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: [
          '#e6e6e6'
        ]
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          'rgba(250,250,250,0.05)',
          'rgba(200,200,200,0.02)'
        ]
      }
    }
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#666666'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#aaaaaa'
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: [
          '#e6e6e6'
        ]
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          'rgba(250,250,250,0.05)',
          'rgba(200,200,200,0.02)'
        ]
      }
    }
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: '#999999'
      },
      emphasis: {
        borderColor: '#666666'
      }
    }
  },
  legend: {
    textStyle: {
      color: '#999999'
    }
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#cccccc',
        width: 1
      },
      crossStyle: {
        color: '#cccccc',
        width: 1
      }
    }
  },
  timeline: {
    lineStyle: {
      color: '#87f7cf',
      width: 1
    },
    itemStyle: {
      normal: {
        color: '#87f7cf',
        borderWidth: 1
      },
      emphasis: {
        color: '#f7f494'
      }
    },
    controlStyle: {
      normal: {
        color: '#87f7cf',
        borderColor: '#87f7cf',
        borderWidth: 0.5
      },
      emphasis: {
        color: '#87f7cf',
        borderColor: '#87f7cf',
        borderWidth: 0.5
      }
    },
    checkpointStyle: {
      color: '#fc97af',
      borderColor: 'rgba(252,151,175,0.3)'
    },
    label: {
      normal: {
        textStyle: {
          color: '#87f7cf'
        }
      },
      emphasis: {
        textStyle: {
          color: '#87f7cf'
        }
      }
    }
  },
  visualMap: {
    color: [
      '#fc97af',
      '#87f7cf'
    ]
  },
  dataZoom: {
    backgroundColor: 'rgba(255,255,255,0)',
    dataBackgroundColor: 'rgba(114,204,255,1)',
    fillerColor: 'rgba(114,204,255,0.2)',
    handleColor: '#72ccff',
    handleSize: '100%',
    textStyle: {
      color: '#333333'
    }
  },
  markPoint: {
    label: {
      normal: {
        textStyle: {
          color: '#293441'
        }
      },
      emphasis: {
        textStyle: {
          color: '#293441'
        }
      }
    }
  }
})

echarts.registerTheme('vintage', {
  color: [
    '#0ba82c',
    '#2c6eff',
    '#16f2d9',
    '#fe211e',
    '#fa6900',
    '#eedd78',
    '#73a373',
    '#73b9bc',
    '#7289ab',
    '#91ca8c',
    '#f49f42'
  ],
  backgroundColor: '#ffffff',
  textStyle: {},
  title: {
    textStyle: {
      color: '#333333'
    },
    subtextStyle: {
      color: '#aaa'
    }
  },
  line: {
    itemStyle: {
      normal: {
        borderWidth: '4'
      }
    },
    lineStyle: {
      normal: {
        width: '3'
      }
    },
    symbolSize: '0',
    symbol: 'circle',
    smooth: true
  },
  radar: {
    itemStyle: {
      normal: {
        borderWidth: 1
      }
    },
    lineStyle: {
      normal: {
        width: 2
      }
    },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: false
  },
  bar: {
    itemStyle: {
      normal: {
        barBorderWidth: 0,
        barBorderColor: '#ccc'
      },
      emphasis: {
        barBorderWidth: 0,
        barBorderColor: '#ccc'
      }
    }
  },
  pie: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  scatter: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  boxplot: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  parallel: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  sankey: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  funnel: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  gauge: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      },
      emphasis: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    }
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#c23531',
        color0: '#314656',
        borderColor: '#c23531',
        borderColor0: '#314656',
        borderWidth: 1
      }
    }
  },
  graph: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#ccc'
      }
    },
    lineStyle: {
      normal: {
        width: 1,
        color: '#aaa'
      }
    },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: false,
    color: [
      '#d87c7c',
      '#919e8b',
      '#d7ab82',
      '#6e7074',
      '#61a0a8',
      '#efa18d',
      '#787464',
      '#cc7e63',
      '#724e58',
      '#4b565b'
    ],
    label: {
      normal: {
        textStyle: {
          color: '#eee'
        }
      }
    }
  },
  map: {
    itemStyle: {
      normal: {
        areaColor: '#eeeeee',
        borderColor: '#444444',
        borderWidth: 0.5
      },
      emphasis: {
        areaColor: 'rgba(255,215,0,0.8)',
        borderColor: '#444444',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#000000'
        }
      },
      emphasis: {
        textStyle: {
          color: 'rgb(100,0,0)'
        }
      }
    }
  },
  geo: {
    itemStyle: {
      normal: {
        areaColor: '#eeeeee',
        borderColor: '#444444',
        borderWidth: 0.5
      },
      emphasis: {
        areaColor: 'rgba(255,215,0,0.8)',
        borderColor: '#444444',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#000000'
        }
      },
      emphasis: {
        textStyle: {
          color: 'rgb(100,0,0)'
        }
      }
    }
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#999'
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: [
          '#ccc'
        ]
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          'rgba(250,250,250,0.3)',
          'rgba(200,200,200,0.3)'
        ]
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#666666'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#aaaaaa'
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: [
          '#e6e6e6'
        ]
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          'rgba(250,250,250,0.05)',
          'rgba(200,200,200,0.02)'
        ]
      }
    }
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#333'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: [
          '#ccc'
        ]
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          'rgba(250,250,250,0.3)',
          'rgba(200,200,200,0.3)'
        ]
      }
    }
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#333'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: [
          '#ccc'
        ]
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: [
          'rgba(250,250,250,0.3)',
          'rgba(200,200,200,0.3)'
        ]
      }
    }
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: '#999999'
      },
      emphasis: {
        borderColor: '#666666'
      }
    }
  },
  legend: {
    textStyle: {
      color: '#333333'
    }
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#cccccc',
        width: 1
      },
      crossStyle: {
        color: '#cccccc',
        width: 1
      }
    }
  },
  timeline: {
    lineStyle: {
      color: '#293c55',
      width: 1
    },
    itemStyle: {
      normal: {
        color: '#293c55',
        borderWidth: 1
      },
      emphasis: {
        color: '#a9334c'
      }
    },
    controlStyle: {
      normal: {
        color: '#293c55',
        borderColor: '#293c55',
        borderWidth: 0.5
      },
      emphasis: {
        color: '#293c55',
        borderColor: '#293c55',
        borderWidth: 0.5
      }
    },
    checkpointStyle: {
      color: '#e43c59',
      borderColor: 'rgba(194,53,49,0.5)'
    },
    label: {
      normal: {
        textStyle: {
          color: '#293c55'
        }
      },
      emphasis: {
        textStyle: {
          color: '#293c55'
        }
      }
    }
  },
  visualMap: {
    color: [
      '#bf444c',
      '#d88273',
      '#f6efa6'
    ]
  },
  dataZoom: {
    backgroundColor: 'rgba(47,69,84,0)',
    dataBackgroundColor: 'rgba(47,69,84,0.3)',
    fillerColor: 'rgba(167,183,204,0.4)',
    handleColor: '#a7b7cc',
    handleSize: '100%',
    textStyle: {
      color: '#333333'
    }
  },
  markPoint: {
    label: {
      normal: {
        textStyle: {
          color: '#eee'
        }
      },
      emphasis: {
        textStyle: {
          color: '#eee'
        }
      }
    }
  }
})
