<template>
  <v-img
    v-bind="$attrs"
    color="background"
    cover
    class="align-end"
    :lazy-src="card.coverImage"
    :src="card.coverImage"
  >
    <v-card
      :color="card.color"
      width="100%"
      elevation="0"
      :border="true"
      height="160"
      style="top: 30px; left: -32px"
    />
    <template #placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
  </v-img>

  <!-- I need to make the card move down the elements even if its absolute -->

  <div class="d-flex flex-column justify-center align-center">
    <v-avatar color="white" :size="avatarSize + 8" style="position: absolute">
      <v-avatar
        image="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
        :size="avatarSize"
      />
    </v-avatar>
  </div>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";

defineProps<{
  card: ICardDTO;
  avatarSize: number;
}>();
</script>
