<template>
  <CropperContainer>
    <cropper
      :src="imageEditorStore.image"
      style="position: relative"
      ref="imageCropper"
      class="cropper"
      background-class="cropper-background"
      image-restriction="stencil"
      :stencil-component="stencilComponent"
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
        v-for="btn in cropperButtons"
        :icon="btn.icon"
        :tooltip="btn.tooltip"
        @click="btn.action"
      />
    </div>
  </CropperContainer>
</template>

<script setup lang="ts">
import {
  Cropper,
  CropperResult,
  CircleStencil,
  RectangleStencil,
} from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { ImageCropper } from "./types";

const imageCropper = ref<ImageCropper | undefined>();
const imageEditorStore = useImageEditor();

const stencilComponent = computed(() => {
  if (imageEditorStore.imageSlot === ImageType.Cover) {
    return RectangleStencil;
  }
  return CircleStencil;
});

// TODO: bind this to the card width and height
const aspectRatio = computed(() => {
  return 300 / 160;
});
onUnmounted(() => {
  imageEditorStore.$reset();
});
onMounted(() => {
  // imageEditorStore.setOriginalImage();
  maximize();
});
const onCropperUpdate = (result: CropperResult) => {
  imageEditorStore.update(result);
};
const rotate = (angle: number) => {
  if (!imageCropper.value) return;
  imageCropper.value.rotate(angle);
};

const zoom = (factor: number) => {
  if (!imageCropper.value) return;
  imageCropper.value.zoom(factor);
};

/**
 * This function will maximize the cropper.
 * It will take the center of the cropper and set the width and height to the image size
 * It will also set the left and top to the center of the cropper
 * After all that the cropper will be maximized
 */
const maximize = () => {
  if (!imageCropper.value) return;
  const cropper = imageCropper.value;
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

const cropperButtons = [
  {
    icon: "mdi-magnify-plus-outline",
    tooltip: "Zoom In",
    action: () => zoom(2),
  },
  {
    icon: "mdi-magnify-minus-outline",
    tooltip: "Zoom Out",
    action: () => zoom(0.5),
  },
  {
    icon: "mdi-rotate-right",
    tooltip: "Rotate Clockwise",
    action: () => rotate(90),
  },
  {
    icon: "mdi-rotate-left",
    tooltip: "Rotate Counter-Clockwise",
    action: () => rotate(-90),
  },
  {
    icon: "mdi-border-radius",
    tooltip: "Maximize",
    action: () => maximize(),
  },
];
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

.cropper-background {
  background: none;
}
</style>
