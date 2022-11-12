<template>
  <div class="com-page">
    <Stock></Stock>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Stock from "@/components/Stock.vue";
export default defineComponent({
  components: {
    Stock,
  },
});
</script>
