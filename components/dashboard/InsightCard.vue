<template>
  <div>
    <v-card class="text-center insight-card elevation-0">
      <v-card-text>
        <v-btn
          variant="tonal"
          color="primary"
          :icon="icon"
          size="64"
          :ripple="false"
          elevation="0"
        ></v-btn>
        <p :class="`text-h3 font-weight-bold mt-2 pa-1`">
          {{ quantity }}
        </p>
        <p class="text-h6 font-weight-bold">{{ title }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: String,
  quantity: {
    type: Number,
    default: 0,
  },
  icon: {
    type: String,
  },
  theme: {
    type: String,
    default: "aqua",
  },
});
</script>
