<template>
  <v-dialog class="text-center" :max-width="600" persistent no-click-animation>
    <v-card class="elevation-0 pr-10 pl-10 pb-10" color="#f7fafc">
      <div class="mt-6">
        <v-btn
          icon
          class="elevation-0"
          size="small-x"
          location="center center"
          @click="onClose"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-text-field
        type="file"
        name="file"
        ref="input"
        id="fileInput"
        @change="onChange"
        accept=".png,.jpg,.jpeg"
        style="opacity: 0; width: 1px; height: 1px; position: absolute"
      />

      <label for="fileInput">
        <div
          class="corner rounded-lg pa-3"
          @dragover.prevent="onDragOver"
          @dragleave.prevent="onDragLeave"
          @drop.prevent="onDrop"
        >
          <v-icon
            icon="mdi-cloud-upload-outline"
            color="grey-subtitle"
            size="40"
          />

          <v-card-title class="text-wrap">
            Drop your image here or click to browse
          </v-card-title>
          <v-card-subtitle class="ma-4 text-wrap"
            >We support PNG, JPEG and JPG</v-card-subtitle
          >
        </div>
      </label>
    </v-card>
    <v-snackbar v-model="snackbar" variant="flat" @click="snackbar = false">
      {{ fileError }}
      <v-btn icon elevation="0" size="30" variant="tonal" class="ml-2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-dialog>
</template>

<script setup lang="ts">
import { isValidImage } from "~~/utils/file-upload";

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "picked", file: string): void;
}>();

const isDragging = ref(false);
const input = ref<undefined | HTMLInputElement>();
const selectedFile = ref<undefined | File>();
const fileError = ref("");
const snackbar = ref(false);
// Close event
const onClose = () => {
  emit("update:modelValue", false);
};
const onChange = () => {
  const inputElement = input.value;
  if (!inputElement || !inputElement.files) {
    return;
  }
  const target = inputElement.files[0];
  checkFile(target);
};

const onDrop = (e: DragEvent) => {
  const data = e.dataTransfer;
  if (!data || !data.files) {
    return;
  }
  const droppedFiles = data.files;
  if (!droppedFiles.length) {
    return;
  }
  const target = droppedFiles[0];
  checkFile(target);
};

const checkFile = async (file: File) => {
  const validation = await isValidImage(file);
  validation.match({
    Ok() {
      selectedFile.value = file;
      const url = makeImageUrl();
      if (url) {
        emit("picked", url);
        onClose();
      }
    },
    Err(err) {
      fileError.value = err;
      snackbar.value = true;
    },
  });
};
const makeImageUrl = () => {
  if (selectedFile.value) {
    let fileSrc = URL.createObjectURL(selectedFile.value);
    setTimeout(() => {
      URL.revokeObjectURL(fileSrc);
    }, 1000);
    return fileSrc;
  }
  return undefined;
};

const onDragOver = () => {
  isDragging.value = true;
};
const onDragLeave = () => {
  isDragging.value = false;
};
</script>

<style scoped>
.corner {
  border: 1px dashed #c5c3c3;
}
</style>
