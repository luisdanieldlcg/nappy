<template>
  <h4 class="font-weight-medium text-grey-subtitle">Label this card</h4>
  <TextField
    class="centered-input text-center align-center"
    label="Card Title"
    style="text-align: center"
    hint="Enter the title for this card"
    v-model="cardState.label"
    density="comfortable"
    variant="filled"
  />
  <h4 class="font-weight-medium text-grey-subtitle">Add your images</h4>
  <v-row>
    <v-col v-for="slot in imageSlots" :cols="slot.flex" class="pa-0 mr-7">
      <CardEditorImageCard
        :title="slot.title"
        :image="slot.image"
        @pick-image="slot.pickImage"
        @remove-image="slot.removeImage"
        @edit-image="slot.editImage"
        :rounded="slot.rounded"
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
        v-model="cardState.firstName"
      />
    </v-col>
    <v-col>
      <TextField
        label="Last Name"
        density="comfortable"
        v-model="cardState.lastName"
      />
    </v-col>
  </v-row>
  <v-row class="mt-0">
    <v-col>
      <TextField
        label="Company Name"
        density="comfortable"
        v-model="cardState.company"
      />
    </v-col>
    <v-col>
      <TextField
        label="Job Title"
        density="comfortable"
        v-model="cardState.jobTitle"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useCardEditorStore } from "~~/stores/card-editor.store";

const store = useCardEditorStore();
const { selectImageSlot } = store;
const { cardState, showFileDropDialog } = storeToRefs(store);
type ImageSlot = {
  title: string;
  image: string;
  pickImage: () => void;
  removeImage?: () => void;
  editImage?: (image: string) => void;
  rounded: boolean;
  flex: number;
};

// Will add the image slots to this array
// and then render them in the template
const imageSlots: ImageSlot[] = reactive([
  {
    title: "Cover Photo",
    image: computed(() => cardState.value.coverImage),
    pickImage: () => {
      showFileDropDialog.value = true;
      selectImageSlot(ImageType.Cover);
    },
    removeImage: () => {
      cardState.value.coverImage = "";
    },
    editImage: () => {},
    rounded: false,
    flex: 4,
  },
  {
    title: "Profile Picture",
    image: cardState.value.avatarImage,
    rounded: true,
    pickImage: () => {
      showFileDropDialog.value = true;
      selectImageSlot(ImageType.Avatar);
    },
    removeImage: () => {
      cardState.value.avatarImage = "";
    },
    flex: 3,
  },
  {
    title: "Profile Logo",
    image: cardState.value.avatarImage,
    rounded: true,
    pickImage: () => {
      // showFileDropDialog.value = true;
      // selectedImageSlot.value = ImageType.Logo;
    },
    removeImage: () => {
      cardState.value.avatarImage = "";
    },
    flex: 2,
  },
]);
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
  cardState.value.color = selection;
};
</script>
