<template>
  <div class="text-left text-grey-subtitle">
    <h1>{{ card.firstName + " " + card.lastName }}</h1>
    <h2 class="font-weight-medium">{{ card.jobTitle }}</h2>
    <h2 class="font-weight-medium">{{ card.company }}</h2>
    <!-- <v-list-item subtitle="Personal" class="mt-5 pa-0">
      <template #prepend>
        <v-avatar color="red">
          <v-icon icon="mdi-email"></v-icon>
        </v-avatar>
      </template>
      <template #title>
        <p class="font-weight-bold">danikingrd@gmail.com</p>
      </template>
    </v-list-item> -->
  </div>
</template>

<script setup lang="ts">
import { ICardDTO } from '~~/api/dtos/card.dto';


defineProps<{
  card: ICardDTO;
}>();
</script>
