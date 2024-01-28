<template>
  <v-container class="mt-16 text-center">
    <h1 class="mt-3">We're almost done</h1>
    <v-progress-circular class="mt-16" indeterminate :size="128" :width="6" />
    <p class="mt-10">Bringing your card to life...</p>
  </v-container>
</template>

<script setup lang="ts">
const cardManager = useCardStore();

const finishOnboarding = async () => {
  const form = useOnboardingStore().createForm();
  await cardManager.create(form);
};

setTimeout(async () => {
  await finishOnboarding();
}, 1000);
</script>

<style scoped></style>
