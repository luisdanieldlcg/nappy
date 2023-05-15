<template>
  <v-card
    color="white"
    elevation="0"
    class="pr-6"
    :min-width="200"
    :max-width="1100"
  >
    <DividedGrid v-if="isEditingImage">
      <template #left>
        <CardCropperPreview :card="card" />
      </template>
      <template #right>
        <CardCropper @cancel="cancelCrop" @crop="cropImage" />
      </template>
    </DividedGrid>
    <DividedGrid v-else>
      <template #left>
        <CardCover :card="card" mode="normal" :can-drag="true" />
      </template>
      <template #right>
        <CardEditorTabs />
      </template>
    </DividedGrid>
  </v-card>
</template>

<script setup lang="ts">
import { Card } from "~~/stores/card-editor.store";

const props = defineProps<{
  card: Card;
}>();
const editor = useCardEditorStore();
onMounted(() => {
  editor.setCard(props.card);
});
onUnmounted(() => {
  editor.onEditorClosed();
});

const { isEditingImage, card } = storeToRefs(editor);

const cancelCrop = () => {
  editor.isEditingImage = false;
  editor.view = 1;
};

const cropImage = (blob: Blob) => {
  editor.isEditingImage = false;
  editor.view = 1;
  const imageEditor = useImageEditor();
  switch (imageEditor.imageSlot) {
    case ImageType.Cover:
      editor.coverImageBlob = blob;
      editor.card.coverImage = URL.createObjectURL(blob);
      break;
    case ImageType.Avatar:
      editor.avatarImageBlob = blob;
      editor.card.avatarImage = URL.createObjectURL(blob);
      break;
  }
};
</script>
