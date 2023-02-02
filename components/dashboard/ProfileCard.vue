<template>
  <DashboardBaseProfileCard class="display-profile">
    <v-row justify="center" class="mb-2">
      <v-col cols="3">
        <v-icon class="profile-icon" icon="mdi-account-circle"></v-icon>
      </v-col>
    </v-row>
    <div class="text-center">
      <p class="font-weight-bold">Luis de la Cruz</p>
      <p>CEO at MediaCruz</p>
    </div>
  </DashboardBaseProfileCard>
</template>

<script setup lang="ts"></script>

<style scoped>
.profile-icon {
  font-size: 64px;
  border: solid 3px;
  border-radius: 50%;
}
.display-profile {
  border: solid 1.2px rgb(221, 221, 221);
  border-radius: 12px !important;
  background-color: white !important;
}
</style>
