<template>
  <v-card
    :loading="loading"
    color="white"
    elevation="0"
    class="pr-6"
    :min-width="200"
    :max-width="1000"
  >
    <CardEditorGrid>
      <template #left>
        <CardCropperPreview v-if="isEditingImage" />
        <CardEditorPreview v-else>
          <template #header>
            <CardHeader :avatar-size="100" :height="160" :card="cardState" />
          </template>
        </CardEditorPreview>
      </template>
      <template #right>
        <CardCropper v-if="isEditingImage" :image="imageToEdit" />
        <CardEditorFields v-else />
      </template>
    </CardEditorGrid>

    <FileDropDialog
      v-model="showFileDropDialog"
      @close="onDialogClosed"
      @picked="onFilePicked"
    />
  </v-card>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";
defineProps<{
  card: ICardDTO;
  loading: boolean;
  mode: "create" | "edit";
}>();

const store = useCardEditorStore();
onMounted(() => {
  store.$reset();
});

const { showFileDropDialog, cardState, isEditingImage, imageToEdit } =
  storeToRefs(store);

const onFilePicked = (file: string) => {
  store.closeImagePickDialog();
  store.enterImageEditMode(file);
};
const onDialogClosed = () => {
  showFileDropDialog.value = false;
  // store.selectedImageSlot = undefined;
};
</script>
