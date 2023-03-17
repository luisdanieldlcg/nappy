<template>
  <div>
    <cropper
      ref="editor"
      class="image-cropper mt-16 mb-16"
      background-class="image-cropper__background"
      foreground-class="image-cropper__foreground"
      :src="editorStore.profilePicImage"
      image-restriction="stencil"
      :stencil-size="{
        width: 150,
        height: 150,
      }"
      :stencil-props="{
        lines: {},
        handlers: {},
        movable: false,
        resizable: false,
        aspectRatio: 1,
        previewClass: 'image-cropper__stencil',
      }"
      :resize-image="{
        adjustStencil: false,
      }"
      :debounce="false"
      :default-size="defaultSize"
    />
    <v-slider
      v-model="zoomController.slider"
      thumb-label="always"
      append-icon="mdi-magnify-plus-outline"
      prepend-icon="mdi-magnify-minus-outline"
    >
      <template #thumb-label>
        <v-icon icon="mdi-magnify-expand"></v-icon>
      </template>
    </v-slider>
  </div>
</template>

<script setup lang="ts">
import {
  Cropper,
  CropperResult,
  ImageSize,
  Point,
  SizeRestrictions,
  Transform,
} from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { useCardEditorStore } from "~~/stores/card-editor.store";
type ImageEditor = {
  imageSize: ImageSize;
  sizeRestrictions: SizeRestrictions;
  getResult: () => CropperResult;
  setCoordinates: (transform: Transform | Transform[]) => void;
  refresh: () => void;
  zoom: (factor: number, center?: Point) => void;
  move: (left: number, top?: number) => void;
  rotate: (angle: number) => void;
  flip: (horizontal: boolean, vertical?: boolean) => void;
  reset: () => void;
};
const editor = ref<ImageEditor | undefined>();
const editorStore = useCardEditorStore();
const zoomController = reactive({
  slider: 0,
  zoom: 0,
});

watch(zoomController, (_, __) => {
  // editorStore.updateResult(result);
  if (!editor.value) return;
  const cropper = editor.value;
  // if (cropper.imageSize.height < cropper.imageSize.width) {
  //   const imageHeight = cropper.imageSize.height;
  //   const minHeight = cropper.sizeRestrictions.minHeight;
  //   const hDelta = imageHeight - minHeight;
  //   cropper.zoom(
  //     (imageHeight - zoomController.slider * hDelta) /
  //       (imageHeight - zoomController.zoom * hDelta)
  //   );
  // } else {
  //   const imageWidth = cropper.imageSize.width;
  //   const minWidth = cropper.sizeRestrictions.minWidth;
  //   const vDelta = imageWidth - minWidth;

  //  This zoom method is used to scale visible area relative to its scale.
  // The first parameter factor is the number, that represents scale factor (i.e. 1.1 to resize to 110%, 0.8 to resize to 80%).
  console.log("original: ", zoomController.slider);
  console.log(zoomController.slider / 100);
  cropper.zoom(-(zoomController.slider * 0.3));
});
const defaultSize = (obj: { imageSize: ImageSize; visibleArea: boolean }) => {
  return {
    width: Math.min(obj.imageSize.height, obj.imageSize.width),
    height: Math.min(obj.imageSize.height, obj.imageSize.width),
  };
};
const onChange = (result: CropperResult) => {};
</script>

<style lang="scss">
.image-cropper {
  width: 300px;
  height: 300px;
  &__background {
    background-color: #edf2f4;
  }
  &__foreground {
    background-color: #edf2f4;
  }
  &__stencil {
    border: solid 5px rgb(65, 65, 65);
  }
}
</style>
