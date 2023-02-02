<template>
  <div>
    <h1 class="text-center mt-4 font-weight-regular text-light-grey">Cards</h1>
    <v-row align="center" justify="center">
      <v-col cols="4" v-for="i in 24">
        <DashboardProfileCard />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
