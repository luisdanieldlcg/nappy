<template>
  <div>
    <NuxtLayout name="app">
      <h1>Hi, Welcome back</h1>
      <v-row>
        <v-col xs="12" sm="6" md="6" lg="3" v-for="entry in overview">
          <InsightCard
            :title="entry.title"
            :quantity="entry.quantity"
            :icon="entry.icon"
            :theme="entry.theme"
          />
        </v-col>
      </v-row>
    </NuxtLayout>
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
    title: "Contacts",
    quantity: 110,
    icon: "mdi-account-group",
    theme: "aqua",
  },
];
</script>

<style scoped></style>
