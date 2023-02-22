<template>
  <v-avatar color="grey-lighten-2" size="32" class="ml-4 hover-effect">
    <v-icon :icon="icon" size="16" />
  </v-avatar>
</template>
<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
});
const f = () => {};
const dialog = ref(false);
</script>

<style scoped lang="scss">
.hover-effect {
  transition: 0.15s ease-in;
  &:hover {
    transform: translateY(-4px);
    cursor: pointer;
  }
}
</style>
