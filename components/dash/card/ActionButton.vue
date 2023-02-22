<template>
  <v-btn
    variant="outlined"
    size="small"
    icon
    color="white"
    class="ma-2"
    @click="dialog = true"
  >
    <v-tooltip activator="parent" :text="tooltip" location="top center" />
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
  tooltip: {
    type: String,
    required: true,
  },
});
const dialog = ref(false);
</script>

<style scoped></style>
