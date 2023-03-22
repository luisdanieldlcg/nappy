<template>
  <v-row class="mb-1">
    <v-col cols="2" class="pa-0 pt-2">
      <v-btn @click="onCancel" class="elevation-0">
        <v-icon icon="mdi-arrow-left " size="24" />
        <v-tooltip text="Cancel" location="bottom" activator="parent" />
      </v-btn>
    </v-col>
    <v-col cols="8">
      <h4 class="font-weight-medium text-grey-subtitle">Edit your Image</h4>
    </v-col>
    <v-col cols="2" class="pa-0 pt-2">
      <v-btn @click="onCrop" class="elevation-0">
        <v-icon icon="mdi-check " size="24" />
        <v-tooltip text="Save changes" location="bottom" activator="parent" />
      </v-btn>
    </v-col>
  </v-row>
  <v-divider></v-divider>
</template>

<script setup lang="ts">
import { useCardEditorStore } from "~~/stores/card-editor.store";
const editor = useCardEditorStore();
const image = useImageEditor();

const onCancel = () => {
  editor.isEditingImage = false;
  image.resetImage();
};
const onCrop = () => {
  editor.isEditingImage = false;
  const result = image.preview?.canvas?.toDataURL();
  if (result) {
    editor.cardState.coverImage = result;
  }
};
</script>

<style scoped></style>
