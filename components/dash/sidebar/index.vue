<template>
  <v-navigation-drawer
    class="rounded-xl"
    floating
    :rail-width="92"
    :rail="rail"
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
            @click="rail = !rail"
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
const items = sidebarItems;
const rail = ref(false);
const toggleIcon = computed(() => {
  return rail.value ? "mdi-chevron-double-right" : "mdi-chevron-double-left";
});
const { mdAndDown } = useDisplay();
watch(mdAndDown, () => {
  if (!rail.value) {
    rail.value = true;
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
