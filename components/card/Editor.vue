<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" lg="7" xl="5" class="pa-0">
        <CardPresentation :card="card">
          <CardActionButton
            icon="mdi-pencil"
            tooltip="Edit Card"
            @click="pickImage"
          />
        </CardPresentation>
      </v-col>

      <v-col cols="12" sm="8" lg="5" xl="4" class="mt-16 pa-2 text-center">
        <v-expansion-panels>
          <v-progress-linear
            :indeterminate="loading"
            :active="loading"
          ></v-progress-linear>
          <TextField
            label="Card Title"
            hint="Enter the title for this card"
            v-model="card.label"
          />
          <DashFieldExpansion title="Full Name">
            <TextField label="First Name" v-model="card.firstName" />
            <TextField label="Last Name" v-model="card.lastName" />
          </DashFieldExpansion>

          <DashFieldExpansion title="More details">
            <TextField label="Job Title" v-model="card.jobTitle" />
            <TextField label="Company Name" v-model="card.company" />
          </DashFieldExpansion>
        </v-expansion-panels>
        <ImageCard title="Profile picture" @click="showDialog = true" />
        <v-btn
          variant="tonal"
          class="mt-6 text-capitalize"
          icon="mdi-check-bold"
          @click="$emit('onFinish')"
        />
      </v-col>
    </v-row>
    <FileDropDialog v-model="showDialog" @close="showDialog = false" />
  </v-container>
</template>

<script setup lang="ts">
import { CreateCardDTO } from "~~/api/dtos/card.dto";
defineEmits(["onFinish"]);
defineProps<{
  card: CreateCardDTO;
  loading: boolean;
  mode: "create" | "edit";
}>();
const showDialog = ref(false);
const pickImage = () => {
  showDialog.value = true;
};
</script>
