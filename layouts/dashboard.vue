<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="9" class="pa-0">
        <v-list-item class="pr-0 pl-8">
          <p class="text-h5">{{ currentPage.title }}</p>
          <template #prepend>
            <v-avatar color="surface" :icon="currentPage.titleIcon" size="48" />
          </template>
        </v-list-item>
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { dashboardPages } from "~~/config/dashboard";

const pages = dashboardPages;
const route = useRoute();
const currentPage = pages.find((entry) => entry.targetRoute === route.path)!;
</script>
