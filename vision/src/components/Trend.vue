<template>
  <div class="com-container">
    <div class="title" :style="comStyle">
      <span>{{ "▎ " + showTitle }}</span>
      <span
        class="iconfont title-icon"
        :style="comStyle"
        @click="showChoice = !showChoice"
        >&#xe6eb;</span
      >
      <div class="select-con" v-show="showChoice" :style="marginStyle">
        <div
          class="select-item"
          v-for="(item, index) in selectTypes"
          :key="item.key"
          @click="handleSelect(item.key)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="com-chart" ref="trend"></div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted,
  onUnmounted,
  computed,
  watch,
  defineExpose,
} from "vue";
import { ECharts, EChartsOption, graphic, SeriesOption } from "echarts";
import { render } from "@/utils/chart";
import { useSocket } from "@/utils/socket_service";
import { useMainStore } from "@/store";
import { getThemeValue } from "@/utils/theme_utils";
// import { $ref } from "vue/macros";
const trend = ref<HTMLElement | null>(null);
let instance: ECharts | null = null;
let allData = ref<Record<any, any> | null>(null);
//完成下拉小控件
let showChoice = ref(false);
let choiceType = ref("map");
const selectTypes = computed(() => {
  if (!allData.value) {
    return [];
  } else {
    return allData.value?.type.filter((item: any) => {
      return item.key !== choiceType.value;
    });
  }
});
const showTitle = computed(() => {
  if (!allData.value) {
    return "";
  } else {
    const item = allData.value.type.filter((item: any) => {
      return item.key === choiceType.value;
    });
    return item?.[0].text;
  }
});

//设置给标题的样式
const comStyle = computed(() => {
  return {
    fontSize: titleFontSize.value + "px",
    color: getThemeValue(theme.value).titleColor,
  };
});
const marginStyle = computed(() => {
  return {
    marginLeft: titleFontSize.value + "px",
    backGroundColor: getThemeValue(theme.value).titleBackGroundColor,
  };
});

// const selectItemColor = computed(() => {});
//标题额字体大小
const titleFontSize = ref(0);

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
  instance = render(trend.value, theme.value);
  const initOption: EChartsOption = {
    grid: {
      left: "3%",
      top: "35%",
      right: "4%",
      bottom: "1%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis", //打开工具提示
    },
    //图例控制
    legend: {
      left: "20px",
      top: "20%",
      icon: "circle",
    },
    xAxis: {
      type: "category",
      boundaryGap: false, //紧挨边缘
    },
    yAxis: {
      type: "value",
    },
  };
  instance?.setOption(initOption);
  screenAdapter();
};

const getData = async (ret: any) => {
  allData.value = ret;
  updateChart();
};

const updateChart = () => {
  // 半透明的颜色值
  const colorArr1 = [
    "rgba(11, 168, 44, 0.5)",
    "rgba(44, 110, 255, 0.5)",
    "rgba(22, 242, 217, 0.5)",
    "rgba(254, 33, 30, 0.5)",
    "rgba(250, 105, 0, 0.5)",
  ];
  // 全透明的颜色值
  const colorArr2 = [
    "rgba(11, 168, 44, 0)",
    "rgba(44, 110, 255, 0)",
    "rgba(22, 242, 217, 0)",
    "rgba(254, 33, 30, 0)",
    "rgba(250, 105, 0, 0)",
  ];
  //处理数据
  const val = allData.value;
  const timeArr = val?.common.month; //类目轴的数据
  const valueArr = val?.[choiceType.value].data; //数值轴的数据
  const seriesArr = valueArr.map((item: any, index: number) => {
    const options: SeriesOption = {
      name: item.name,
      type: "line",
      data: item.data,
      stack: "map",
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: colorArr1[index],
          },
          {
            offset: 1,
            color: colorArr2[index],
          },
        ]),
      },
    };
    return options;
  });
  //图例的数据
  const legendArr = valueArr.map((item: any) => {
    return item.name;
  });
  const dataOption: EChartsOption = {
    xAxis: {
      data: timeArr,
    },
    legend: {
      data: legendArr,
    },
    series: seriesArr,
  };
  instance?.setOption(dataOption);
};

const screenAdapter = () => {
  //不用nextTick无法获取正确的标题宽度
  titleFontSize.value = ((trend.value?.offsetWidth ?? 0) / 100) * 3.6;
  const adapterOption: EChartsOption = {
    legend: {
      itemWidth: titleFontSize.value,
      itemHeight: titleFontSize.value,
      itemGap: titleFontSize.value,
      textStyle: {
        fontSize: titleFontSize.value / 2,
      },
    },
  };
  instance?.setOption(adapterOption);
  instance?.resize();
};

const handleSelect = (currentType: string) => {
  choiceType.value = currentType;
  updateChart();
  showChoice.value = false;
};
defineExpose({
  screenAdapter,
});
</script>

<style lang="less" scoped>
.title {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: white;
  .title-icon {
    margin-left: 10px;
    cursor: pointer;
  }
  .select-item {
    cursor: pointer;
  }
  .select-con {
    background-color: #222733;
  }
}
</style>
