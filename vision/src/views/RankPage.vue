<template>
  <div class="com-page">
    <Rank></Rank>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Rank from "@/components/Rank.vue";
export default defineComponent({
  components: {
    Rank,
  },
});
</script>
