<template>
  <LinkBuilder mode="edit" :link="link">
    <template #content>
      <h1>phone</h1>
    </template>
  </LinkBuilder>
</template>

<script setup lang="ts">
import { LinkDTO } from "~~/api/dtos/card.dto";

const props = defineProps({
  link: {
    type: Object as PropType<LinkDTO>,
    required: true,
  },
});
const editor = useCardEditorStore();
</script>
