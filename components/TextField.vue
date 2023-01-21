<template>
  <v-text-field
    density="compact"
    color="primary"
    variant="outlined"
    :type="showText ? 'text' : 'password'"
    :append-inner-icon="getInnerIcon"
    @click:append-inner="showText = !showText"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  withEye: {
    type: Boolean,
    default: false,
  },
});
const showText = ref(false);
const getInnerIcon = computed(() => {
  if (!props.withEye) {
    return undefined;
  }
  return showText.value ? "mdi-eye" : "mdi-eye-off";
});
</script>

<style scoped></style>
