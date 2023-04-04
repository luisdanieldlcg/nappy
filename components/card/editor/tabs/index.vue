<template>
  <v-tabs v-model="view" class="mb-5">
    <v-tab v-for="(tab, i) in tabs" :value="i" class="text-capitalize">
      <p class="font-weight-bold" style="font-size: 15px;">{{ tab.label }}</p>
      <v-icon class="ml-4" :icon="tab.icon" />
    </v-tab>
  </v-tabs>
  <v-window v-model="view">
    <v-window-item v-for="tab in tabs">
      <component :is="tab.component" />
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
const view = ref(null);
const tabs = [
  {
    label: "General",
    component: defineAsyncComponent(
      () => import("~/components/card/editor/Fields.vue")
    ),
    icon: "mdi-format-list-bulleted",
  },
  {
    label: "Links",
    component: defineAsyncComponent(
      () => import("~~/components/card/editor/section/LinksSection.vue")
    ),
    icon: "mdi-link-variant",
  },
];
</script>

<style scoped></style>
