<template>
  <NuxtLayout name="dashboard" :header="header">
    <v-container>
      <v-row justify="center">
        <v-col v-for="entry in insights">
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
import { DashPageHeader } from '~~/layouts/dashboard.vue';
import { overviewInsights } from "~~/config/dash/overview";
import InsightCard from "./components/InsightCard.vue";
const insights = overviewInsights;

const header: DashPageHeader = {
  title: "Overview",
  icon: "mdi-chart-line",
};
</script>

<style scoped></style>
