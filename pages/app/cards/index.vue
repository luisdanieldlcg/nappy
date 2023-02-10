<template>
  <NuxtLayout name="dashboard">
    <v-row>
      <v-col cols="12" sm="9" md="6" xl="4" v-for="i in 24">
        <DashProfileCard :full-name="'example?'" />
      </v-col>
    </v-row>
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style scoped></style>
