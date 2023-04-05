<template>
  <DashNote title="Label this card" icon="mdi-account-tag-outline" />
  <TextField
    label="Card Title"
    style="text-align: center"
    hint="Enter the title for this card"
    v-model="card.label"
    density="comfortable"
    variant="filled"
  />
  <DashNote title="Add your details" icon="mdi-account-outline" />
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
</template>

<script setup lang="ts">
import { useCardEditorStore } from "~~/stores/card-editor.store";
const { card } = storeToRefs(useCardEditorStore());
</script>
