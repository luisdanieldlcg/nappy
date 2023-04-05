<template>
  <div
    class="mb-3 mt-2 d-flex"
    :class="{
      'justify-center': centered,
    }"
  >
    <v-card
      class="elevation-0 pa-2 pr-5"
      color="background"
      style="margin: 0 !important"
    >
      <p class="ml-6">
        {{ title }}
        <v-icon color="primary" class="mb-1 ml-2">{{ icon }}</v-icon>
      </p>
    </v-card>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "mdi-information-outline",
    required: false,
  },
  centered: {
    type: Boolean,
    default: false,
    required: false,
  },
});
</script>
