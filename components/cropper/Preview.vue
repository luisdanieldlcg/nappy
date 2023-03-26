<template>
  <CardCover :card="cardObj">
    <template #header v-if="imageSlot === ImageType.Cover">
      <Preview
        :width="300"
        :height="160"
        :image="preview?.image"
        :coordinates="preview?.coordinates"
      />
    </template>
    <template #avatar v-if="imageSlot === ImageType.Avatar">
      <CardCoverAvatar :size="112">
        <v-avatar :size="100">
          <Preview
            :width="120"
            :height="120"
            :image="preview?.image"
            :coordinates="preview?.coordinates"
          />
        </v-avatar>
      </CardCoverAvatar>
    </template>
  </CardCover>
</template>

<script setup lang="ts">
import { Preview } from "vue-advanced-cropper";
const { preview, image, imageSlot } = storeToRefs(useImageEditor());
const { card } = storeToRefs(useCardEditorStore());
const cardObj = computed(() => {
  return {
    ...card.value,
    coverImage: card.value.coverImage
      ? URL.createObjectURL(card.value.coverImage)
      : undefined,
    avatarImage: card.value.avatarImage
      ? URL.createObjectURL(card.value.avatarImage)
      : undefined,
  };
});
</script>
