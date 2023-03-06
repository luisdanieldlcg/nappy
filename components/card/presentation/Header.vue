<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-img
      v-bind="props"
      cover
      class="align-end"
      :max-height="250"
      :lazy-src="
        image ? imageUrl(image) : 'https://wallpaperaccess.com/full/2774333.jpg'
      "
      :src="
        image ? imageUrl(image) : 'https://wallpaperaccess.com/full/2774333.jpg'
      "
    >
      <v-overlay
        :close-on-content-click="false"
        :model-value="isHovering"
        contained
        class="align-center justify-center"
      >
        <slot></slot>
      </v-overlay>
    </v-img>
  </v-hover>
</template>

<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: false,
  },
});

const imageUrl = (path?: string): string => {
  return "http://localhost:3001/images/" + path;
};
</script>
