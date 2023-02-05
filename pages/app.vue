<template>
  <DashAppbar />
  <DashSidebar />
  <DashContent />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const expandDrawer = ref(false);
</script>

<style></style>
