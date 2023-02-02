<template>
  <v-card
    class="text-center profile-card"
    :elevation="0"
    min-height="300"
    min-width="200"
  >
    <slot></slot>
  </v-card>
</template>
<script lang="ts" setup>
const borderColor = "#e9e8e8";
</script>
<style lang="scss" scoped>
.profile-card {
  background-color: rgb(249, 248, 248) !important;
  border: 1.5px solid v-bind(borderColor) !important;
}
</style>
