<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-img
      v-bind="props"
      cover
      class="align-end"
      :lazy-src="image"
      :src="image"
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
    required: true,
  },
});
</script>
