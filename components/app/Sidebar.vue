<template>
  <v-navigation-drawer class="rounded-xl" floating>
    <h1 class="text-h6 font-weight-bold mt-3 text-center">Nappy</h1>

    <v-list nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard-outline"
        to="/"
        :ripple="false"
        density="compact"
      >
        <v-list-item-title
          v-text="'dsa'"
          class="text-subtitle-2"
        ></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts"></script>

<style scoped>
.item-active {
}
</style>
