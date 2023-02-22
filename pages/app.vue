<template>
  <DashAppbar @toggle-drawer="toggleDrawer = !toggleDrawer" />
  <DashSidebar v-model="toggleDrawer" />
  <DashContent />
</template>

<script setup lang="ts">
import { useCardStore } from "~~/stores/card.store";

definePageMeta({
  middleware: "auth",
});
const toggleDrawer = ref(false);
const user = useCardStore();
onMounted(async () => {
  await user.fetchAll();
});
</script>

<style></style>
