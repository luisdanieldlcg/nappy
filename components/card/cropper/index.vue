<template>
  <div class="mt-3 pr-10 text-center">
    <CardCropperHeader />
    <h5 class="text-grey-subtitle mt-2 font">Scroll to zoom the Cropper</h5>
    <div class="cropper-wrapper mt-3">
      <div
        :style="{ backgroundImage: 'url(' + image + ')' }"
        class="image-background"
      />
      <cropper
        :src="image"
        style="position: relative"
        ref="editor"
        class="cropper"
        background-class="cropper-background"
        image-restriction="stencil"
        :stencil-size="{
          width: 120,
          height: 120,
        }"
        :stencil-props="{
          handlers: {},
          movable: false,
          resizable: false,
          aspectRatio,
        }"
        :debounce="false"
        @change="onCropperUpdate"
      />
      <div class="btn-col">
        <CardCropperButton
          icon="mdi-magnify-plus-outline"
          @click="zoom(2)"
          tooltip="Zoom In"
        />
        <CardCropperButton
          icon="mdi-magnify-minus-outline"
          @click="zoom(0.5)"
          tooltip="Zoom Out"
        />
        <CardCropperButton
          icon="mdi-rotate-right"
          @click="rotate(90)"
          tooltip="Rotate Clockwise"
        />
        <CardCropperButton
          icon="mdi-rotate-left"
          @click="rotate(-90)"
          tooltip="Rotate Counter-Clockwise"
        />
        <CardCropperButton
          icon="mdi-border-radius"
          @click="maximize()"
          tooltip="Maximize"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cropper, CropperResult } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { ImageCropper } from "./types";
// TODO: bind this to the card width and height
const aspectRatio = computed(() => {
  return 300 / 160;
});
defineProps({
  image: {
    type: String,
    required: true,
  },
});

const editor = ref<ImageCropper | undefined>();
const store = useImageEditor();
onMounted(() => {
  store.setOriginalImage();
});
const onCropperUpdate = (result: CropperResult) => {
  store.update(result);
};
const rotate = (angle: number) => {
  if (!editor.value) return;
  editor.value.rotate(angle);
};

const zoom = (factor: number) => {
  if (!editor.value) return;
  editor.value.zoom(factor);
};

const maximize = () => {
  if (!editor.value) return;
  const cropper = editor.value;
  const center = {
    left: cropper.coordinates.left + cropper.coordinates.width / 2,
    top: cropper.coordinates.top + cropper.coordinates.height / 2,
  };
  cropper.setCoordinates([
    ({ coordinates, imageSize }) => ({
      width: imageSize.width,
      height: imageSize.height,
    }),
    ({ coordinates, imageSize }) => ({
      left: center.left - coordinates.width / 2,
      top: center.top - coordinates.height / 2,
    }),
  ]);
};
</script>

<style lang="scss">
.btn-col {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.cropper {
  width: 450px;
  height: 320px;
}

.cropper-wrapper {
  overflow: hidden;
  position: relative;
  height: 300px;
  background: black;
  border-radius: 5%;
}
.cropper-background {
  background: none;
}
.image-background {
  position: absolute;
  width: calc(100% + 20px);
  height: calc(80% + 10px);
  left: -10px;
  top: 20px;

  background-size: cover;
  background-position: 50%;
  filter: blur(5px);
}
</style>
