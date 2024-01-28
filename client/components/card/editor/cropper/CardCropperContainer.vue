<template>
  <div class="mt-3 pr-10 text-center">
    <CardCropperHeader
      @cancel="$emit('cancel')"
      @crop="(blob) => $emit('crop', blob)"
    />
    <div class="cropper-wrapper mt-3">
      <v-img
        class="image-background"
        :style="{ backgroundImage: 'url(' + imageEditor.image + ')' }"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (event: "cancel"): void;
  (event: "crop", blob: Blob): void;
}>();
const imageEditor = useImageEditor();
</script>

<style lang="scss">
.cropper-wrapper {
  overflow: hidden;
  position: relative;
  height: 300px;
  background: black;
  border-radius: 5%;
}
.image-background {
  position: absolute;
  width: 100%;
  height: 80%;
  left: 0px;
  top: 30px;

  background-size: cover;
  background-position: 50%;
  filter: blur(5px);
}
</style>
