<template>
  <v-card
    :width="CARD_WIDTH"
    height="400"
    class="text-left"
    elevation="0"
    :border="true"
    style="padding: 0; overflow-x: hidden"
  >
    <preview
      v-if="isEditingImage"
      :width="300"
      :height="160"
      :image="imageCropPreview?.image"
      :coordinates="imageCropPreview?.coordinates"
    />
    <CardHeader v-else :avatar-size="100" :height="160" :card="cardState" />
    <v-card-text class="pl-4 pt-3">
      <div class="text-grey-subtitle text-center">
        <div class="mt-14">
          <v-chip> {{ cardState.label }} </v-chip>
        </div>
        <h1 class="mt-4 text-no-wrap">
          {{ cardState.firstName + " " + cardState.lastName }}
        </h1>
        <p class="text-h6 mt-2">{{ cardState.jobTitle }}</p>
        <p class="text-h6">{{ cardState.company }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Preview } from "vue-advanced-cropper";
const CARD_WIDTH = 300;
const store = useCardEditorStore();
const { cardState, isEditingImage, imageCropPreview } = storeToRefs(store);

</script>
