<template>
  <v-img
    v-bind="$attrs"
    color="background"
    class="align-end"
    :lazy-src="coverImage"
    :src="coverImage"
    cover
  >
    <v-card
      v-if="!coverImage"
      :color="color"
      width="100%"
      elevation="0"
      :border="true"
      height="160"
      style="top: 30px; left: -32px; border-radius: 0 !important"
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
    <v-avatar color="white" :size="avatarSize" style="position: absolute">
      <v-avatar
        v-if="avatarImage"
        image="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
        :size="avatarSize"
      />
      <v-icon
        v-else
        icon="mdi-account-circle"
        color="grey"
        :size="avatarSize"
      />
    </v-avatar>
  </div>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";
import { Card } from "~~/stores/card-editor.store";

defineProps<{
  coverImage?: string;
  avatarImage?: string;
  color: string;
  avatarSize: number;
}>();
</script>
