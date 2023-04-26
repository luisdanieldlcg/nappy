<template>
  <v-img
    :src="image"
    :lazy-src="image"
    width="100%"
    cover
    @error="showBanner = true"
  >
    <v-card
      v-if="showBanner || !image"
      v-bind="$attrs"
      :color="fallbackColor"
      width="100%"
      style="top: -32px; left: -32px; border-radius: 0 !important"
      :elevation="0"
    >
    </v-card>
  </v-img>
</template>

<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    deafult: undefined,
  },
  fallbackColor: {
    type: String,
    default: undefined,
  },
});
const showBanner = ref(false);
</script>
