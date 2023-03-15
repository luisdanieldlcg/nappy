<template>
  <v-card
    :loading="loading"
    color="white"
    elevation="0"
    class="pa-6 mt-0 card-shadow-light"
    :max-width="850"
  >
    <v-container class="pa-0">
      <v-row>
        <v-col cols="6">
          <CardEditorPreview :card="card" />
        </v-col>
        <v-col cols="6">
          <CardEditorFields :card="card">
            <template #before-panels>
              <ImageCard title="Profile picture" @click="showDialog = true" />
            </template>
          </CardEditorFields>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

  <FileDropDialog
    v-model="showDialog"
    @close="showDialog = false"
    @filepicked="onFilePicked"
  />
  <!-- <ImageEditor />
        <v-btn @click="editingImage = false" variant="tonal" class="mr-16 mt-7">
          Done
        </v-btn>
        <div class="pr-7 d-inline"></div> -->
  <!-- <div>
  </div>
  -->
</template>

<script setup lang="ts">
import { ICreateCardDTO } from "~~/api/dtos/card.dto";
import { useCardEditorStore } from "~~/stores/card-editor.store";
defineProps<{
  card: ICreateCardDTO;
  loading: boolean;
  mode: "create" | "edit";
}>();
const editorStore = useCardEditorStore();

// Quick dirty fix for avoiding rendering Preview image component
// after the image is chosen and the screen is reset.
editorStore.editorResult = undefined;
const editingImage = ref(false);
const showDialog = ref(false);

const closeDialog = () => {
  showDialog.value = false;
};

const onFilePicked = (file: string) => {
  closeDialog();
  editorStore.profilePicImage = file;
  editingImage.value = true;
};
</script>

<style scoped>
.cropper {
  height: 300px;
  width: 300px;
  background: #ddd;
}
</style>
