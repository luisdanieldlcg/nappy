<template>
  <NuxtLayout name="dashboard">
    <v-container>
      <v-row>
        <v-col cols="12" sm="7" lg="6" xl="5">
          <DashProfileCard :card="card" />
        </v-col>

        <v-col cols="12" sm="5" class="mt-16">
          <v-expansion-panels>
            <v-progress-linear
              indeterminate
              v-if="isLoading"
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
import { CardDTO, CreateCardDTO } from "~~/api/dtos/card.dto";
import { useUserStore } from "~~/stores/user.store";

const { isLoading, response, execute } = useCardAPI<CardDTO>(
  CardFunctions.CREATE
);
const card = reactive<CreateCardDTO>({
  label: "Work",
  firstName: "Luis",
  lastName: "de la Cruz",
  jobTitle: "",
  company: "",
});

const createCard = async () => {
  await execute({
    data: card,
  });
  if (response.value?.data) {
    isLoading.value = true;
    await useUserStore().fetchAll();
    useRouter().replace("/app/cards");
  }
};
</script>
