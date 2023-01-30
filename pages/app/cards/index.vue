<template>
  <div>
    <h1>Cards</h1>

    <v-row>
      <v-col>
        <CreateProfileCard />
      </v-col>
      <v-col cols="3" v-for="i in 24">
        <ProfileCard />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
