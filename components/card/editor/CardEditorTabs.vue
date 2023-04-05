<template>
  <v-tabs v-model="editor.view" class="mb-5" grow>
    <v-tab v-for="(tab, i) in tabs" :value="i" class="text-capitalize">
      <p class="font-weight-bold" style="font-size: 15px">{{ tab.label }}</p>
      <v-icon class="ml-2" :icon="tab.icon" />
    </v-tab>
  </v-tabs>
  <v-window v-model="editor.view">
    <v-window-item v-for="tab in tabs">
      <component :is="tab.component" />
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
const editor = useCardEditorStore();
const tabs = [
  {
    label: "General",
    component: resolveComponent("CardEditorGeneralView"),
    icon: "mdi-account-outline",
  },
  {
    label: "Visuals",
    component: resolveComponent("CardEditorVisualsView"),
    icon: "mdi-palette-outline",
  },
  {
    label: "Links",
    component: resolveComponent("LinksView"),
    icon: "mdi-link-variant",
  },
];
</script>

<style scoped></style>
