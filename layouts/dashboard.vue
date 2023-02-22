<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="9" class="pa-0">
        <DashContentHeader v-if="header" :header="header" />
        <slot></slot>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { DashPageHeader } from "~~/config/dash/header";
defineProps<{
  header: DashPageHeader;
}>();
</script>
