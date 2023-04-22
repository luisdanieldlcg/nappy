<template>
  <v-tabs
    v-model="editor.view"
    class="mb-5"
    @update:model-value="onTabUpdate"
    grow
  >
    <v-tab v-for="(tab, i) in tabs" :value="i" class="text-capitalize">
      <p class="font-weight-bold" style="font-size: 14px">{{ tab.label }}</p>
      <Icon :name="tab.icon" class="ml-3" size="20" />
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
const onTabUpdate = () => {
  editor.handleTabChanges();
};
const tabs = [
  {
    label: "General",
    component: resolveComponent("CardEditorGeneralView"),
    icon: "solar:pen-new-square-linear",
  },
  {
    label: "Visuals",
    component: resolveComponent("CardEditorVisualsView"),
    icon: "nimbus:color-palette",
  },
  {
    label: "Links",
    component: resolveComponent("LinksView"),
    icon: "solar:link-bold",
  },
  {
    label: "Others",
    component: resolveComponent("CardEditorOthers"),
    icon: "akar-icons:settings-horizontal",
  },
];
</script>
