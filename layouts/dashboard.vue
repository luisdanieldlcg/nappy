<template>
  <v-list-item>
    <p class="text-h5">{{ currentPage.title }}</p>
    <template #prepend>
      <v-avatar color="surface" :icon="currentPage.titleIcon" size="48" />
    </template>
  </v-list-item>
  <slot></slot>
</template>

<script setup lang="ts">
import { dashboardPages } from "~~/config/dashboard";

const pages = dashboardPages;
const route = useRoute();
const currentPage = pages.find((entry) => entry.targetRoute === route.path)!;
</script>
