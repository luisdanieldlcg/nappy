<template>
  <div
    class="mb-3 mt-2 d-flex"
    :class="{
      'justify-center': centered,
    }"
  >
    <v-card
      class="elevation-0 pt-2 pb-1 pr-5"
      color="background"
      style="margin: 0 !important"
    >
      <p class="ml-5" style="font-size: 13px">
        {{ title }}
        <Icon :name="icon" class="ml-2 mb-1" color="#35393b" />
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
