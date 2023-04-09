<template>
  <CardCover :card="cardObj" :mini="false">
    <template #header v-if="imageSlot === ImageType.Cover">
      <Preview
        :width="300"
        :height="160"
        :image="preview?.image"
        :coordinates="preview?.coordinates"
      />
    </template>
    <template #avatar v-if="imageSlot === ImageType.Avatar">
      <CardCoverAvatar :size="110">
        <v-avatar :size="100">
          <Preview
            :width="100"
            :height="100"
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
const { preview, imageSlot } = storeToRefs(useImageEditor());
const { card, coverImagePreview, avatarImagePreview } = storeToRefs(
  useCardEditorStore()
);

const cardObj = computed(() => {
  return {
    ...card.value,
    coverImage: coverImagePreview.value,
    avatarImage: avatarImagePreview.value,
  };
});
</script>
