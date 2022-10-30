<template>
    <div class="com-container">
    <div class="com-chart" ref="seller"></div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { EChartsType, EChartsOption, graphic } from 'echarts'
import { render } from '@/utils/chart'
import request from '@/utils/request'

type dataItem = {
        name: string,
        value:number
   }
let instance: EChartsType | null = null
let allData: any = null
const seller = ref<HTMLDivElement | null>(null) // div el
const currentPage = ref(1)
const totalPage = ref(0)
let timer: any = null
onMounted(() => {
  initChart()
  getData()
  window.addEventListener('resize', screenAdapter)
})
onUnmounted(() => {
  // when unmounted the vue instance, need to clear all interval timer!
  if (timer) {
    clearInterval(timer)
  }
  window.removeEventListener('resize', screenAdapter)
})
/**
 * 初始化echartInstance对象
 */
const initChart = () => {
  instance = render(seller.value, 'chalk')
  // 对图表初始化配置的控制
  const initOption = {
    title: {
      text: '┃ 商家销售统计',
      textStyle: {
        fontSize: 66
      },
      left: 20,
      top: 20
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        z: 0,
        lineStyle: {
          width: 66,
          color: '#2D3443'
        }
      }
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '6%',
      bottom: '3%',
      containLabel: true // 距离是包含坐标轴上的文字
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        label: {
          show: true,
          position: 'right',
          textStyle: {
            color: 'white'
          }
        },
        itemStyle: {
          // 线性渐变
          color: new graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: '#5052EE'
            },
            {
              offset: 1,
              color: '#AB6EE5'
            }
          ])
        }
      }
    ]
  }
  instance?.setOption(initOption)
  // mouse event
  instance?.on('mouseover', () => {
    clearInterval(timer)
  })
  instance?.on('mouseout', () => {
    startInterval()
  })
  // mobile device
  // instance?.on('touchstart', () => {
  //   clearInterval(timer)
  // })
  // instance?.on('touchend', () => {
  //   startInterval()
  // })
}
/**
 * 获取服务器数据
 */
const getData = async () => {
  const { data: ret } = await request.get('/seller')
  //   console.log(ret)
  allData = ret
  // sort the allData
    allData?.sort((a: dataItem, b: dataItem) => {
      return a.value - b.value
    })
    // every five dataitem in one page
    totalPage.value = allData?.length % 5 === 0 ? allData.length / 5 : allData.length / 5 + 1
    updateChart()
    screenAdapter()
}
/**
 * 更新图表
 */
const updateChart = () => {
  const start = (currentPage.value - 1) * 5
  const end = currentPage.value * 5
  const showData = allData?.slice(start, end)
  const sellerNames = showData.map((item: dataItem) => item.name)
  const sellerValues = showData.map((item:dataItem) => item.value)
  const dataOption = {
    yAxis: {
      data: sellerNames
    },
    series: [
      {
        data: sellerValues
      }
    ]
  }
    instance?.setOption(dataOption)
}
const startInterval = () => {
  timer = setInterval(() => {
    currentPage.value++
    if (currentPage.value > totalPage.value) {
      currentPage.value = 1
    }
    updateChart()
  }, 3000) // 3s to short!
}
/**
 * 图表自适应函数
 */
const screenAdapter = () => {
  const titleFontSize = ((seller.value)?.offsetWidth ?? 0) / 100 * 3.6
  const adapterOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize
      }
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          width: titleFontSize,
          color: '#2D3443'
        }
      }
    },
    series: [
      {
        barWidth: titleFontSize,
        itemStyle: {
          barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
        }
      }]
  }
  instance?.setOption(adapterOption)
  instance?.resize()
}
</script>
