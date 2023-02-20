<template>
  <NuxtLayout name="dashboard">
    <v-row>
      <v-col cols="12" sm="9" md="6" xl="4" v-for="card in userStore.cards">
        <DashProfileCard :card="card" />
      </v-col>
    </v-row>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useUserStore } from "~~/stores/user.store";
const userStore = useUserStore();
// console.log(userStore.cards.length);
</script>

<style scoped></style>
