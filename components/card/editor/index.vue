<template>
  <v-card
    color="white"
    elevation="0"
    class="pr-6"
    :min-width="200"
    :max-width="1000"
  >
    <DividedGrid v-if="isEditingImage">
      <template #left>
        <CardCropperPreview />
      </template>
      <template #right>
        <CardCropper />
      </template>
    </DividedGrid>
    <DividedGrid v-else>
      <template #left>
        <CardContainer
          :height="400"
          :width="300"
          :imageHeight="160"
          :avatar-size="100"
        />
      </template>
      <template #right>
        <CardEditorFields />
      </template>
    </DividedGrid>
  </v-card>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";

const { isEditingImage } = storeToRefs(useCardEditorStore());

defineProps<{
  card: ICardDTO;
}>();
</script>
