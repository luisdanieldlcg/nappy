<template>
  <v-btn variant="outlined" size="small" icon color="white" class="ma-1">
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
