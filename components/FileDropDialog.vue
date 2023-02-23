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

          <div class="corner">
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
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script lang="ts" setup>
defineEmits(["close"]);
const isDragging = ref(false);
const files = ref([]);
const onChange = () => {};
const generateThumbnail = (file: any) => {
  let fileSrc = URL.createObjectURL(file);
  setTimeout(() => {
    URL.revokeObjectURL(fileSrc);
  }, 1000);
  return fileSrc;
};
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
const dragover = () => {
  // e.preventDefault();
  isDragging.value = true;
  console.log("mouseeeeeeee");
};
const dragleave = () => {
  isDragging.value = false;
};
const drop = () => {
  // e.preventDefault();
  // this.$refs.file.files = e.dataTransfer.files;
  // this.onChange();
  // isDragging.value.isDragging = false;
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
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>
