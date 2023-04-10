<template>
  <v-row class="mb-1">
    <v-col cols="2" class="pa-0 pt-2">
      <v-btn @click="onCancel" class="elevation-0">
        <Icon name="mdi-arrow-left"/>
        <v-tooltip text="Cancel" location="bottom" activator="parent" />
      </v-btn>
    </v-col>
    <v-col cols="8">
      <h4 class="font-weight-medium text-grey-subtitle">Edit your Image</h4>
    </v-col>
    <v-col cols="2" class="pa-0 pt-2">
      <v-btn @click="onCrop" class="elevation-0">
        <Icon name="mdi-check"/>
        <v-tooltip text="Save changes" location="bottom" activator="parent" />
      </v-btn>
    </v-col>
  </v-row>
  <v-divider></v-divider>
  <h5 class="text-grey-subtitle mt-2 font">Scroll to zoom the Cropper</h5>
</template>

<script setup lang="ts">
import { useCardEditorStore } from "~~/stores/card-editor.store";
const editor = useCardEditorStore();
const image = useImageEditor();

const onCancel = () => {
  editor.isEditingImage = false;
  editor.view = 1;
};
const onCrop = () => {
  editor.isEditingImage = false;
  editor.view = 1;
  image.preview?.canvas?.toBlob((blob) => {
    if (!blob) return;
    switch (image.imageSlot) {
      case ImageType.Cover:
        editor.card.coverImage = blob;
        editor.coverImagePreview = URL.createObjectURL(blob);
        break;
      case ImageType.Avatar:
        editor.card.avatarImage = blob;
        editor.avatarImagePreview = URL.createObjectURL(blob);
        break;
    }
  });
};
</script>

<style scoped></style>
