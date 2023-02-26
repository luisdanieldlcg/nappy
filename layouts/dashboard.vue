<template>
  <DashContentHeader v-if="header" :header="header" />
  <slot></slot>
</template>
<script setup lang="ts">
import { DashPageHeader } from "~~/config/dash/header";
defineProps<{
  header: DashPageHeader;
}>();
</script>
