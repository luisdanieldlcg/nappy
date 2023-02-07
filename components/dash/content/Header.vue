<template>
  <v-list-item class="pl-8">
    <template #prepend>
      <v-avatar color="surface" :icon="icon" size="48" />
    </template>
    <v-container class="d-flex">
      <p class="text-h5 d-inline">{{ title }}</p>
      <DashCreateCardButton v-if="renderCreateButton" />
    </v-container>
  </v-list-item>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
  renderCreateButton: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
