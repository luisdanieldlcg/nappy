<template>
  <NuxtLayout name="dashboard">
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
    <!-- <v-row justify="center" class="pa-5">
      <v-col cols="12" sm="12" md="5" lg="3" v-for="entry in overview">
        <DashboardInsightCard
          :title="entry.title"
          :quantity="entry.quantity"
          :icon="entry.icon"
          :theme="entry.theme"
        />
      </v-col>
    </v-row>
    <h1 class="mt-8 mb-8">Members</h1>
    <v-row justify="center">
      <v-col cols="9">
        <v-table class="insight-card">
          <thead>
            <tr>
              <th class="text-left">Email</th>
              <th class="text-left">ID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in members.data" :key="item.email">
              <td>{{ item.email }}</td>
              <td>{{ item.id }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row> -->
  </NuxtLayout>
</template>

<script setup lang="ts">
import { overviewInsights } from "~~/config/overview";

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
</script>

<style scoped></style>
