<template>
  <div class="text-center mb-5">
    <v-btn elevation="0" :icon="icon" color="background" size="large">
    </v-btn>
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
