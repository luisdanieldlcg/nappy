<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="9" class="pa-0">
        <DashContentHeader
          v-if="currentPage"
          :title="currentPage.title"
          :icon="currentPage.icon"
          :render-create-button="currentPage.renderCreateButton"
        />
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { dashPageHeaders } from "~~/config/dash/header";
const headers = dashPageHeaders;
const route = useRoute();
const currentPage = computed(() => {
  return headers.find((entry) => entry.target === route.path)!;
});
</script>
