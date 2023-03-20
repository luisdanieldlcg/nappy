<template>
  <v-card
    :width="cardWidth"
    height="400"
    class="text-left"
    :border="true"
    style="
      padding: 0;
      overflow-x: hidden;
      box-shadow: 0 5px 15px 0 rgba(49, 49, 93, 0.13),
        0 15px 35px 0 rgba(49, 49, 93, 0.1);
    "
  >
    <preview
      v-if="selectedImage"
      :width="300"
      :height="160"
      :image="imageEditor.preview?.image"
      :coordinates="imageEditor.preview?.image"
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
const cardWidth = 300;
const store = useCardEditorStore();
const imageEditor = useImageEditor();
const { cardState, selectedImage } = storeToRefs(store);
</script>
