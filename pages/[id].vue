<template>
  <v-row justify="center" class="mt-16">
    <v-col cols="3">
      <CardCover :card="card!" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const params = useRoute().params;
const cardId = params.id as string;

const cardStore = useCardStore();
const card = await cardStore.fetchById(cardId);

if (!card) {
  navigateTo("/login");
}
</script>
