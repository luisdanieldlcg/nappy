<template>
  <div class="mb-8">
    <v-avatar
      color="white"
      size="108"
      style="position: absolute; transform: translate(-50%, -86%); z-index: 1"
    >
      <v-avatar :image="image" size="100"> </v-avatar>
    </v-avatar>
  </div>
</template>

<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
