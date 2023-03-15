<template>
  <v-card
    :min-width="250"
    :max-width="320"
    height="400"
    class="text-left card-shadow-light"
    elevation="0"
  >
    <CardHeader :avatar-size="100" />

    <v-card-text class="pl-4 pt-3">
      <div class="text-grey-subtitle text-center">
        <div class="mt-14">
          <v-chip> {{ card.label }} </v-chip>
        </div>
        <h1 class="mt-4 text-no-wrap">
          {{ card.firstName + " " + card.lastName }}
        </h1>
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
