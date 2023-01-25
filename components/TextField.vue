<template>
  <v-text-field
    density="compact"
    color="primary"
    variant="filled"
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
// By default show text if there is no eye property
const showText = ref(!props.withEye);
const getInnerIcon = computed(() => {
  if (!props.withEye) {
    return undefined;
  }
  return showText.value ? "mdi-eye" : "mdi-eye-off";
});
</script>

<style scoped></style>
