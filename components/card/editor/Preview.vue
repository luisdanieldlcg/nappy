<template>
  <v-card
    :width="300"
    height="400"
    class="text-left"
    elevation="0"
    :border="true"
  >
    <preview
      v-if="realtimePreview"
      :width="300"
      :height="160"
      :image="cardEditor.imageCropPreview?.image"
      :coordinates="cardEditor.imageCropPreview?.coordinates"
    />
    <CardHeader v-else :avatar-size="100" :image="cover" :max-height="160" />

    <v-card-text class="pl-4 pt-3">
      <div class="text-grey-subtitle text-center">
        <div class="mt-14">
          <v-chip> {{ card.label }} </v-chip>
        </div>
        <h1 class="mt-4 text-no-wrap">
          {{ card.firstName + " " + card.lastName }}
        </h1>
        <p class="text-h6 mt-2">{{ card.jobTitle }}</p>
        <p class="text-h6">{{ card.company }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Preview } from "vue-advanced-cropper";
import { ICardDTO } from "~~/api/dtos/card.dto";
import { useCardEditorStore } from "~~/stores/card-editor.store";

defineProps<{
  card: ICardDTO;
  cover: string;
  realtimePreview: boolean;
}>();
const cardEditor = useCardEditorStore();
</script>
