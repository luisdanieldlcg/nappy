<template>
  <v-card
    :width="300"
    height="400"
    class="text-left"
    elevation="0"
    :border="true"
  >
    <preview
      v-if="cardEditor.backgroundResult?.image"
      :width="300"
      :height="160"
      :image="cardEditor.backgroundResult?.image"
      :coordinates="cardEditor.backgroundResult?.coordinates"
    />
    <CardHeader v-else :avatar-size="100" :image="imageSrc" :max-height="160" />

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
}>();
const cardEditor = useCardEditorStore();
const imageSrc = computed(() => {
  if (cardEditor.backgroundResult?.canvas) {
    return cardEditor.backgroundResult.canvas.toDataURL();
  } else {
    return "https://images.unsplash.com/photo-1569817480240-41de5e7283c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cm9hZCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80";
  }
});
</script>
