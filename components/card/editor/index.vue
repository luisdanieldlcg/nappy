<template>
  <v-card
    :loading="loading"
    color="white"
    elevation="0"
    class="mt-0 card-shadow-light"
    :max-width="850"
    :width="panelWidth"
  >
    <v-row justify="center" no-gutters class="pr-16 pl-4">
      <v-col cols="7">
        <CardEditorPreview :card="card" />
      </v-col>

      <ImageEditor v-if="editingImage" />
      <!--FIXME: get rid of this nested if-->
      <v-col cols="5" v-else-if="!isSmallScreen">
        <CardEditorFields :card="card">
          <template #before-panels>
            <ImageCard title="Profile picture" @click="showDialog = true" />
          </template>
        </CardEditorFields>
      </v-col>
      <v-col cols="7" v-else>
        <CardEditorFields :card="card" class="ml-8 pb-8">
          <template #before-panels>
            <ImageCard title="Profile picture" @click="showDialog = true" />
          </template>
        </CardEditorFields>
      </v-col>
    </v-row>
  </v-card>
  <FileDropDialog
    v-model="showDialog"
    @close="showDialog = false"
    @filepicked="onFilePicked"
  />
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
const isSmallScreen = computed(() => width.value < 1160);
const panelWidth = computed(() => {
  switch (true) {
    case width.value < 980:
      return 550;
    case width.value < 1160:
      return 700;
    case width.value < 1400:
      return 900;
    default:
      return 1200;
  }
});
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
