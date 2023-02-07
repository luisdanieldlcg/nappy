<template>
  <v-card class="card-shadow-light" color="background" :elevation="0">
    <v-img
      cover
      class="align-end"
      src="https://wallpaperaccess.com/full/2774333.jpg"
    >
    </v-img>

    <v-container>
      <div class="text-center pa-3">
        <v-avatar
          color="white"
          size="108"
          style="
            position: absolute;
            top: 47%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
          "
        >
          <v-avatar
            image="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
            size="100"
          >
          </v-avatar>
        </v-avatar>
      </div>
      <h1>{{ fullName }}</h1>
      <h2 class="font-weight-medium">Architect</h2>
      <v-list-item subtitle="Personal" class="mt-5 pa-0">
        <template #prepend>
          <v-avatar color="red">
            <v-icon icon="mdi-email"></v-icon>
          </v-avatar>
        </template>
        <template #title>
          <p class="font-weight-bold">danikingrd@gmail.com</p>
        </template>
      </v-list-item>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  fullName: {
    type: String,
    required: true,
  },
});
</script>
