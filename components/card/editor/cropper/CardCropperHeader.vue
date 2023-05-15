<template>
  <v-row class="mb-1">
    <v-col cols="2" class="pa-0 pt-2">
      <v-btn @click="onCancel" class="elevation-0">
        <Icon name="mdi-arrow-left" />
        <v-tooltip text="Cancel" location="bottom" activator="parent" />
      </v-btn>
    </v-col>
    <v-col cols="8">
      <h4 class="font-weight-medium text-grey-subtitle">Edit your Image</h4>
    </v-col>
    <v-col cols="2" class="pa-0 pt-2">
      <v-btn @click="onCrop" class="elevation-0">
        <Icon name="mdi-check" />
        <v-tooltip text="Save changes" location="bottom" activator="parent" />
      </v-btn>
    </v-col>
  </v-row>
  <v-divider></v-divider>
  <h5 class="text-grey-subtitle mt-2 font">Scroll to zoom the Cropper</h5>
</template>

<script setup lang="ts">
const image = useImageEditor();
const emit = defineEmits<{
  (event: "cancel"): void;
  (event: "crop", blob: Blob): void;
}>();
const onCancel = () => {
  emit("cancel");
};
const onCrop = () => {
  image.preview?.canvas?.toBlob((blob) => {
    if (!blob) return;
    emit("crop", blob);
  });
};
</script>

<style scoped></style>
