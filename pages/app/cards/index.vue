<template>
  <div>
    <h1>Cards</h1>
    <v-row align="center" justify="center">
      <v-col>
        <DashboardNewProfileCard />
      </v-col>
      <v-col cols="3" v-for="i in 24">
        <DashboardProfileCard />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
