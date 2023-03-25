<template>
  <div class="mt-3 pr-10 text-center">
    <CardCropperHeader />
    <div class="cropper-wrapper mt-3">
      <div
        :style="{ backgroundImage: 'url(' + imageEditor.image + ')' }"
        class="image-background"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  width: calc(100% + 20px);
  height: calc(80% + 10px);
  left: -10px;
  top: 20px;

  background-size: cover;
  background-position: 50%;
  filter: blur(5px);
}
</style>
