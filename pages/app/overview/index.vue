<template>
  <div class="text-center">
    <h1 class="title">Overview</h1>
    <v-row justify="center" class="pa-5">
      <v-col cols="12" sm="12" md="5" lg="3" v-for="entry in overview">
        <DashboardInsightCard
          :title="entry.title"
          :quantity="entry.quantity"
          :icon="entry.icon"
          :theme="entry.theme"
        />
      </v-col>
    </v-row>
    <h1>Members</h1>
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
    </v-row>
  </div>
</template>

<script setup lang="ts">
const overview = [
  {
    title: "Cards",
    quantity: 12,
    icon: "mdi-account-card",
    theme: "red",
  },
  {
    title: "Contacts",
    quantity: 110,
    icon: "mdi-account-group",
    theme: "aqua",
  },
  {
    title: "Members",
    quantity: 290,
    icon: "mdi-account-group",
    theme: "green",
  },
];

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
