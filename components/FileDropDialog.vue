<template>
  <v-dialog class="root">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
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
            class="hidden-input"
            type="file"
            name="file"
            ref="file"
            id="fileInput"
            @change="onChange"
            accept=".png,.jpg,.jpeg"
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

              <v-card-title>
                Drop your image here or click to browse
              </v-card-title>
              <v-card-subtitle class="ma-4"
                >We support PNG, JPEG and JPG</v-card-subtitle
              >
            </div>
          </label>
          <div v-if="selectedFile" class="preview-container">
            <div>
              <img class="preview-img" :src="generateThumbnail" />
              <p :title="selectedFile.name">
                {{ makeName(selectedFile.name) }}
              </p>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: "close"): void;
  (e: "filepicked", file: string): void;
}>();

const isDragging = ref(false);
const files = ref([]);
const file = ref<undefined | HTMLInputElement>();
const selectedFile = ref<undefined | File>();
const onChange = () => {
  if (file.value?.files) {
    selectedFile.value = file.value.files[0];
    const thumbnail = generateThumbnail.value;
    if (thumbnail) {
      emit("filepicked", thumbnail);
    }
  }
  console.log("New selected file: ", selectedFile.value);
};

const generateThumbnail = computed(() => {
  if (selectedFile.value) {
    let fileSrc = URL.createObjectURL(selectedFile.value);
    setTimeout(() => {
      URL.revokeObjectURL(fileSrc);
    }, 1000);
    return fileSrc;
  }
});
const makeName = (name: string) => {
  return (
    name.split(".")[0].substring(0, 3) +
    "..." +
    name.split(".")[name.split(".").length - 1]
  );
};
const remove = (i: number) => {
  files.value.splice(i, 1);
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
    const thumbnail = generateThumbnail.value;
    if (thumbnail) {
      emit("filepicked", thumbnail);
    }
  }
  console.log("New selected file: ", selectedFile.value);
};
</script>

<style>
.corner {
  border: 2px dotted #d8d8d8;
}
.root {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.dropzone-container {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
}
.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}
.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}
.preview-container {
  display: flex;
  margin-top: 2rem;
}
.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
}
.preview-img {
  width: 120px;
  height: 120px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>
