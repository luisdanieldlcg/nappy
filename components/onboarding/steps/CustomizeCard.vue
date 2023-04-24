<template>
  <div class="text-center">
    <h1 class="text-grey-subtitle">Create your first card</h1>
    <p class="text-muted">Unleash your creativity and design a stunning card</p>
    <h3 class="text-grey-subtitle py-6">Add your personal details</h3>
    <v-row justify="center">
      <v-col cols="1" v-for="entry in personalDetailsFields">
        <CardLinkButton
          :label="entry.label"
          :icon="entry.icon"
          @click="$emit('field-click', entry)"
        />
      </v-col>
    </v-row>
    <h3 class="text-grey-subtitle py-6">Add your links</h3>
    <v-row justify="center">
      <v-col cols="7">
        <BusinessCardLinks center-title />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const personalDetailsFields = [
  {
    label: "Name",
    icon: "mingcute:user-1-line",
  },
  {
    label: "Job Title",
    icon: "tabler:briefcase",
  },
  {
    label: "Company",
    icon: "solar:buildings-outline",
  },
];
</script>

<style scoped></style>
