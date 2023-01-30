<template>
  <v-card>
    <v-row justify="center" class="mb-2">
      <v-col cols="3">
        <v-icon class="profile-icon" icon="mdi-account-circle"></v-icon>
      </v-col>
    </v-row>
    <div class="text-center">
      <p class="font-weight-bold">Luis de la Cruz</p>
      <p>CEO at MediaCruz</p>
    </div>
  </v-card>
</template>

<script setup lang="ts"></script>

<style scoped>
.profile-icon {
  font-size: 64px;
  border: solid 3px;
  border-radius: 50%;
}
</style>
