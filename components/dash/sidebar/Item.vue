<template>
  <v-list-item active-class="active-item">
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

<style>
.active-item {
  font-size: 18px;
  font-weight: bold !important;
}
</style>
