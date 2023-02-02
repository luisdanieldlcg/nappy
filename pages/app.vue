<template>
  <div>
    <DashboardSidebar :rail="expandDrawer" />
    <DashboardAppbar @show-drawer="expandDrawer = !expandDrawer" />
    <DashboardContent />
    <v-navigation-drawer
      location="right"
      rail
      style="border: none"
      color="background"
      permanent
    >
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const expandDrawer = ref(false);
</script>

<style></style>
