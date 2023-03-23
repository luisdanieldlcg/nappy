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
        <CardContainer v-else :card="card" />

        <!-- <CardEditorPreview v-else>
           <template #header>
            <CardHeader
              :cover-image="coverSrc"
              :avatar-size="100"
              :height="160"
              :color="cardState.color"
            />
          </template> -->
        <CardEditorPreview />
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

const props = defineProps<{
  loading: boolean;
  mode: "create" | "edit";
}>();

const store = useCardEditorStore();
const coverSrc = store.getSourceForImage(ImageType.Cover);
const card: ICardDTO = {
  avatarImage: "",
  coverImage: "",
  color: "red",
  firstName: "John",
  lastName: "Doe",
  jobTitle: "CEO",
  company: "Google",
  label: "Friend",
  id: "",
};
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
