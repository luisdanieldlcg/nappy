<template>
  <div>
    <v-card class="text-center my-6 insight-card elevation-0 pa-5">
      <v-card-text>
        <v-btn
          variant="tonal"
          color="primary"
          :icon="icon"
          size="64"
          :ripple="false"
          elevation="0"
        ></v-btn>
        <p :class="`text-h3 font-weight-bold`">
          {{ quantity }}
        </p>
        <p class="text-h6 font-weight-bold">{{ title }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
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

<style scoped></style>
