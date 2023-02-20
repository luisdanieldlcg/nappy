<template>
  <DashAppbar @toggle-drawer="toggleDrawer = !toggleDrawer" />
  <DashSidebar v-model="toggleDrawer" />
  <DashContent />
</template>

<script setup lang="ts">
import { useUserStore } from "~~/stores/user.store";

definePageMeta({
  middleware: "auth",
});
const toggleDrawer = ref(false);
const user = useUserStore();
onMounted(async () => {
  await user.fetchAll();
});
</script>

<style></style>
