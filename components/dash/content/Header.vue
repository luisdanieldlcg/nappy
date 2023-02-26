<template>
  <v-app-bar
    elevation="0"
    color="background"
    density="compact"
    class="pa-10 mt-0"
  >
    <template #prepend>
      <v-avatar
        color="surface"
        :icon="'mdi-arrow-left'"
        size="48"
        class="ma-4"
        v-if="isNestedRoute"
        @click="$router.back()"
        style="cursor: pointer"
      />
      <v-avatar color="surface" :icon="header.icon" size="48" />
    </template>
    <v-container class="d-flex">
      <p class="text-h5 d-inline">{{ header.title }}</p>
      <DashCircularActionButton
        icon="mdi-plus"
        v-if="isCardsViewRoute"
        @click="navigateCreateCard"
      />
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { DashPageHeader } from "~~/config/dash/header";

defineProps<{
  header: DashPageHeader;
}>();
const route = useRoute();

const isNestedRoute = computed(() => {
  return route.path.includes("/cards/");
});
const isCardsViewRoute = computed(() => {
  return route.path === "/app/cards";
});
const navigateCreateCard = () => {
  navigateTo("/app/cards/create");
};
</script>

<style scoped></style>
