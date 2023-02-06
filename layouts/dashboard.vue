<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="9" class="pa-0">
        <DashContentHeader
          :title="currentPage.title"
          :icon="currentPage.titleIcon"
          :render-create-button="currentPage.withCreateButton"
        />
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
