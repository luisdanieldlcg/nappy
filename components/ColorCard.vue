<template>
  <v-card
    class="rounded-0"
    :class="{
      'multi-color': multiColor,
    }"
    width="30"
    height="30"
    elevation="0"
    style="border-radius: 6px !important"
  />
</template>

<script setup lang="ts">
defineProps({
  multiColor: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style scoped>
.multi-color {
  background-image: conic-gradient(
    #b71c1c 0%,
    #e53935 10%,
    #ef5350 20%,
    #e65100 30%,
    #ff8f00 40%,
    #ffb300 50%,
    #0d47a1 60%,
    #1976d2 70%,
    #42a5f5 80%,
    #1b5e20 90%,
    #388e3c 100%
  );
}
</style>
