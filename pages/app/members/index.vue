<template>
  <NuxtLayout name="dashboard" :header="header"> </NuxtLayout>
</template>

<script setup lang="ts">
import { DashPageHeader } from '~~/layouts/dashboard.vue';

const header: DashPageHeader = {
  title: "Members",
  icon: "mdi-account-group-outline",
};
</script>

<style scoped></style>
