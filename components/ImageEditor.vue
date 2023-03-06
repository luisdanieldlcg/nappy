<template>
  <cropper
    class="cropper mt-5"
    :src="editorStore.profilePicImage"
    :stencil-props="{
      handlers: {},
      movable: false,
      resizable: false,
      aspectRatio: 1,
    }"
    :resize-image="{
      adjustStencil: false,
    }"
    :stencil-size="{
      width: 144,
      height: 144,
    }"
    image-restriction="stencil"
    :debounce="false"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { Cropper, CropperResult } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { useCardEditorStore } from "~~/stores/card-editor.store";

const editorStore = useCardEditorStore();
const onChange = (result: CropperResult) => {
  editorStore.updateResult(result);
}
</script>

<style scoped></style>
