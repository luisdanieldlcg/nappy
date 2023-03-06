<template>
  <div class="text-center" :style="containerStyle">
    <v-chip> {{ card.label }} </v-chip>
    <v-card
      class="card-shadow-light"
      color="background"
      :elevation="0"
      :min-width="320"
      :max-width="400"
    >
      <slot name="header">
        <CardPresentationHeader :image="card.backgroundImage">
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
import { useDisplay } from "vuetify/lib/framework.mjs";
import { CardDTO } from "~~/api/dtos/card.dto";
const { lgAndDown } = useDisplay();

const containerStyle = computed(() => {
  return lgAndDown.value
    ? {
        width: "400px",
      }
    : undefined;
});
defineProps<{
  card: CardDTO;
}>();
</script>
