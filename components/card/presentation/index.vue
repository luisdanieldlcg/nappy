<template>
  <div class="text-center mt-6">
    <v-chip> {{ card.label }} </v-chip>
    <v-card class="card-shadow-light" color="background" :elevation="0">
      <slot name="header">
        <CardPresentationHeader :image="image">
          <slot></slot>
        </CardPresentationHeader>
      </slot>

      <v-container class="pa-6">
        <CardPresentationAvatar
          image="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
        />
        <CardPresentationFooter :card="card" />
      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { CardDTO } from "~~/api/dtos/card.dto";
defineProps<{
  card: CardDTO;
  image: string;
}>();
</script>
