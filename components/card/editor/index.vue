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
        <CardCover :card="cardMapper" />
      </template>
      <template #right>
        <CardEditorFields />
      </template>
    </DividedGrid>
  </v-card>
</template>

<script setup lang="ts">
const { isEditingImage, card, coverImagePreview, avatarImagePreview } =
  storeToRefs(useCardEditorStore());

const cardMapper = computed(() => {
  return {
    ...card.value,
    coverImage: coverImagePreview.value,
    avatarImage: avatarImagePreview.value,
  };
});
</script>
