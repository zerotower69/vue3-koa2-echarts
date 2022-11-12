<template>
  <div class="screen-container" :style="containerStyle">
    <header class="screen-header">
      <div>
        <img :src="headerSrc" alt="" />
      </div>
      <span class="logo">
        <img :src="logoSrc" alt="" />
      </span>
      <span class="title">电商平台实时监控系统</span>
      <div class="title-right">
        <img :src="themeSrc" class="qiehuan" @click="handleChangeTheme" />
        <span class="datetime">{{ datetime }}</span>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top" :class="[fullScreenStatus.trend ? 'fullscreen' : '']">
          <!-- 销量趋势图表 -->
          <Trend ref="trend"></Trend>
          <div class="resize">
            <!-- icon -->
            <span
              :class="[
                'iconfont',
                fullScreenStatus.trend ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
              @click="changeSize('trend')"
            ></span>
          </div>
        </div>
        <div id="left-bottom" :class="[fullScreenStatus.seller ? 'fullscreen' : '']">
          <!-- 商家销售金额图表 -->
          <Seller ref="seller"></Seller>
          <div class="resize">
            <!-- icon -->
            <span
              :class="[
                'iconfont',
                fullScreenStatus.seller ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
              @click="changeSize('seller')"
            ></span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top" :class="[fullScreenStatus.map ? 'fullscreen' : '']">
          <!-- 商家分布图表 -->
          <Map ref="map"></Map>
          <div class="resize">
            <!-- icon -->
            <span
              :class="[
                'iconfont',
                fullScreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
              @click="changeSize('map')"
            ></span>
          </div>
        </div>
        <div id="middle-bottom" :class="[fullScreenStatus.rank ? 'fullscreen' : '']">
          <!-- 地区销量排行图表 -->
          <Rank ref="rank"></Rank>
          <div class="resize">
            <!-- icon -->
            <span
              :class="[
                'iconfont',
                fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
              @click="changeSize('rank')"
            ></span>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.hot ? 'fullscreen' : '']">
          <!-- 热销商品占比图表 -->
          <Hot ref="hot"></Hot>
          <div class="resize">
            <!-- icon -->
            <span
              :class="[
                'iconfont',
                fullScreenStatus.hot ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
              @click="changeSize('hot')"
            ></span>
          </div>
        </div>
        <div id="right-bottom" :class="[fullScreenStatus.stock ? 'fullscreen' : '']">
          <!-- 库存销量分析图表 -->
          <Stock ref="stock"></Stock>
          <div class="resize">
            <!-- icon -->
            <span
              :class="[
                'iconfont',
                fullScreenStatus.stock ? 'icon-compress-alt' : 'icon-expand-alt',
              ]"
              @click="changeSize('stock')"
            ></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import Hot from "@/components/Hot.vue";
import Map from "@/components/Map.vue";
import Trend from "@/components/Trend.vue";
import Seller from "@/components/Seller.vue";
import Stock from "@/components/Stock.vue";
import Rank from "@/components/Rank.vue";
import { useSocket } from "@/utils/socket_service";
import {
  onMounted,
  onBeforeMount,
  onUnmounted,
  reactive,
  computed,
  ref,
  getCurrentInstance,
  nextTick,
} from "vue";
import { useMainStore } from "@/store";
import { getThemeValue } from "@/utils/theme_utils";
//定义每一个图表的一个全屏状态
let fullScreenStatus = reactive<Record<string, boolean>>({
  trend: false,
  seller: false,
  map: false,
  rank: false,
  hot: false,
  stock: false,
});

interface CustomMethods {
  screenAdaptor: () => void;
}

onBeforeMount(() => {
  //注册接收到数据的回调函数
  useSocket()?.registerCallback("fullScreen", recvData);
  useSocket()?.registerCallback("themeChange", recvThemeChange);
});
onMounted(() => {
  console.log(getCurrentInstance()?.refs);
});
onUnmounted(() => {
  useSocket()?.unRegisterCallback("fullScreen");
  useSocket()?.unRegisterCallback("themeChange");
});

const theme = computed(() => useMainStore().theme);
const logoSrc = computed(() => "/static/img/" + getThemeValue(theme.value).logoSrc);
const headerSrc = computed(
  () => "/static/img/" + getThemeValue(theme.value).headerBorderSrc
);
const themeSrc = computed(() => "/static/img/" + getThemeValue(theme.value).themeSrc);

const datetime = computed(() => {
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  let month: number | string = dateObj.getMonth() + 1;
  let date: number | string = dateObj.getDate();
  month = filter(month);
  date = filter(date);
  function filter(value: any) {
    return value < 10 ? "0" + value : "" + value;
  }
  let hour: number | string = dateObj.getHours();
  let minite: number | string = dateObj.getMinutes();
  let second: number | string = dateObj.getSeconds();
  hour = filter(hour);
  minite = filter(minite);
  second = filter(second);
  return year + "-" + month + "-" + date + " " + hour + ":" + minite + ":" + second;
});

const containerStyle = computed(() => {
  return {
    backgroundColor: getThemeValue(theme.value).backgroundColor,
    color: getThemeValue(theme.value).titleColor,
  };
});
const vm = getCurrentInstance();
// console.log("logoSrc===>", logoSrc.value);
const changeSize = (chartName: string) => {
  //   console.log(fullScreenStatus.value);
  fullScreenStatus[chartName] = !fullScreenStatus[chartName];
  //   toRef("fullScreenStatus", fullScreenStatus);
  nextTick(() => {
    vm?.refs[chartName]?.screenAdapter();
  });
  const targetValue = fullScreenStatus[chartName];
  useSocket()?.send({
    action: "fullScreen",
    socketType: "fullScreen",
    chartName: chartName,
    value: targetValue,
  });
};
//接受到全屏数据的处理
const recvData = (data: Record<string, any>) => {
  //   console.log("fullScreen===>", data);
  //哪个图表
  const chartName = data.chartName;
  const targetValue = data.value;
  fullScreenStatus[chartName] = targetValue;
  nextTick(() => {
    vm?.refs[chartName]?.screenAdapter();
  });
};
//接受到主题改变的做些什么
const recvThemeChange = () => {
  useMainStore().changeTheme();
};
//手动修改主题
const handleChangeTheme = () => {
  //   useMainStore().changeTheme();
  useSocket()?.send({
    action: "themeChange",
    socketType: "themeChange",
    chartName: "",
  });
};
</script>

<style lang="less" scoped>
.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
  z-index: 100;
}

.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}

.screen-header {
  width: 100%;
  height: 8%;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }

  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }

  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
