<template>
  <div class="text-center mb-5">
    <v-btn :icon="icon" elevation="0" color="background" size="large" />
    <p style="font-size: 12px" class="mt-2">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>
