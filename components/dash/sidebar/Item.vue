<template>
  <v-list-item>
    <v-list-item-title v-text="title" class="text-subtitle-2" />
  </v-list-item>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
