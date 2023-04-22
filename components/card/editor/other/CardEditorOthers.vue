<template>
  <DashNote
    centered
    title="The following fields do not appear on the card"
    icon="mdi-warning-circle-outline"
  />

  <DashNote
    title="Customize Card URL"
    icon="solar:link-circle-linear"
    class="mt-10"
  />
  <v-text-field
    variant="filled"
    v-model="slug"
    density="compact"
    style="max-width: 500px"
  >
    <template #details>
      <Icon name="ph:link-simple-bold" size="15" class="mr-2" />
      <p style="font-size: 13px" class="font-italic text-grey-darken-3 mt-1">
        Your card will be located at: {{ permalink }}
      </p>
    </template>
    <template #label>Custom URL </template>
  </v-text-field>
</template>

<script setup lang="ts">
const slug = ref("");
const permalink = computed(() => {
  return "localhost:3000/" + slug.value;
});
</script>

<style scoped></style>
