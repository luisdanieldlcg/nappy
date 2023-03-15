<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="11">
        <v-toolbar color="background" class="pl-2 mt-4" density="compact">
          <slot name="prepend" />
          <v-app-bar-nav-icon :icon="header.icon" class="bg-surface" />
          <p
            class="text-h5 pa-6 text-grey-subtitle font-weight-medium text-no-wrap"
          >
            {{ header.title }}
          </p>
          <slot name="append" />
        </v-toolbar>
        <v-card elevation="0" :border="true">
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
}
defineProps<{
  header: DashPageHeader;
}>();
</script>
