<template>
  <LinkBuilder mode="edit" :link="link">
    <template #content="{ link, updateTitle }">
      <!-- <TextField
        @input="
          (e) => {
            updateTitle(e.target.value);
          }
        "
        :model-value="link?.title"
        variant="underlined"
        label="Username / URL"
        type="not-empty"
      /> -->
    </template>
  </LinkBuilder>
</template>

<script setup lang="ts">
// TODO: handle title state in here instead of LinkBuilder
import { LinkDTO } from "~~/api/dtos/card.dto";
defineProps({
  link: {
    type: Object as PropType<LinkDTO>,
    required: true,
  },
});
</script>
