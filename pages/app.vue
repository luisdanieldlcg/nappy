<template>
  <DashAppbar @toggle-drawer="toggleDrawer = !toggleDrawer" />
  <DashSidebar v-model="toggleDrawer" />
  <DashContent />
</template>

<script setup lang="ts">
import { useCardStore } from "~~/stores/card.store";
const view = new ViewState();
definePageMeta({
  middleware: "auth",
});
const toggleDrawer = ref(false);
const card = useCardStore();
onMounted(async () => {
  console.log("fetchingALL");
  await card.fetchAll(view);
});

</script>

<style></style>
