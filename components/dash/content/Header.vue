<template>
  <v-list-item class="pl-8">
    <template #prepend>
      <v-avatar
        color="surface"
        :icon="'mdi-arrow-left'"
        size="48"
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
  </v-list-item>
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
