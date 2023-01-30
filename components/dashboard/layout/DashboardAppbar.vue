<template>
  <v-app-bar :elevation="0" color="background">
    <v-app-bar-nav-icon @click="$emit('showDrawer')" />
    <v-list-item
      nav
      prepend-avatar="https://apprecs.org/ios/images/app-icons/256/24/851990820.jpg"
    >
      <v-list-item-title style="font-size: 24px; padding: 8px">
        Nap<span class="text-grey">py</span>
      </v-list-item-title>
      <template #prepend> </template>
    </v-list-item>
    <v-spacer></v-spacer>
    <div class="mt-5 mr-7">
      <ThemeSwitcher />
    </div>
    <v-btn icon>
      <v-avatar color="#5f6368" size="small">
        <span class="text-white">L</span>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
defineEmits(["showDrawer"]);
</script>

<style scoped></style>
