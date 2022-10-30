<template>
  <div class="com-container">
    <div class="com-chart" ref="rank_ref"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onUnmounted } from "vue";
import { ECharts } from "echarts";
import { render } from "@/utils/chart";
import { useSocket } from "@/utils/socket_service";
// import { $ref } from "vue/macros";
const rank_ref = ref<HTMLElement | null>(null);
let instance: ECharts | null = null;
let allData: Array<Record<string, any>> | null = null;

onBeforeMount(() => {
  useSocket()?.registerCallback("rankData", getData);
});

onMounted(() => {
  initChart();
  //need data from server
  useSocket()?.send({
    action: "getData",
    socketType: "rankData",
    chartName: "rank",
    value: "",
  });
  window.addEventListener("resize", screenAdapter);
});

onUnmounted(() => {
  window.removeEventListener("resize", screenAdapter);
  useSocket()?.unRegisterCallback("rankData");
});

//init the chart
const initChart = () => {
  instance = render(rank_ref.value, "chalk");
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
