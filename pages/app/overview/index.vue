<template>
  <NuxtLayout name="dashboard" :header="header">
    <v-container>
      <v-row justify="center">
        <v-col v-for="entry in overviewInsights">
          <InsightCard
            :title="entry.title"
            :quantity="entry.quantity"
            :icon="entry.icon"
          />
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { DashPageHeader } from "~~/layouts/dashboard.vue";
import InsightCard from "../../../components/InsightCard.vue";

const header: DashPageHeader = {
  title: "Overview",
  icon: "mdi-chart-line",
};
const overviewInsights = [
  {
    title: "Cards",
    quantity: 12,
    icon: "mdi-card-account-details-outline",
    theme: "red",
  },
  {
    title: "Contacts",
    quantity: 1,
    icon: "mdi-account-group",
    theme: "aqua",
  },
  {
    title: "Members",
    quantity: 9,
    icon: "mdi-account-group",
    theme: "green",
  },
];
</script>

<style scoped></style>
