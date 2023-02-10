<template>
  <NuxtLayout name="dashboard">
    <v-row>
      <v-col cols="12" sm="9" md="6" xl="4" v-for="i in 24">
        <DashProfileCard :card="card" />
      </v-col>
    </v-row>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useProfileCard } from "~~/stores/card_store";
const card = useProfileCard();
</script>

<style scoped></style>
