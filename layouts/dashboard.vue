<template>
  <v-row justify="center">
    <v-col cols="11">
      <v-card color="background" elevation="0">
        <v-toolbar class="ml-11" color="background" density="compact">
          <v-tooltip location="bottom">
            <template #activator="{ props }">
              <v-avatar
                v-bind="props"
                color="white"
                size="48"
                class="ma-4"
                @click="store.overlapSidebar = !store.overlapSidebar"
                style="cursor: pointer"
              >
                <Icon name="mdi:arrow-collapse" />
              </v-avatar>
            </template>
            <span>Toggle Sidebar</span>
          </v-tooltip>
          <slot name="prepend" />
          <v-app-bar-nav-icon class="bg-surface">
            <template #default>
              <Icon :name="header.icon" />
            </template>
          </v-app-bar-nav-icon>
          <v-tooltip text="Go back" location="bottom" v-if="header.canGoBack">
            <template #activator="{ props }">
              <v-avatar
                class="ml-5"
                v-bind="props"
                @click="$router.back()"
                style="cursor: pointer"
              >
                <Icon
                  name="solar:round-arrow-left-outline"
                  color="black"
                  size="32"
                />
              </v-avatar>
            </template>
          </v-tooltip>

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
