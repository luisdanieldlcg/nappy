<template>
  <NuxtLayout name="dashboard" :header="header"> </NuxtLayout>
</template>

<script setup lang="ts">
import { DashPageHeader } from '~~/layouts/dashboard.vue';


const header: DashPageHeader = {
  title: "Contacts",
  icon: "typcn:contacts",
};
</script>

<style scoped></style>
