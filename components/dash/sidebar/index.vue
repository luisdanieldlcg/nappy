<template>
  <v-navigation-drawer
    class="rounded-xl"
    floating
    :rail-width="92"
    :rail="store.sidebarCollapsed"
    permanent
  >
    <v-container class="pb-0 pt-6 toggle-drawer">
      <v-row>
        <v-col>
          <h1 class="text-h6 font-weight-bold mt-1 text-center">Nappy</h1>
        </v-col>
        <v-col>
          <v-btn
            icon
            :elevation="0"
            location="center"
            @click="store.sidebarCollapsed = !store.sidebarCollapsed"
            key="example"
          >
            <v-icon :icon="toggleIcon"></v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-list
      nav
      class="justify-center pa-6"
      active-color="grey-darken-4"
      density="comfortable"
    >
      <DashSidebarItem
        v-for="entry in items"
        :prepend-icon="entry.icon"
        :title="entry.title"
        :to="entry.navigateTo"
        @click="entry.onClick"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import { sidebarItems } from "~~/config/dash/sidebar";
import { useDashStore } from "~~/stores/dash.store";
const store = useDashStore();

const items = sidebarItems;
const toggleIcon = computed(() => {
  return store.sidebarCollapsed
    ? "mdi-chevron-double-right"
    : "mdi-chevron-double-left";
});
const { mdAndDown } = useDisplay();
watch(mdAndDown, () => {
  if (!store.sidebarCollapsed) {
    store.sidebarCollapsed = true;
  }
});
</script>

<style scoped>
.toggle-drawer {
  transition: 0.2s ease-out;
  display: flex;
  overflow: hidden;
}
</style>
