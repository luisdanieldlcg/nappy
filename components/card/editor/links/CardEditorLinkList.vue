<template>
  <v-row justify="center">
    <v-col v-for="entry in fields" cols="2" class="mt-5">
      <CardLinkButton
        :label="entry"
        :icon="findIcon(entry)"
        @click="$emit('field-click', entry)"
      />
    </v-col>
  </v-row>
</template>
<v-icon icon="fas fa-plus" />

<script setup lang="ts">
import { LinkData } from "./CardEditorLinkForm.vue";
const findIcon = (field: string) => {
  const icon = field.toLowerCase();
  if (icon === "tiktok") {
    return "fa fa-tiktok";
  }
  return `mdi-${icon}`;
};
defineEmits<{
  (e: "field-click", field: LinkData): void;
}>();
defineProps<{
  fields: string[];
}>();
</script>
