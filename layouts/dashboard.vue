<template>
  <DashContentHeader v-if="header" :header="header" />
  <v-container>

  <slot></slot>
  </v-container>
</template>
<script setup lang="ts">
import { DashPageHeader } from "~~/config/dash/header";
defineProps<{
  header: DashPageHeader;
}>();
</script>
