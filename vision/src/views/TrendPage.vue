<template>
  <div class="com-page">
    <Trend></Trend>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Trend from "@/components/Trend.vue";
export default defineComponent({
  components: {
    Trend,
  },
});
</script>
