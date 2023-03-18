<template>
  <template v-if="card.loadTracker.gettingAll">
    <v-row justify="center" align="center">
      <v-progress-circular indeterminate :size="144" class="mb-16" :width="2">
        Loading...
      </v-progress-circular>
    </v-row>
  </template>
  <template v-else>
    <!-- <DashAppbar /> -->
    <DashSidebar />
    <DashContent />
  </template>
</template>

<script lang="ts" setup>
import { useCardStore } from "~~/stores/card.store";
definePageMeta({
  middleware: "auth",
});
const card = useCardStore();
onMounted(async () => {
  await card.getAll();
});
</script>
