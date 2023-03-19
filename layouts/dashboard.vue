<template>
  <v-row justify="center">
    <v-col cols="11">
      <v-card color="background" elevation="0">
        <v-toolbar class="ml-9" color="background" density="compact">
          <v-tooltip location="bottom">
            <template #activator="{ props }">
              <v-avatar
                v-bind="props"
                color="white"
                :icon="'mdi-menu'"
                size="48"
                class="ma-4"
                @click="store.overlapSidebar = !store.overlapSidebar"
                style="cursor: pointer"
              />
            </template>
            <span>Toggle Sidebar</span>
          </v-tooltip>
          <slot name="prepend" />
          <v-tooltip text="Go back" location="bottom" v-if="header.canGoBack">
            <template #activator="{ props }">
              <v-avatar
                v-bind="props"
                color="transparent"
                :icon="'mdi-arrow-left'"
                size="48"
                class="ma-4"
                @click="$router.back()"
                style="cursor: pointer"
              />
            </template>
          </v-tooltip>
          <v-app-bar-nav-icon :icon="header.icon" class="bg-surface" />
          <p
            class="text-h5 pa-6 text-grey-subtitle font-weight-medium text-no-wrap"
          >
            {{ header.title }}
          </p>

          <slot name="append" />
        </v-toolbar>
        <slot></slot>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useDashStore } from "~~/stores/dash.store";

export interface DashPageHeader {
  title: string;
  icon: string;
  canGoBack?: true;
}
defineProps<{
  header: DashPageHeader;
}>();
const store = useDashStore();
// const toggleIcon = computed(() => {
//   return store.sidebarCollapsed
//     ? "mdi-chevron-double-right"
//     : "mdi-chevron-double-left";
// });
</script>
