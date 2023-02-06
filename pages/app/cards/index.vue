<template>
  <NuxtLayout name="dashboard">
    <v-row>
      <v-col cols="12" sm="10" md="6" lg="5" xl="4" v-for="i in 24">
        <DashProfileCard />
      </v-col>
    </v-row>
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style scoped></style>
