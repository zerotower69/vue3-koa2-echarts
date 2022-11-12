<template>
  <div class="com-container">
    <div class="com-chart" ref="stock_ref"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onUnmounted, defineExpose, watch } from "vue";
import { ECharts, EChartsOption, graphic, SeriesOption } from "echarts";
import { render } from "@/utils/chart";
import { useSocket } from "@/utils/socket_service";
import { computed } from "@vue/reactivity";
import { useMainStore } from "@/store";
// import { $ref } from "vue/macros";
const stock_ref = ref<HTMLElement | null>(null);
let instance: ECharts | null = null;
const allData = ref<Array<any>>([]);
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
  useSocket()?.registerCallback("stockData", getData);
});

onMounted(() => {
  initChart();
  //need data from server
  useSocket()?.send({
    action: "getData",
    socketType: "stockData",
    chartName: "stock",
    value: "",
  });
  window.addEventListener("resize", screenAdapter);
});

onUnmounted(() => {
  window.removeEventListener("resize", screenAdapter);
  useSocket()?.unRegisterCallback("stockData");
  timer.value && clearInterval(timer.value);
});

//init the chart
const initChart = () => {
  instance = render(stock_ref.value, theme.value);
  const initOption: EChartsOption = {
    title: {
      text: "▎ 库存和销量分析",
      top: 20,
      left: 20,
    },
  };
  instance?.setOption(initOption);
  //鼠标移动到图表的上方终止定时器，否则启动定时器
  instance?.on("mouseover", () => {
    timer.value && clearInterval(timer.value);
  });
  instance?.on("mouseout", () => {
    startInterval();
  });
};

const getData = async (ret: any) => {
  allData.value = ret;
  // console.log(ret);
  updateChart();
  startInterval();
  screenAdapter();
};
const showData = ref<Array<any>>([]);
const currentIndex = ref(0);
const updateChart = () => {
  const centerArr = [
    ["18%", "40%"],
    ["50%", "40%"],
    ["82%", "40%"],
    ["34%", "75%"],
    ["66%", "75%"],
  ];
  const colorArr = [
    ["#4FF778", "#0BA82C"],
    ["#E5DD45", "#E8B11C"],
    ["#E8821C", "#E55445"],
    ["#5052EE", "#AB6EE5"],
    ["#23E5E5", "#2E72BF"],
  ];
  //处理图表所需的数据
  const val = allData.value;
  const start = currentIndex.value * 5;
  const end = (currentIndex.value + 1) * 5;
  showData.value = val?.slice(start, end);
  // console.log("showData===>", showData);
  const seriesArr = showData.value?.map((item: any, index: number) => {
    const options: EChartsOption = {
      type: "pie",
      radius: [110, "100"], //Array<number|string>
      center: centerArr[index],
      hoverAnimation: false,
      labelLine: {
        show: false, //隐藏指示线,也叫视觉引导线
      },
      label: {
        position: "center",
        color: colorArr[index][0],
        // color: "#fff",
        //视频中的写在data中的name是有问题的，label不能一直高亮显示，目前
        //我这样的写法是成功的
        formatter: function (args: any) {
          return item.name + "\n\n" + item.sales;
        },
      },
      emphasis: {
        label: {
          show: true,
          color: colorArr[index][0],
          formatter: function (args: any) {
            return item.name + "\n\n" + item.sales;
          },
        },
      },
      data: [
        {
          name: item.name,
          value: item.sales,
          itemStyle: {
            color: new graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0, //0%时的颜色值
                color: colorArr[index][0],
              },
              {
                offset: 1, //100%的颜色值
                color: colorArr[index][1],
              },
            ]),
          },
        },
        {
          value: item.stock,
          itemStyle: {
            color: "#333843",
          },
        },
      ],
    };
    return options;
  });
  const dataOption = {
    series: seriesArr,
  };
  // instance?.dispose();
  // instance = render(stock_ref.value, "chalk");
  instance?.setOption(dataOption);
};

const screenAdapter = () => {
  const titleFontSize = ((stock_ref.value?.offsetWidth ?? 0) / 100) * 3.6;
  const innerRadius = titleFontSize * 2.8;
  const outterRadius = innerRadius * 1.125;
  const seriesArr = showData.value.map((item) => {
    const options: SeriesOption = {
      type: "pie",
      radius: [outterRadius, innerRadius],
      label: {
        fontSize: titleFontSize / 2,
      },
    };
    return options;
  });
  const adapterOption: EChartsOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize,
      },
    },
    series: seriesArr,
  };
  instance?.setOption(adapterOption);
  instance?.resize();
};
const startInterval = () => {
  timer.value && clearInterval(timer.value);
  timer.value = setInterval(() => {
    currentIndex.value++;
    if (currentIndex.value > 1) {
      currentIndex.value = 0;
    }
    updateChart();
    screenAdapter();
  }, 5000);
};
defineExpose({
  screenAdapter,
});
</script>
