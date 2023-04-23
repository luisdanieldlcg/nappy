<template>
  <v-card
    color="white"
    elevation="0"
    class="pr-6"
    :min-width="200"
    :max-width="1100"
  >
    <DividedGrid v-if="isEditingImage">
      <template #left>
        <CardCropperPreview />
      </template>
      <template #right>
        <CardCropper />
      </template>
    </DividedGrid>
    <DividedGrid v-else>
      <template #left>
        <CardCover :card="cardMapper" mode="normal" />
      </template>
      <template #right>
        <CardEditorTabs />
      </template>
    </DividedGrid>
  </v-card>
</template>

<script setup lang="ts">
import { Card } from "~~/stores/card-editor.store";
const props = defineProps<{
  card: Card;
}>();
const editor = useCardEditorStore();
onMounted(() => {
  editor.setCard(props.card);
});
onUnmounted(() => {
  editor.onEditorClosed();
});
const { isEditingImage, card, coverImagePreview, avatarImagePreview } =
  storeToRefs(editor);

const cardMapper = computed(() => {
  return {
    ...card.value,
    coverImage: coverImagePreview.value,
    avatarImage: avatarImagePreview.value,
  };
});
</script>
