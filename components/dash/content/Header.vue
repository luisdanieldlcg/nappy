<template>
  <v-row justify="center" :class="handleSpacing" class="mr-12">
    <v-col :class="handleSpacing" style="height: 100px">
      <v-card elevation="0" :min-width="400">
        <v-toolbar color="background" density="compact" :height="90">
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
          <v-avatar
            class="ml-2"
            icon="mdi-check"
            color="surface"
            size="36"
            style="cursor: pointer"
          />
        </v-toolbar>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import { DashPageHeader } from "~~/config/dash/header";
const { width } = useDisplay();
const props = defineProps<{
  header: DashPageHeader;
}>();
const handleSpacing = computed(() => {
  if (props.header.title.length <= 6) {
    return { "ml-16": true };
  }
  return {
    "ml-16": width.value >= 600,
  };
});

const route = useRoute();

const isNestedRoute = computed(() => {
  return route.path.includes("/cards/");
});
</script>

<style scoped></style>
