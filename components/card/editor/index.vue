<template>
  <v-card
    color="white"
    elevation="0"
    class="pr-6"
    :min-width="200"
    :max-width="1000"
  >
    <DividedGrid v-if="isEditingImage">
      <template #left>
        <CropperPreview />
      </template>
      <template #right>
        <Cropper />
      </template>
    </DividedGrid>
    <DividedGrid v-else>
      <template #left>
        <CardCover :card="cardMapper" />
        <v-row justify="center">
          <v-col cols="6">
            <v-btn class="text-capitalize" variant="outlined">
              View Card
              <v-icon class="ml-3" icon="mdi-export" />
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <template #right>
        <CardEditorFields />
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
