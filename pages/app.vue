<template>
  <DashAppbar @toggle-drawer="toggleDrawer = !toggleDrawer" />
  <DashSidebar v-model="toggleDrawer" />
  <DashContent />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const toggleDrawer = ref(false);
</script>

<style></style>
