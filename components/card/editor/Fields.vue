<template>
  <v-expansion-panels style="width: 300px" class="mt-6">
    <!-- <v-progress-linear
      :indeterminate="loading"
      :active="loading"
    ></v-progress-linear> -->
    <TextField
      style="order: 0"
      label="Card Title"
      hint="Enter the title for this card"
      v-model="card.label"
    />
    <slot name="before-panels"></slot>
    <DashFieldExpansion title="Full Name" style="order: 2">
      <TextField label="First Name" v-model="card.firstName" />

      <TextField label="Last Name" v-model="card.lastName" />
    </DashFieldExpansion>

    <DashFieldExpansion title="More details" style="order: 3">
      <TextField label="Job Title" v-model="card.jobTitle" />
      <TextField label="Company Name" v-model="card.company" />
    </DashFieldExpansion>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";

defineProps<{
  card: ICardDTO;
}>();
</script>

<style lang="scss" scoped></style>
