<template>
  <v-card
    min-height="400"
    class="card-shadow-light"
    color="background"
    :elevation="0"
  >
    <v-img
      cover
      class="align-end"
      src="https://wallpaperaccess.com/full/2774333.jpg"
    >
      <v-row justify="center">
        <v-col cols="4">
          <v-avatar color="white" size="120">
            <v-avatar
              image="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
              size="112"
            >
            </v-avatar>
          </v-avatar>
        </v-col>
      </v-row>
    </v-img>
    <v-container>
      <h1 class="text-light-grey">Luis de la Cruz</h1>
      <h2 class="text-light-grey font-weight-medium">Architect</h2>
      <v-list-item subtitle="Personal" class="mt-5 pa-0">
        <template #prepend>
          <v-avatar color="red">
            <v-icon icon="mdi-email"></v-icon>
          </v-avatar>
        </template>
        <template #title>
          <p class="font-weight-bold text-light-grey">danikingrd@gmail.com</p>
        </template>
      </v-list-item>
    </v-container>
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
