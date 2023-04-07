<template>
  <v-row justify="center">
    <v-col v-for="entry in fields" cols="2" class="mt-5">
      <CardLinkButton
        :label="entry"
        :icon="nativeLinksIconMap[entry]"
        @click="$emit('field-click', entry)"
      />
    </v-col>
  </v-row>
</template>
<v-icon icon="fas fa-plus" />

<script setup lang="ts">
import { CardLink } from '~~/api/dtos/card.dto';

defineEmits<{
  (e: "field-click", field: CardLink): void;
}>();
defineProps<{
  fields: string[];
}>();
</script>
