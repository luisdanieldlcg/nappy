<template>
  <v-app-bar :elevation="0" color="background" :order="1">
    <template #prepend>
      <v-app-bar-nav-icon @click="$emit('toggleDrawer')" />
    </template>
    <v-spacer></v-spacer>

    <!-- <v-list-item class="mr-16">
      <template #prepend>
        <v-avatar
          image="https://cdn.vuetifyjs.com/images/john.png"
          size="x-small"
        />
      </template>
      <v-list-item-title v-text="'John Doe'" class="font-weight-bold mt-2" />
    </v-list-item> -->
  </v-app-bar>
</template>

<script setup lang="ts">
defineEmits(["toggleDrawer"]);
</script>

<style scoped></style>
