<template>
  <div class="text-center mb-5">
    <v-btn elevation="0" icon color="background" size="large">
      <Icon :name="icon" />
    </v-btn>
    <p style="font-size: 12px" class="mt-2 text-capitalize">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
const s = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
console.log(s.icon);
</script>
