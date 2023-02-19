<template>
  <v-navigation-drawer class="rounded-xl" floating>
    <h1 class="text-h6 font-weight-bold mt-3 text-center">Nappy</h1>
    <v-list
      nav
      class="justify-center pa-6"
      active-color="grey-darken-4"
      density="comfortable"
    >
      <DashSidebarItem
        v-for="entry in items"
        :prepend-icon="entry.icon"
        :title="entry.title"
        :to="entry.navigateTo"
        @click="entry.onClick"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { sidebarItems } from "~~/config/dash/sidebar";
const items = sidebarItems;
</script>
