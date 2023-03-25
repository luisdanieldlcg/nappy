<template>
  <CardContainer
    :height="400"
    :width="300"
    :imageHeight="160"
    :avatar-size="100"
  >
    <template #header>
      <preview
        :width="300"
        :height="160"
        :image="imageEditor.preview?.image"
        :coordinates="imageEditor.preview?.coordinates"
      />
    </template>
  </CardContainer>
</template>

<script setup lang="ts">
import { Preview } from "vue-advanced-cropper";
const imageEditor = useImageEditor();
</script>
