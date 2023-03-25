<template>
  <h4 class="font-weight-medium text-grey-subtitle">Label this card</h4>
  <TextField
    class="centered-input text-center align-center"
    label="Card Title"
    style="text-align: center"
    hint="Enter the title for this card"
    v-model="card.label"
    density="comfortable"
    variant="filled"
  />
  <h4 class="font-weight-medium text-grey-subtitle">Add your images</h4>
  <v-row>
    <v-col :cols="4" class="pa-0 mr-7">
      <CardEditorImageSlot
        :image="coverImage"
        title="Cover Photo"
        @click="selectedSlot = ImageType.Cover"
        @remove-image="editorStore.card.coverImage = null"
      />
    </v-col>
    <v-col :cols="3" class="pa-0 mr-7">
      <CardEditorImageSlot
        rounded
        title="Profile Picture"
        @click="selectedSlot = ImageType.Avatar"
      />
    </v-col>
    <v-col :cols="2" class="pa-0 mr-7">
      <CardEditorImageSlot
        rounded
        title="Profile Logo"
        @click="selectedSlot = 2"
      />
    </v-col>
  </v-row>
  <h4 class="font-weight-medium text-grey-subtitle">
    Pick your favorite theme
  </h4>
  <v-row>
    <v-col cols="1">
      <div>
        <ColorCard :multi-color="true" @click="openColorPicker" />
      </div>
    </v-col>
    <v-col v-for="color in availableColors" cols="1">
      <ColorCard :color="color" @click="pickColor(color)" />
    </v-col>
  </v-row>
  <h4 class="font-weight-medium text-grey-subtitle">Add your details</h4>

  <v-row class="mt-0" style="height: 90px">
    <v-col>
      <TextField
        label="First Name"
        density="comfortable"
        v-model="card.firstName"
      />
    </v-col>
    <v-col>
      <TextField
        label="Last Name"
        density="comfortable"
        v-model="card.lastName"
      />
    </v-col>
  </v-row>
  <v-row class="mt-0">
    <v-col>
      <TextField
        label="Company Name"
        density="comfortable"
        v-model="card.company"
      />
    </v-col>
    <v-col>
      <TextField
        label="Job Title"
        density="comfortable"
        v-model="card.jobTitle"
      />
    </v-col>
  </v-row>
  <teleport to="body">
    <ImageDropDialog
      v-model="editorStore.imageDropDialog"
      @picked="editorStore.openImageEditor"
    />
  </teleport>
</template>

<script setup lang="ts">
import { ImageType, useCardEditorStore } from "~~/stores/card-editor.store";

const { card } = storeToRefs(useCardEditorStore());
const selectedSlot = ref<ImageType | undefined>(undefined);
const editorStore = useCardEditorStore();
const coverImage = computed(() => {
  if (card.value.coverImage) {
    return URL.createObjectURL(card.value.coverImage);
  }
  // Now i need to revoke the URL
  // setTimeout(() => {
  //   URL.revokeObjectURL(coverImage.value);
  // }, 1000);
  return "";
});

const availableColors = [
  Colors.red,
  Colors.aqua,
  Colors.blue,
  Colors.green,
  Colors.purple,
  Colors.black,
  Colors.greyLight,
];

const openColorPicker = () => {};
const pickColor = (selection: string) => {
  card.value.color = selection;
};
</script>
