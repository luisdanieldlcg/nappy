<template>
  <CardEditorPreview>
    <template #header>
      <preview
        :width="300"
        :height="160"
        :image="imageEditor.preview?.image"
        :coordinates="imageEditor.preview?.coordinates"
      />
    </template>
  </CardEditorPreview>
</template>

<script setup lang="ts">
import { Preview } from "vue-advanced-cropper";
const imageEditor = useImageEditor();
</script>
