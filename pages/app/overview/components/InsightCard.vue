<template>
  <v-card flat>
    <v-container class="pa-6">
      <p class="text-card-subtitle">{{ title }}</p>
      <v-row>
        <v-col>
          <h1>{{ quantity }}</h1>
        </v-col>

        <v-col cols="4" sm="5" lg="4">
          <v-icon :icon="icon" size="40" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
