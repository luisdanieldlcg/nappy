<template>
  <NuxtLayout name="dashboard" :header="header">
    <template #header> Settings </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
const header = {
  title: "Overview",
  icon: "mdi-chart-line",
  target: "/app/overview",
};
</script>

<style scoped></style>
