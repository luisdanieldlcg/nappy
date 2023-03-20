<template>
  <v-card
    :loading="loading"
    color="white"
    elevation="0"
    class="pr-6"
    :min-width="200"
    :max-width="1000"
  >
    <v-row justify="center" no-gutters class="mt-8">
      <v-col :cols="isBelowLg ? 7 : 5">
        <CardEditorPreview />
      </v-col>
      <v-divider
        :thickness="1"
        :vertical="!isBelowLg"
        class="mr-12 mb-7"
      ></v-divider>
      <ImageEditor v-if="selectedImage" :image="selectedImage" />
      <v-col :cols="isBelowLg ? 9 : 6" v-else>
        <CardEditorFields />
      </v-col>
    </v-row>

    <FileDropDialog
      v-model="showFileDropDialog"
      @close="onDialogClosed"
      @picked="onFilePicked"
    />
  </v-card>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import { ICardDTO } from "~~/api/dtos/card.dto";
import { SelectedImageType } from "~/stores/card-editor.store";
defineProps<{
  card: ICardDTO;
  loading: boolean;
  mode: "create" | "edit";
}>();
const store = useCardEditorStore();
const { showFileDropDialog, selectedImageSlot, cardState, selectedImage } =
  storeToRefs(store);
const { width } = useDisplay();
const isBelowLg = computed(() => width.value < 1340);
// Quick dirty fix for avoiding rendering Preview image component
// after the image is chosen and the screen is reset.
// editorStore.imageCropPreview = undefined;

const onFilePicked = (file: string) => {
  store.closeImagePickDialog();
  store.selectImage(file);
};
const onDialogClosed = () => {
  showFileDropDialog.value = false;
  store.selectedImageSlot[0] = SelectedImageType.None;
  // editorStore.selectedImageSlot = undefined;
};
</script>
