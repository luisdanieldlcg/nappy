<template>
  <NuxtLayout name="dashboard" :header="header">
    <div class="mt-5">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="5" md="4" lg="3" v-for="entry in insights">
            <InsightCard
              :title="entry.title"
              :quantity="entry.quantity"
              :icon="entry.icon"
            />
            <Example></Example>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { overviewInsights } from "~~/config/dash/overview";
import InsightCard from "./components/InsightCard.vue";
const insights = overviewInsights;

const header = {
  title: "Overview",
  icon: "mdi-chart-line",
  target: "/app/overview",
};
</script>

<style scoped></style>
