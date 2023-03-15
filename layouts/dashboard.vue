<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="11">
        <v-card color="background" elevation="0">
          <v-toolbar color="background" class="pl-2 mt-4" density="compact">
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
  </v-container>
</template>

<script setup lang="ts">
export interface DashPageHeader {
  title: string;
  icon: string;
  canGoBack?: true;
}
defineProps<{
  header: DashPageHeader;
}>();
</script>
