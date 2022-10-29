<template>
    <div class="com-container">
    <div class="com-chart" ref="seller"></div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { EChartsType, EChartsOption } from 'echarts'
import { render } from '@/utils/chart'
import request from '@/utils/request'

type dataItem = {
        name: string,
        value:number
   }
let instance: EChartsType | null = null
let allData: any = null
const seller = ref(null) // div el
const currentPage = ref(1)
const totalPage = ref(0)
let timer: any = null
onMounted(() => {
  initChart()
  getData()
})
onUnmounted(() => {
  // when unmounted the vue instance, need to clear all interval timer!
  if (timer) {
    clearInterval(timer)
  }
})
/**
 * 初始化echartInstance对象
 */
const initChart = () => {
  instance = render(seller.value, 'chalk')
  // mouse event
  instance?.on('mouseover', () => {
    clearInterval(timer)
  })
  instance?.on('mouseout', () => {
    startInterval()
  })
  // mobile device
  instance?.on('touchstart', () => {
    clearInterval(timer)
  })
  instance?.on('touchend', () => {
    startInterval()
  })
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
  const option:EChartsOption = {
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: sellerNames
    },
    series: [
      {
        type: 'bar',
        data: sellerValues
        //   itemStyle: {
        //     color: 'red'
        //   }
      }
    ]
  }
    instance?.setOption(option)
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
</script>
