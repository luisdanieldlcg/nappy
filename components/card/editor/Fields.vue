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
    <v-col cols="4" class="pa-0 mr-4">
      <CardEditorImageCard
        title="Cover Photo"
        :image="cardState.coverImage"
        @pick-image="pickImage"
        @remove-image="removeCoverImage()"
        @edit-image="openImageEditor(cardState.coverImage)"
      />
    </v-col>
    <v-col cols="3" class="pa-0">
      <CardEditorImageCard title="Profile Picture" rounded />
    </v-col>
    <v-col cols="2" class="pa-0">
      <CardEditorImageCard title="Profile Logo" rounded />
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
defineEmits(["searchImage"]);

const store = useCardEditorStore();
const { openImageEditor, removeCoverImage } = store;
const { cardState, showFileDropDialog } = storeToRefs(store);
const pickImage = () => {
  showFileDropDialog.value = true;
};

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
