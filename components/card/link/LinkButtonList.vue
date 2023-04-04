<template>
  <p style="font-size: 13px; font-weight: bold" class="text-center ma-2">
    {{ title }}
  </p>
  <v-row justify="center">
    <v-col v-for="entry in fields" cols="2" class="mt-5">
      <CardLinkButton
        :label="entry.label"
        :icon="entry.icon"
        @click="$emit('field-click', entry)"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { LinkData } from "../editor/LinkForm.vue";

defineEmits<{
  (e: "field-click", field: LinkData): void;
}>();
defineProps<{
  title: string;
  fields: LinkData[];
}>();
</script>

<style scoped></style>
