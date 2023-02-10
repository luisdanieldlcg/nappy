<template>
  <NuxtLayout name="dashboard">
    <v-container>
      <v-row>
        <v-col cols="12" sm="7" lg="6" xl="5">
          <DashProfileCard />
        </v-col>
        <v-col cols="12" sm="5" class="mt-16">
          <v-expansion-panels>
            <TextField
              label="Card Title"
              hint="Enter the title for this card"
              v-model="cardController.data.title"
            />

            <DashFieldExpansion title="Full Name">
              <TextField
                label="First Name"
                v-model="cardController.data.firstName"
              />
              <TextField
                label="LastName"
                v-model="cardController.data.lastName"
              />
            </DashFieldExpansion>

            <DashFieldExpansion title="More details">
              <TextField
                label="Job Title"
                v-model="cardController.data.jobTitle"
              />
              <TextField
                label="Company Name"
                v-model="cardController.data.company"
              />
            </DashFieldExpansion>
          </v-expansion-panels>
          <v-btn
            variant="tonal"
            class="mt-6 text-capitalize"
            icon="mdi-check-bold"
          />
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useProfileCard } from "~~/stores/card_store";
const cardController = useProfileCard();
</script>
