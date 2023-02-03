<template>
  <NuxtLayout name="dashboard">
    <template #header> Cards </template>
    <v-row align="center" justify="center">
      <v-col cols="4" v-for="i in 24">
        <DashboardProfileCard />
      </v-col>
    </v-row>
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style scoped></style>
