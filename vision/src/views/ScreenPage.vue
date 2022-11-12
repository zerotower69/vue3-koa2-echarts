<template>
  <div class="screen-container" :style="containerStyle">
    <header class="screen-header"></header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top" :class="[fullScreenStatus.trend ? 'fullScreen' : '']">
          <!-- 销量趋势图表 -->
          <Trend ref="trend"></Trend>
          <div class="resize">
            <!-- icon -->
            <span @click="changeSize('trend')"></span>
          </div>
        </div>
        <div id="left-bottom" :class="[fullScreenStatus.seller ? 'fullScreen' : '']">
          <!-- 商家销售金额图表 -->
          <Seller ref="seller"></Seller>
          <div class="resize">
            <!-- icon -->
            <span @click="changeSize('seller')"></span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top" :class="[fullScreenStatus.map ? 'fullScreen' : '']">
          <!-- 商家分布图表 -->
          <Map ref="map"></Map>
          <div class="resize">
            <!-- icon -->
            <span @click="changeSize('map')"></span>
          </div>
        </div>
        <div id="middle-bottom" :class="[fullScreenStatus.rank ? 'fullScreen' : '']">
          <!-- 地区销量排行图表 -->
          <Rank ref="rank"></Rank>
          <div class="resize">
            <!-- icon -->
            <span @click="changeSize('rank')"></span>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.hot ? 'fullScreen' : '']">
          <!-- 热销商品占比图表 -->
          <Hot ref="hot"></Hot>
          <div class="resize">
            <!-- icon -->
            <span @click="changeSize('hot')"></span>
          </div>
        </div>
        <div id="right-bottom" :class="[fullScreenStatus.stock ? 'fullScreen' : '']">
          <!-- 库存销量分析图表 -->
          <Stock ref="stock"></Stock>
          <div class="resize">
            <!-- icon -->
            <span @click="changeSize('stock')"></span>
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
import { onMounted, onBeforeMount, onUnmounted, reactive, computed } from "vue";
import { useStore, mapState } from "vuex";
import { getThemeValue } from "@/utils/theme_utils";
//定义每一个图表的一个全屏状态
const fullScreenStatus = reactive({
  trend: false,
  seller: false,
  map: false,
  rank: false,
  hot: false,
  stock: false,
});

onBeforeMount(() => {
  //注册接收到数据的回调函数
  useSocket()?.registerCallback("fullScreen", recvData);
  useSocket()?.registerCallback("themeChange", recvThemeChange);
});

onUnmounted(() => {
  useSocket()?.unRegisterCallback("fullScreen");
  useSocket()?.unRegisterCallback("themeChange");
});

const theme = computed(() => useStore().state.theme);
const logoSrc = computed(() => "/static/img/" + getThemeValue(theme.value).logoSrc);
const headerSrc = computed(
  () => "/static/img/" + getThemeValue(theme.value).headerBorderSrc
);
const themeSrc = computed(() => "/static/img/" + getThemeValue(theme.value).themeSrc);

const containerStyle = computed(() => {
  return {
    backgroundColor: getThemeValue(theme.value).backgroundColor,
    color: getThemeValue(theme.value).titleColor,
  };
});

// console.log("logoSrc===>", logoSrc.value);
const changeSize = (chartName: string) => {};
//接受到全屏数据的处理
const recvData = (data: Record<string, any>) => {};
//接受到主题改变的做些什么
const recvThemeChange = () => {
  useStore().commit("changeTheme");
};
//手动修改主题
const handleChangeTheme = () => {
  useSocket()?.send({
    action: "themeChange",
    socketType: "themeChange",
    chartName: "",
    value: "",
  });
};
</script>

<style lang="less" scoped>
.fullScreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100px !important;
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
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
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
</style>
