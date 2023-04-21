<template>
  <DashSidebar />
  <template v-if="card.loadTracker.gettingAll">
    <v-row justify="center" align="center">
      <v-progress-circular indeterminate :size="144" class="mb-16" :width="2">
        Loading...
      </v-progress-circular>
    </v-row>
  </template>
  <DashContent v-else />
</template>

<script lang="ts" setup>
import { useCardStore } from "~~/stores/card.store";
definePageMeta({
  middleware: "auth",
});
const card = useCardStore();
</script>
