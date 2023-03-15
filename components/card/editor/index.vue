<template>
  <v-card color="white" elevation="0" class="pt-0 mt-0 card-shadow-light">
    <v-container class="pa-0">
      <v-row>
        <v-col cols="6">
          <CardEditorPreview :card="card" />
        </v-col>
        <v-col cols="6">
          <CardEditorFields :card="card" />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col
          :cols="cardGrid.cols"
          :sm="cardGrid.sm"
          :md="cardGrid.md"
          :lg="cardGrid.lg"
          :xl="cardGrid.xl"
          class="mr-16"
        >
        </v-col>
        <v-col
          :cols="textFieldsGrid.cols"
          :sm="textFieldsGrid.sm"
          :md="textFieldsGrid.md"
          :lg="textFieldsGrid.lg"
          :xl="textFieldsGrid.xl"
          class="ml-8 mt-8 text-center"
        >
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <!-- <ImageEditor />
        <v-btn @click="editingImage = false" variant="tonal" class="mr-16 mt-7">
          Done
        </v-btn>
        <div class="pr-7 d-inline"></div> -->
  <!-- <div>
    <ImageCard title="Profile picture" @click="showDialog = true" />
    <v-btn
      variant="tonal"
      class="mt-6 text-capitalize"
      icon="mdi-check-bold"
      @click="sendForm"
    />
  </div>
  <FileDropDialog v-model="showDialog" @close="" @filepicked="onFilePicked" /> -->
</template>

<script setup lang="ts">
import { ICreateCardDTO } from "~~/api/dtos/card.dto";
import { createCardEditorStore } from "~~/stores/card-editor.store";
// const emit = defineEmits<{
//   (e: "onFinish", form: FormData): void;
// }>();

// TODO: make a better grid view
const cardGrid = {
  cols: 12,
  sm: 8,
  md: 7,
  lg: 4,
  xl: 5,
};
const textFieldsGrid = {
  cols: 12,
  sm: 8,
  md: 6,
  lg: 2,
  xl: 2,
};
const props = defineProps<{
  card: ICreateCardDTO;
  loading: boolean;
  mode: "create" | "edit";
}>();
const editorStore = createCardEditorStore(props.card);

// Quick dirty fix for avoiding rendering Preview image component
// after the image is chosen and the screen is reset.
editorStore.editorResult = undefined;
const editingImage = ref(false);

const showDialog = ref(false);

const backgroundImage = computed(() => {
  return (
    editorStore.profilePicImage ||
    "https://wallpaperaccess.com/full/2774333.jpg"
  );
});

const closeDialog = () => {
  showDialog.value = false;
};

const onEditClicked = async () => {
  if (props.mode === "edit") {
    editingImage.value = true;
  } else {
    showDialog.value = true;
  }
};

const onFilePicked = (file: string) => {
  closeDialog();
  editorStore.profilePicImage = file;
  editingImage.value = true;
};
const sendForm = () => {

};
</script>

<style scoped>
/*
	It may be necessary to set limits on the size of the cropper, otherwise the cropper image will try to fill all the available space.
*/
.cropper {
  height: 300px;
  width: 300px;
  background: #ddd;
}
</style>
