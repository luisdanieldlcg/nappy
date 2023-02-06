<template>
  <v-navigation-drawer class="rounded-xl" floating>
    <h1 class="text-h6 font-weight-bold mt-3 text-center">Nappy</h1>
    <v-list
      nav
      class="justify-center pa-6"
      density="compact"
      active-color="red-lighten-2"
    >
      <DashSidebarItem
        v-for="entry in pages"
        :prepend-icon="entry.sidebarItemIcon"
        :title="entry.title"
        :to="entry.targetRoute"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { dashboardPages } from "~~/config/dashboard";
const pages = dashboardPages;
const drawer = ref(true);
</script>

<style scoped></style>
