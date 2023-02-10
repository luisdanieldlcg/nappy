<template>
  <v-app-bar :elevation="0" color="background" :order="1">
    <template #prepend>
      <v-app-bar-nav-icon @click="$emit('toggleDrawer')" />
    </template>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script setup lang="ts">
defineEmits(["toggleDrawer"]);
</script>

<style scoped></style>
