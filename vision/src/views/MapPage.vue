<template>
  <div class="com-page">
    <Map></Map>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Map from "@/components/Map.vue";
export default defineComponent({
  components: {
    Map,
  },
});
</script>
