<template>
  <div class="com-container" @dblclick="restoreMap">
    <div class="com-chart" ref="mapEl"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onUnmounted, nextTick } from "vue";
import { ECharts } from "echarts";
import axios from "axios";
import { render, addMap } from "@/utils/chart";
import { useSocket } from "@/utils/socket_service";
import { getProvinceMapInfo } from "@/utils/map_utils";
// import { $ref } from "vue/macros";
const mapEl = ref<HTMLElement | null>(null);
let instance: ECharts | null = null;
let allData: Array<Record<string, any>> | null = null;
const mapData: Record<string, any> = {};
onBeforeMount(() => {
  useSocket()?.registerCallback("mapData", getData);
});

onMounted(() => {
  initChart();
  //   need data from server
  useSocket()?.send({
    action: "getData",
    socketType: "mapData",
    chartName: "map",
    value: "",
  });
  window.addEventListener("resize", screenAdapter);
});

onUnmounted(() => {
  window.removeEventListener("resize", screenAdapter);
  useSocket()?.unRegisterCallback("mapData");
});

//init the chart
const initChart = async () => {
  instance = render(mapEl.value, "chalk");
  //获取中国地图的矢量数据
  //由于我们的数据放在前台而不是koa2,
  const ret = await axios.get("http://localhost:8999/static/map/china.json");
  console.log(ret);
  addMap("china", ret.data);
  const initOption = {
    title: {
      text: "▎ 商家分布",
      left: 20,
      top: 20,
    },
    geo: {
      type: "map",
      map: "china",
      top: "5%",
      bottom: "5%",
      itemStyle: {
        areaColor: "#2E72BF",
        borderColor: "#333",
      },
    },
    legend: {
      left: "5%",
      bottom: "5%",
      orient: "vertical",
    },
  };
  instance?.setOption(initOption);
  //地图点击事件监听
  instance?.on("click", (arg) => {
    //arg.name //点击的省份数据
    const provinceInfo = getProvinceMapInfo(arg.name);
    if (!provinceInfo.key) return;
    const changeOption = {
      geo: {
        map: provinceInfo.key,
      },
    };
    // console.log(provinceInfo);
    //获取对应地图的矢量数据
    //判断当前所点击这个省份的矢量数据是否已经存在于mapData中
    if (!mapData[provinceInfo.key]) {
      axios.get("http://localhost:8999" + provinceInfo.path).then((resp) => {
        //   console.log(resp);
        const ret = resp;
        addMap(provinceInfo.key, ret.data);
        mapData[provinceInfo.key] = ret.data;
        instance?.setOption(changeOption);
      });
    } else {
      instance?.setOption(changeOption);
    }
  });
};

const getData = async (ret: any) => {
  allData = ret;
  //   console.log(allData);
  updateChart();
  screenAdapter();
};

const updateChart = () => {
  //deal data
  //   debugger;
  const seriesArr = allData?.map((item: any) => {
    //如果在地图中显示散点数据，请使用地图坐标系统
    return {
      type: "effectScatter",
      name: item.name,
      data: item.children,
      coordinateSystem: "geo",
      rippleEffect: {
        scale: 5, //涟漪效果的圆更大
        brushType: "stroke", //空心圆   ===>空心涟漪效果
      },
    };
  });
  const legendArr = allData?.map((item: any) => item.name);
  //   console.log("array==>", seriesArr);
  const dataOption = {
    series: seriesArr,
    legend: {
      data: legendArr,
    },
  };
  instance?.setOption(dataOption);
};

const screenAdapter = () => {
  nextTick(() => {
    const titleFontSize = ((mapEl.value?.offsetWidth ?? 0) / 100) * 3.6;
    const adapterOption = {
      title: {
        textStyle: {
          fontSize: titleFontSize,
        },
      },
      legend: {
        itemWidth: titleFontSize / 2,
        itemHeight: titleFontSize / 2,
        itemGap: titleFontSize / 2,
        textStyle: {
          fontSize: titleFontSize / 3,
        },
      },
    };
    instance?.setOption(adapterOption);
    instance?.resize();
  });
};
//回到中国地图
const restoreMap = () => {
  const restoreOption = {
    geo: {
      map: "china",
    },
  };
  instance?.setOption(restoreOption);
};
</script>