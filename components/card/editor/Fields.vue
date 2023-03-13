<template>
  <v-expansion-panels style="width: 300px" >
    <!-- <v-progress-linear
      :indeterminate="loading"
      :active="loading"
    ></v-progress-linear> -->
    <TextField
      label="Card Title"
      hint="Enter the title for this card"
      v-model="card.label"
    />
    <DashFieldExpansion title="Full Name">
      <TextField label="First Name" v-model="card.firstName" />
      <TextField label="Last Name" v-model="card.lastName" />
    </DashFieldExpansion>

    <DashFieldExpansion title="More details">
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
