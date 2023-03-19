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
        <CardEditorPreview :card="card" />
      </v-col>
      <v-divider
        :thickness="1"
        :vertical="!isBelowLg"
        class="mr-12 mb-7"
      ></v-divider>
      <ImageEditor v-if="editorStore.editingImage" />
      <v-col :cols="isBelowLg ? 9 : 6">
        <CardEditorFields :card="card" @image-request="showDialog = true" />
      </v-col>
    </v-row>

    <FileDropDialog
      v-model="showDialog"
      @close="showDialog = false"
      @picked="onFilePicked"
    />
  </v-card>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import { ICreateCardDTO } from "~~/api/dtos/card.dto";
import { useCardEditorStore } from "~~/stores/card-editor.store";
defineProps<{
  card: ICreateCardDTO;
  loading: boolean;
  mode: "create" | "edit";
}>();
const { width } = useDisplay();
const editorStore = useCardEditorStore();
const isBelowLg = computed(() => width.value < 1340);
const panelWidth = computed(() => {
  switch (true) {
    case width.value < 980:
      return 550;
    case width.value < 1160:
      return 700;
    case width.value < 1400:
      return 900;
    default:
      return 500;
  }
});
// Quick dirty fix for avoiding rendering Preview image component
// after the image is chosen and the screen is reset.
editorStore.backgroundResult = undefined;

const showDialog = ref(false);

const closeDialog = () => {
  showDialog.value = false;
};

const onFilePicked = (file: string) => {
  closeDialog();
  editorStore.profilePicImage = file;
  editorStore.editingImage = true;
};
</script>
