<template>
  <v-row justify="space-around">
    <v-col offset="1" cols="10">
      <v-card elevation="0" :min-width="150">
        <v-toolbar color="background">
          <v-avatar
            v-if="isNestedRoute"
            color="surface"
            :icon="'mdi-arrow-left'"
            size="48"
            class="ma-4"
            @click="$router.back()"
            style="cursor: pointer"
          />
          <v-app-bar-nav-icon :icon="header.icon" class="bg-surface" />
          <p class="text-h5 pa-6 text-grey-subtitle font-weight-medium">
            {{ header.title }}
          </p>
          <v-tooltip :text="header.createResourceTooltip" location="bottom">
            <template #activator="{ props }">
              <v-icon
                v-if="header.createResourcePath"
                icon="mdi-plus"
                v-bind="props"
                style="cursor: pointer"
                @click="navigateTo(header.createResourcePath)"
              ></v-icon>
            </template>
          </v-tooltip>
        </v-toolbar>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { DashPageHeader } from "~~/config/dash/header";

defineProps<{
  header: DashPageHeader;
}>();
const route = useRoute();

const isNestedRoute = computed(() => {
  return route.path.includes("/cards/");
});
</script>

<style scoped></style>
