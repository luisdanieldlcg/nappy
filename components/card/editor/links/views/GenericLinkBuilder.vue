<template>
  <LinkBuilder mode="edit" :link="link">
    <template #content> </template>
  </LinkBuilder>
</template>

<script setup lang="ts">
import { LinkDTO } from '~~/api/dtos/card.dto';


defineProps({
  link: {
    type: Object as PropType<LinkDTO>,
    required: true,
  },
});
</script>
