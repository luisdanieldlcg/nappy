<template>
  <v-dialog class="text-center" :max-width="600">
    <v-card class="elevation-0 pr-10 pl-10 pb-10" color="#f7fafc">
      <div class="mt-8">
        <v-btn
          icon
          class="elevation-0"
          size="small-x"
          location="center center"
          @click="$emit('close')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-text-field
        type="file"
        name="file"
        ref="file"
        id="fileInput"
        @change="onChange"
        accept=".png,.jpg,.jpeg"
        style="opacity: 0; width: 1px; height: 1px; position: absolute"
      />

      <label for="fileInput">
        <div
          class="corner"
          @dragover.prevent="onDragOver"
          @dragleave.prevent="onDragLeave"
          @drop.prevent="onDrop"
        >
          <v-icon
            icon="mdi-cloud-upload-outline"
            color="grey-subtitle"
            size="40"
          ></v-icon>

          <v-card-title class="text-wrap">
            Drop your image here or click to browse
          </v-card-title>
          <v-card-subtitle class="ma-4 text-wrap"
            >We support PNG, JPEG and JPG</v-card-subtitle
          >
        </div>
      </label>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: "close"): void;
  (e: "filepicked", file: string): void;
}>();

const isDragging = ref(false);
const file = ref<undefined | HTMLInputElement>();
const selectedFile = ref<undefined | File>();
const str = " Your image exceeds our limit of 8MB. Please try another one. ";
const bytesToMb = (bytes: number) => {
  return bytes / 1000 / 1000;
};
const MAX_SIZE_IN_MB = 5;
const onChange = () => {
  if (file.value?.files) {
    selectedFile.value = file.value.files[0];
    if (bytesToMb(selectedFile.value.size) >= MAX_SIZE_IN_MB) {
      return;
    }
    const thumbnail = generateThumbnail();
    if (thumbnail) {
      emit("filepicked", thumbnail);
    }
  }
};

const generateThumbnail = () => {
  if (selectedFile.value) {
    let fileSrc = URL.createObjectURL(selectedFile.value);
    setTimeout(() => {
      URL.revokeObjectURL(fileSrc);
    }, 1000);
    return fileSrc;
  }
};

const onDragOver = () => {
  isDragging.value = true;
};
const onDragLeave = () => {
  isDragging.value = false;
};
const onDrop = (e: DragEvent) => {
  const droppedFiles = e.dataTransfer?.files;
  if (droppedFiles?.length) {
    selectedFile.value = droppedFiles[0];
    const thumbnail = generateThumbnail();
    if (thumbnail) {
      emit("filepicked", thumbnail);
    }
  }
};
</script>

<style scoped>
.corner {
  border: 2px dotted #d8d8d8;
}
</style>
