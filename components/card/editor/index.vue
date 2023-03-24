<template>
  <v-card
    color="white"
    elevation="0"
    class="pr-6"
    :min-width="200"
    :max-width="1000"
  >
    <CardCropperGrid v-if="isEditingImage" />
    <CardEditorGrid  v-else />
  </v-card>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";

const { isEditingImage } = storeToRefs(useCardEditorStore());

defineProps<{
  card: ICardDTO;
}>();


</script>

<style scoped></style>
