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
        <CropperPreview />
      </template>
      <template #right>
        <Cropper />
      </template>
    </DividedGrid>
    <DividedGrid v-else>
      <template #left>
        <CardCover :card="cardMapper" :light-shadow="true" />
      </template>
      <template #right>
        <CardEditorFields />
      </template>
    </DividedGrid>
  </v-card>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";

const { isEditingImage, card } = storeToRefs(useCardEditorStore());
defineProps<{
  card: ICardDTO;
}>();

const cardMapper = computed(() => {
  return {
    ...card.value,
    // handle undefined coverImage and avartarImage error with URL.createObjectURL
    coverImage: card.value.coverImage
      ? URL.createObjectURL(card.value.coverImage)
      : "",
    avatarImage: card.value.avatarImage
      ? URL.createObjectURL(card.value.avatarImage)
      : "",
  };
});
</script>
