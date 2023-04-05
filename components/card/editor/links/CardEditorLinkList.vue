<template>
  <v-row justify="center">
    <v-col v-for="entry in fields" cols="2" class="mt-5">
      <CardLinkButton
        :label="entry"
        :icon="`mdi-${entry}`"
        @click="$emit('field-click', entry)"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { LinkData } from "./CardEditorLinkForm.vue";

defineEmits<{
  (e: "field-click", field: LinkData): void;
}>();
defineProps<{
  fields: string[];
}>();
</script>
