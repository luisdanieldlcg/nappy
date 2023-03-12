<template>
  <v-card width="340" height="400" class="card-shadow-light text-left">
    <CardHeader :avatar-size="100" />
    <div class="text-center mt-16">
      <v-chip> {{ card.label }} </v-chip>
    </div>
    <v-card-text class="pl-6 pt-3">
      <div class="text-grey-subtitle">
        <h1 class="mt-2">{{ card.firstName + " " + card.lastName }}</h1>
        <p class="text-h6 mt-2">{{ card.jobTitle }}</p>
        <p class="text-h6">{{ card.company }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";

defineProps<{
  card: ICardDTO;
}>();
</script>
