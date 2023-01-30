<template>
  <v-snackbar :timeout="5000" variant="tonal">
    <slot></slot>
    <template #actions>
      <v-btn @click="$emit('close')" variant="text" color="dark" elevation="0"
        ><span class="font-weight-bold">Close</span></v-btn
      >
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
defineEmits(["close"]);
</script>

<style scoped></style>
