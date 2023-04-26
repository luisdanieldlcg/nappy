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
        <CardCover :card="card" mode="normal" :can-drag="true" />
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

const { isEditingImage, card } = storeToRefs(editor);

// const cardMapper = computed(() => {
//   return {
//     ...card.value,
//     // coverImage: coverImagePreview.value,
//     // avatarImage: avatarImagePreview.value,
//   };
// });

// TODO: find a better way to sync the mapper with the store
// computed properties work but they are not writable
// writable computed properties did not work, it did not want to call the setter
// so we are using 2 watchers for now
// watch(
//   () => cardMapper,
//   (value) => {
//     console.log("updating store")
//     editor.setCard(value);
//   },
//   { deep: true }
// );

// watch(
//   () => editor.card,
//   (value) => {
//     console.log("")
//     Object.assign(cardMapper, value);
//   },
//   { deep: true }
// );
</script>
