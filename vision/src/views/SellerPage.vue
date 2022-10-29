<!-- 针对 /sellerpage 这条路径显示出来的 -->
<template>
    <div class="com-page">
    <seller></seller>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Seller from '@/components/Seller.vue'
export default defineComponent({
  components: {
    Seller
  }
})
</script>
