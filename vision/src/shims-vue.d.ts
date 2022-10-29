/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  import type axios from 'axios'
  import * as echarts from 'echarts'
  const component: DefineComponent<{}, {}, any>
  interface ComponentCustomProperties{
    $http: axios,
    $echarts:echarts
  }
  export default component
}

// declare module 'vue' {
//   interface ComponentCustomProperties {
//     $filters: any
//   }
// }
