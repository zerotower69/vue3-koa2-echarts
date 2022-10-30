<template>
  <div class="com-container">
    <div class="com-chart" ref="trend"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onUnmounted } from "vue";
import { ECharts } from "echarts";
import { render } from "@/utils/chart";
import { useSocket } from "@/utils/socket_service";
// import { $ref } from "vue/macros";
const trend = ref<HTMLElement | null>(null);
let instance: ECharts | null = null;
let allData: Array<Record<string, any>> | null = null;

onBeforeMount(() => {
  useSocket()?.registerCallback("trendData", getData);
});

onMounted(() => {
  initChart();
  //need data from server
  useSocket()?.send({
    action: "getData",
    socketType: "trendData",
    chartName: "trend",
    value: "",
  });
  window.addEventListener("resize", screenAdapter);
});

onUnmounted(() => {
  window.removeEventListener("resize", screenAdapter);
  useSocket()?.unRegisterCallback("trendData");
});

//init the chart
const initChart = () => {
  instance = render(trend.value, "chalk");
  const initOption = {};
  instance?.setOption(initOption);
};

const getData = async (ret: any) => {
  allData = ret;
  console.log(allData);
  updateChart();
  screenAdapter();
};

const updateChart = () => {
  const dataOption = {};
  instance?.setOption(dataOption);
};

const screenAdapter = () => {
  const adapterOption = {};
  instance?.setOption(adapterOption);
  instance?.resize();
};
</script>
