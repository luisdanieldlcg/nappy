<template>
  <div class="mt-10 pr-10">
    <cropper
      ref="editor"
      class="cropper"
      background-class="cropper-background"
      foreground-class=""
      :src="editorStore.profilePicImage"
      image-restriction="stencil"
      :stencil-size="{
        width: 60,
        height: 60,
      }"
      :stencil-props="{
        handlers: {},
        movable: false,
        resizable: false,
        aspectRatio: 300 / 160,
        previewClass: 'image-cropper__stencil',
      }"
      :resize-image="{
        adjustStencil: false,
      }"
      :debounce="false"
      @change="onCropperUpdate"
    />

    <!-- <v-slider
      v-model="zoomController.slider"
      thumb-label="always"
      append-icon="mdi-magnify-plus-outline"
      prepend-icon="mdi-magnify-minus-outline"
      @update:model-value="onSliderUpdate"
    >
      <template #thumb-label>
        <v-icon icon="mdi-magnify-expand"></v-icon>
      </template>
    </v-slider> -->
  </div>
  <!-- <v-btn
      variant="tonal"
      class="mb-6"
      location="bottom center"
      @click="onApply"
      >Apply</v-btn
    > -->
</template>

<script setup lang="ts">
import {
  Cropper,
  CropperResult,
  ImageSize,
  Point,
  Size,
  SizeRestrictions,
  Transform,
  VisibleArea,
} from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { useCardEditorStore } from "~~/stores/card-editor.store";

const editor = ref<ImageEditor | undefined>();
const editorStore = useCardEditorStore();

type ImageEditor = {
  imageSize: ImageSize;
  sizeRestrictions: SizeRestrictions;
  boundaries: Size;
  visibleArea: VisibleArea;
  getResult: () => CropperResult;
  setCoordinates: (transform: Transform | Transform[]) => void;
  refresh: () => void;
  zoom: (factor: number, center?: Point) => void;
  move: (left: number, top?: number) => void;
  rotate: (angle: number) => void;
  flip: (horizontal: boolean, vertical?: boolean) => void;
  reset: () => void;
};
const onCropperUpdate = (result: CropperResult) => {
  if (!editor.value) return;
  editorStore.updateResult(result);
};
const onApply = () => {
  if (!editor.value) return;
  const result = editor.value.getResult();
  editorStore.updateResult(result);
};
</script>

<style lang="scss">
.cropper-wrapper {
  border: solid rgb(112, 112, 112);
  height: 306px;
}
.cropper {
  width: 400px;
  height: 244px;
}

.image-background {
  position: absolute;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  left: -10px;
  top: -10px;
  background-size: cover;
  background-position: 50%;
  filter: blur(20px);
}
</style>
