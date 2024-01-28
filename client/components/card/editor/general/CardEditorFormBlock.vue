<template>
  <h4 class="font-weight-medium text-grey-subtitle">{{ title }}</h4>
  <slot />
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
