<template>
  <CardCover :card="card" mode="normal" :can-drag="false">
    <template #header v-if="imageSlot === ImageType.Cover">
      <Preview
        :width="320"
        :height="160"
        :image="preview?.image"
        :coordinates="preview?.coordinates"
      />
    </template>
    <template #avatar v-if="imageSlot === ImageType.Avatar">
      <CardCoverAvatar :size="110">
        <v-avatar :size="100">
          <Preview
            :width="100"
            :height="100"
            :image="preview?.image"
            :coordinates="preview?.coordinates"
          />
        </v-avatar>
      </CardCoverAvatar>
    </template>
  </CardCover>
</template>

<script setup lang="ts">
import { Preview } from "vue-advanced-cropper";
import { Card } from "~/stores/card-editor.store";
const { preview, imageSlot } = storeToRefs(useImageEditor());
defineProps<{
  card: Card;
}>();
</script>
