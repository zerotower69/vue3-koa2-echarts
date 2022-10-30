<template>
  <div class="com-container">
    <div class="com-chart" ref="hot_ref"></div>
    <span class="iconfont arr-left" @click="toLeft" :style="comStyle">&#xe6ef;</span>
    <span class="iconfont arr-right" @click="toRight" :style="comStyle">&#xe6ed;</span>
    <span class="cat-name" :style="comStyle">{{ catName }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onUnmounted, onUpdated, computed } from "vue";
import { ECharts, EChartsOption } from "echarts";
import { render } from "@/utils/chart";
import { useSocket } from "@/utils/socket_service";
// import { $ref } from "vue/macros";
const hot_ref = ref<HTMLElement | null>(null);
let instance: ECharts | null = null;
const allData = ref<Array<Record<string, any>> | null>(null);
const currentIndex = ref(0);

const catName = computed(() => {
  if (!allData.value) {
    return "";
  } else {
    return allData.value?.[currentIndex.value].name;
  }
});

const titleFontSize = ref(0);

const comStyle = computed(() => {
  return {
    fontSize: titleFontSize.value + "px",
  };
});

onBeforeMount(() => {
  useSocket()?.registerCallback("hotData", getData);
});

onMounted(() => {
  initChart();
  //need data from server
  useSocket()?.send({
    action: "getData",
    socketType: "hotData",
    chartName: "hot",
    value: "",
  });
  window.addEventListener("resize", screenAdapter);
});

onUpdated(() => {
  updateChart();
});

onUnmounted(() => {
  window.removeEventListener("resize", screenAdapter);
  useSocket()?.unRegisterCallback("hotData");
});

//init the chart
const initChart = () => {
  instance = render(hot_ref.value, "chalk");
  const initOption: EChartsOption = {
    title: {
      text: "▎ 热销商品占比",
      top: 20,
      left: 20,
    },
    legend: {
      top: "18%",
      icon: "circle",
    },
    tooltip: {
      show: true,
      formatter: (arg) => {
        // console.log(arg);
        //@ts-ignore
        const thirdCategory = arg.data.children;
        let total = 0;
        thirdCategory.forEach((item: any) => {
          total += item.value;
        });
        let retStr = "";
        thirdCategory.forEach((item: any) => {
          retStr +=
            `
            ${item.name}:${parseInt((item.value / total) * 100 + "") + "%"}` + "<br/>";
        });
        return retStr;
      },
    },
    series: [
      {
        type: "pie",
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
          },
          labelLine: {
            show: false,
          },
        },
      },
    ],
  };
  instance?.setOption(initOption);
};

const getData = async (ret: any) => {
  allData.value = ret;
  //   console.log(allData);
  updateChart();
  screenAdapter();
};

const updateChart = () => {
  //处理图表需要的数据
  const legendData = allData.value?.[currentIndex.value].children.map(
    (item: any) => item.name
  );
  const seriesData = allData.value?.[currentIndex.value].children.map((item: any) => {
    return {
      name: item.name,
      value: item.value,
      children: item.children,
    };
  });
  const dataOption: EChartsOption = {
    series: [
      {
        data: seriesData,
      },
    ],
    legend: {
      show: true,
      data: legendData,
    },
  };
  instance?.setOption(dataOption);
};

const screenAdapter = () => {
  titleFontSize.value = ((hot_ref.value?.offsetWidth ?? 0) / 100) * 3.6;
  const adapterOption: EChartsOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize.value,
      },
    },
    legend: {
      itemWidth: titleFontSize.value / 2,
      itemHeight: titleFontSize.value / 2,
      itemGap: titleFontSize.value / 2,
      textStyle: {
        fontSize: titleFontSize.value,
      },
    },
    series: [
      {
        radius: titleFontSize.value * 4.5,
        center: ["50%", "60%"],
      },
    ],
  };
  instance?.setOption(adapterOption);
  instance?.resize();
};

const toLeft = () => {
  currentIndex.value--;
  if (currentIndex.value < 0) {
    currentIndex.value = (allData.value?.length ?? 1) - 1;
  }
  updateChart();
};
const toRight = () => {
  currentIndex.value++;
  if (currentIndex.value > (allData.value?.length ?? 1) - 1) {
    currentIndex.value = 0;
  }
  updateChart();
};
</script>

<style lang="less" scoped>
.arr-left,
.arr-right {
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  z-index: 10;
  color: white;
  cursor: pointer;
}
.arr-left {
  left: 10%;
}
.arr-right {
  right: 10%;
}
.cat-name {
  position: absolute;
  left: 80%;
  bottom: 20px;
  color: white;
}
</style>
