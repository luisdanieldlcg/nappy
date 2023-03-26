<template>
  <CardEditorSection title="Label this card">
    <TextField
      label="Card Title"
      style="text-align: center"
      hint="Enter the title for this card"
      v-model="card.label"
      density="comfortable"
      variant="filled"
    />
  </CardEditorSection>
  <CardEditorSection title="Add your images">
    <v-row>
      <v-col
        v-for="slot in imageSlots"
        :cols="slot.flex"
        :class="slot.margin"
        :key="slot.title"
      >
        <CardEditorImageSlot
          :rounded="slot.rounded"
          :image="slot.image"
          :title="slot.title"
          @click="slot.onClick"
          @remove-image="slot.onRemoveImage"
        />
      </v-col>
    </v-row>
  </CardEditorSection>
  <CardEditorSection title="Pick your favorite theme">
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
  </CardEditorSection>
  <CardEditorSection title="Add your details">
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
          label="Job Title"
          density="comfortable"
          v-model="card.jobTitle"
        />
      </v-col>
      <v-col>
        <TextField
          label="Company Name"
          density="comfortable"
          v-model="card.company"
        />
      </v-col>
    </v-row>
  </CardEditorSection>
  <ImageDropDialog
    v-model="editorStore.imageDropDialog"
    @picked="editorStore.openImageEditor"
  />
</template>

<script setup lang="ts">
import { ImageType, useCardEditorStore } from "~~/stores/card-editor.store";

const { card } = storeToRefs(useCardEditorStore());
const imageEditor = useImageEditor();
const editorStore = useCardEditorStore();
const coverImage = computed(() => {
  if (card.value.coverImage) {
    return URL.createObjectURL(card.value.coverImage);
  }
  // TODO: Revoke URL?
  // If i revoke it, the image editor will not be able to load the image
  // unless i reopen it.
  return "";
});

const avatarImage = computed(() => {
  if (card.value.avatarImage) {
    return URL.createObjectURL(card.value.avatarImage);
  }
});

// The image slots are the images that can be edited and appended to the card
// in the card editor. This is the list of available slots.
const imageSlots = reactive([
  {
    image: coverImage,
    title: "Cover Photo",
    onClick: () => {
      imageEditor.imageSlot = ImageType.Cover;
    },
    onRemoveImage: () => {
      editorStore.card.coverImage = null;
    },
    flex: 4,
    margin: "pa-0 mr-7",
  },
  {
    image: avatarImage,
    title: "Profile Picture",
    rounded: true,
    onClick: () => {
      imageEditor.imageSlot = ImageType.Avatar;
    },
    flex: 3,
    margin: "pa-0 mr-5",
    onRemoveImage: () => {
      editorStore.card.avatarImage = null;
    },
  },
  {
    title: "Company Logo",
    rounded: true,
    onClick: () => {},
    flex: 2,
    margin: "pa-0",
  },
]);

const availableColors = [
  Colors.red,
  Colors.aqua,
  Colors.blue,
  Colors.green,
  Colors.purple,
  Colors.brownLight,
  Colors.black,
  Colors.greyLight,
];

const openColorPicker = () => {};
const pickColor = (selection: string) => {
  card.value.color = selection;
};
</script>
