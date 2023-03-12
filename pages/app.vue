<template>
  <DashAppbar />
  <DashSidebar />
  <DashContent />
</template>

<script setup lang="ts">
import { useCardStore } from "~~/stores/card.store";
const view = new ViewState();
definePageMeta({
  middleware: "auth",
});
const card = useCardStore();
onMounted(async () => {
  await card.fetchAll();
});
</script>
