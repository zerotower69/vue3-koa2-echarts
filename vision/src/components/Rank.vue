<template>
  <div class="com-container">
    <div class="com-chart" ref="rank_ref"></div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  onBeforeMount,
  onMounted,
  onUnmounted,
  onUpdated,
  defineExpose,
  watch,
} from "vue";
import { ECharts, EChartsOption, graphic } from "echarts";
import { render } from "@/utils/chart";
import { useSocket } from "@/utils/socket_service";
import { useMainStore } from "@/store";
import { computed } from "@vue/reactivity";
// import { $ref } from "vue/macros";
const rank_ref = ref<HTMLElement | null>(null);
let instance: ECharts | null = null;
let allData = reactive<Array<Record<string, any>>>([]);

const startValue = ref(0);
const endValue = ref(9);
const timer = ref<number | null>(null);

const theme = computed(() => useMainStore().theme);
watch(theme, (value) => {
  //先销毁这个图表
  instance?.dispose();
  //重新渲染图表,加载新的主题
  initChart();
  //完成屏幕的适配工作
  screenAdapter();
  //更新图表的展示
  updateChart();
});

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
  screenAdapter();
  window.addEventListener("resize", screenAdapter);
});

onUpdated(() => {
  updateChart();
});

onUnmounted(() => {
  window.removeEventListener("resize", screenAdapter);
  useSocket()?.unRegisterCallback("rankData");
  if (timer.value) {
    clearInterval(timer.value);
  }
});

//init the chart
const initChart = () => {
  instance = render(rank_ref.value, theme.value);
  const initOption: EChartsOption = {
    title: {
      text: "▎ 地区销售排行",
      left: 20,
      top: 20,
    },
    grid: {
      top: "40%",
      left: "5%",
      right: "5%",
      bottom: "5%",
      containLabel: true,
    },
    tooltip: {
      show: true,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        type: "bar",
      },
    ],
  };
  instance?.setOption(initOption);
  instance?.on("mouseover", () => {
    if (timer.value) {
      clearInterval(timer.value);
    }
  });
  instance?.on("mouseout", () => {
    startInterVal();
  });
};

const getData = async (ret: any) => {
  allData = ret;
  //   console.log(allData);
  updateChart();
  startInterVal();
};

const updateChart = () => {
  //提前设定一些颜色值
  const colorArr = [
    ["#0BA82C", "#4FF778"],
    ["#2E72BF", "#23E5E5"],
    ["#5052EE", "#AB6EE5"],
  ];
  //对数据从大到小排序
  allData?.sort((a: any, b: any) => b.value - a.value);
  //获得省份的信息数组
  const provinceArr = allData?.map((item: any) => item.name);
  //所有省份的销售金额
  const valueArr = allData?.map((item: any) => item.value);
  const dataOption: EChartsOption = {
    xAxis: {
      data: provinceArr,
    },
    dataZoom: {
      show: false,
      startValue: startValue.value,
      endValue: endValue.value,
    },
    series: [
      {
        data: valueArr,
        itemStyle: {
          color: (arg: any) => {
            let targetColorArr: Array<string> | null = null;
            //arg.data获得数值
            if (arg.data >= 300) {
              targetColorArr = colorArr[0];
            } else if (arg.data >= 200) {
              targetColorArr = colorArr[1];
            } else {
              targetColorArr = colorArr[2];
            }
            return new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: targetColorArr[0] },
              { offset: 1, color: targetColorArr[1] },
            ]);
          },
        },
      },
    ],
  };
  instance?.setOption(dataOption);
};

const screenAdapter = () => {
  const titleFontSize = ((rank_ref.value?.offsetWidth ?? 0) / 100) * 3.6;
  const adapterOption: EChartsOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize,
      },
    },
    series: [
      {
        barWidth: titleFontSize,
        itemStyle: {
          borderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0],
        },
      },
    ],
  };
  instance?.setOption(adapterOption);
  instance?.resize();
};
const startInterVal = () => {
  if (timer.value) {
    clearInterval(timer.value);
  }
  timer.value = setInterval(() => {
    startValue.value++;
    endValue.value++;
    if (endValue.value > (allData?.length ?? 1) - 1) {
      startValue.value = 0;
      endValue.value = 9;
    }
    updateChart();
  }, 3000);
};
defineExpose({
  screenAdapter,
});
</script>
