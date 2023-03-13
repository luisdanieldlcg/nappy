<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="11">
        <!-- <v-toolbar
          class="rounded-xl"
          color="backgroubnd"
          density="compact"
          :height="80"
          style="position: fixed; z-index: 1; top: 65px"
        >
   
        </v-toolbar> -->
        <v-card elevation="0" :border="true">
          <v-toolbar color="white" class="pl-8" density="compact">
            <slot name="prepend" />
            <v-app-bar-nav-icon :icon="header.icon" class="bg-surface" />
            <p class="text-h5 pa-6 text-grey-subtitle font-weight-medium">
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
}
defineProps<{
  header: DashPageHeader;
}>();
</script>
