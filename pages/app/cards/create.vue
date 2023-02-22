<template>
  <NuxtLayout name="dashboard">
    <v-container>
      <v-row>
        <v-col cols="12" sm="7" lg="6" xl="5">
          <DashCard :card="dto" />
        </v-col>

        <v-col cols="12" sm="5" class="mt-16">
          <v-expansion-panels>
            <v-progress-linear
              indeterminate
              v-if="view.isLoading()"
            ></v-progress-linear>
            <TextField
              label="Card Title"
              hint="Enter the title for this card"
              v-model="dto.label"
            />

            <DashFieldExpansion title="Full Name">
              <TextField label="First Name" v-model="dto.firstName" />
              <TextField label="Last Name" v-model="dto.lastName" />
            </DashFieldExpansion>

            <DashFieldExpansion title="More details">
              <TextField label="Job Title" v-model="dto.jobTitle" />
              <TextField label="Company Name" v-model="dto.company" />
            </DashFieldExpansion>
          </v-expansion-panels>

          <v-btn
            variant="tonal"
            class="mt-6 text-capitalize"
            icon="mdi-check-bold"
            @click="createCard"
          />
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { CreateCardDTO } from "~~/api/dtos/card.dto";
import { useCardStore } from "~~/stores/card.store";

const view = new ViewState();
const dto = reactive<CreateCardDTO>({
  id: "",
  label: "Work",
  firstName: "Luis",
  lastName: "de la Cruz",
  jobTitle: "",
  company: "",
});
const createCard = async () => {
  useCardStore().create(dto, view);
};
</script>
