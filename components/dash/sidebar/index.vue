<template>
  <v-navigation-drawer
    class="rounded-xl"
    floating
    :rail="store.sidebarCollapsed"
  >
    <v-row>
      <v-col>
        <h1 class="text-h6 font-weight-bold mt-6 text-center">
          {{ company }}
        </h1>
        <!---TODO PUT THIS TOGGLER IN BELOW AND IN THE HEADER OF THE CONTENT PREPEND-->
      </v-col>
      <v-col>
        <v-btn
          icon
          :elevation="0"
          @click="store.sidebarCollapsed = !store.sidebarCollapsed"
        >
          <v-icon :icon="toggleIcon"></v-icon>
        </v-btn>
      </v-col>
    </v-row>

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
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import { sidebarItems } from "~~/config/dash/sidebar";
import { useDashStore } from "~~/stores/dash.store";
const store = useDashStore();

const items = sidebarItems;
const { mdAndDown, mdAndUp } = useDisplay();
watch(mdAndDown, () => {
  if (!store.sidebarCollapsed) {
    store.sidebarCollapsed = true;
  }
});
const company = computed(() => {
  return store.sidebarCollapsed ? "N" : "Nappy";
});
const toggleIcon = computed(() => {
  return store.sidebarCollapsed
    ? "mdi-chevron-double-right"
    : "mdi-chevron-double-left";
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
