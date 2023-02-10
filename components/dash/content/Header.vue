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
        v-if="header.navigateTo"
        @click="navigate"
      />
    </v-container>
  </v-list-item>
</template>

<script setup lang="ts">
import { dashNestedRoutes } from "~~/config/dash/routes";
import { DashPageHeader } from "~~/config/dash/header";

const props = defineProps<{
  header: DashPageHeader;
}>();
const isNestedRoute = computed(() => {
  const route = useRoute();
  return dashNestedRoutes.some((path) => route.path.startsWith(path));
});
const navigate = () => {
  navigateTo(props.header.navigateTo);
};
</script>

<style scoped></style>
