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
    <v-col cols="4" class="pa-0 mr-4">
      <ImageCard title="Cover Photo" @click="$emit('imageRequest')" />
    </v-col>
    <v-col cols="3" class="pa-0">
      <ImageCard title="Profile Picture" rounded />
    </v-col>
    <v-col cols="2" class="pa-0">
      <ImageCard title="Profile Logo" rounded />
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
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";
defineEmits(["imageRequest"]);
defineProps<{
  card: ICardDTO;
}>();
</script>

<style lang="scss">
// .v-textfield input {
//   text-align: center;
// }
// .v-label label {
//   text-align: center;
// }
</style>
