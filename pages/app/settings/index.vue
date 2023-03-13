<template>
  <NuxtLayout name="dashboard" :header="header">
    <template #header> Settings </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { DashPageHeader } from '~~/layouts/dashboard.vue';

const header: DashPageHeader = {
  title: "Settings",
  icon: "mdi-cog-outline",
};
</script>

<style scoped></style>
