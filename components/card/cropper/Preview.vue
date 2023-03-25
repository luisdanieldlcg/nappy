<template>
  <CardContainer
    :height="400"
    :width="300"
    :imageHeight="160"
    :avatar-size="100"
  >
    <template #header v-if="imageSlot === ImageType.Cover">
      <Preview
        :width="300"
        :height="160"
        :image="preview?.image"
        :coordinates="preview?.coordinates"
      />
    </template>
    <template #avatar v-if="imageSlot === ImageType.Avatar">
      <v-avatar size="84">
        <Preview
          :width="120"
          :height="120"
          :image="preview?.image"
          :coordinates="preview?.coordinates"
        />
      </v-avatar>
    </template>
  </CardContainer>
</template>

<script setup lang="ts">
import { Preview } from "vue-advanced-cropper";
const { preview, image, imageSlot } = storeToRefs(useImageEditor());
</script>
