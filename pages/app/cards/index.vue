<template>
  <NuxtLayout name="dashboard">
    <v-row>
      <v-col cols="12" sm="9" md="6" xl="4" v-for="card in cardStore.cards">
        <DashCard :card="card" />
      </v-col>
    </v-row>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useCardStore } from "~~/stores/card.store";
const cardStore = useCardStore();
</script>

<style scoped></style>
