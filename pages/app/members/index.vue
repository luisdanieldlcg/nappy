<template>
  <NuxtLayout name="dashboard" :header="header"> </NuxtLayout>
</template>

<script setup lang="ts">
const header = {
  title: "Members",
  icon: "mdi-account-group-outline",
  target: "/app/members",
};
</script>

<style scoped></style>
