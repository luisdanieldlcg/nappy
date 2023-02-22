<template>
  <NuxtLayout name="dashboard" :header="header">
    <div>
      <v-container class="pa-0">
        <v-row class="pa-0">
          <v-col cols="12" sm="5" md="4" v-for="entry in insights">
            <DashInsightCard
              :title="entry.title"
              :quantity="entry.quantity"
              :icon="entry.icon"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { overviewInsights } from "~~/config/dash/overview";

const insights = overviewInsights;
const members = {
  itemsPerPage: 5,
  headers: [],
  data: [
    {
      email: "danikingrd@gmail.com",
      id: "eyJzdWIiOiIxMjM0NT",
    },
    {
      email: "daniel@gmail.com",
      id: "MeJf36POk6yJV_adQssw5c",
    },
  ],
};
const header = {
  title: "Overview",
  icon: "mdi-chart-line",
  target: "/app/overview",
};
</script>

<style scoped></style>
