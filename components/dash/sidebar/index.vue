<template>
  <v-navigation-drawer
    class="rounded-xl"
    floating
    :rail="store.sidebarCollapsed"
    v-model:model-value="store.overlapSidebar"
    :permanent="smAndUp"
  >
    <h1 class="text-h6 font-weight-bold mt-6 text-center">
      {{ company }}
    </h1>
    <v-list
      nav
      class="justify-center"
      active-color="grey-darken-4"
      density="compact"
    >
      <DashSidebarItem
        v-for="entry in items"
        :prepend-icon="entry.icon"
        :title="entry.title"
        :to="entry.navigateTo"
        @click="entry.onClick"
      />
    </v-list>
    <v-btn
      :class="{
        'rotate-180': store.sidebarCollapsed,
      }"
      style="position: absolute; bottom: 0"
      icon
      :elevation="0"
      @click="store.sidebarCollapsed = !store.sidebarCollapsed"
    >
      <v-icon icon="mdi-chevron-double-left" />
    </v-btn>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useDashStore } from "~~/stores/dash.store";
const store = useDashStore();

const items = sidebarItems;
const { mdAndDown, smAndUp } = useDisplay();
watch(mdAndDown, () => {
  if (!store.sidebarCollapsed) {
    store.sidebarCollapsed = true;
  }
});
const company = computed(() => {
  return store.sidebarCollapsed ? "N" : "Nappy";
});
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
