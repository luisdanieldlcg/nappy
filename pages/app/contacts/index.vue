<template>
  <NuxtLayout name="dashboard" :header="header"> </NuxtLayout>
</template>

<script setup lang="ts">
const header = {
  title: "Contacts",
  icon: "mdi-contacts-outline",
  target: "/app/contacts",
};
</script>

<style scoped></style>
