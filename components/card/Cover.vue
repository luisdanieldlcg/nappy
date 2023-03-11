<template>
  <v-card width="220" height="280">
    <v-img
      color="background"
      cover
      class="align-end"
      :max-height="120"
      :src="backgroundImage"
    >
    </v-img>
    <div>
      <v-avatar
        color="white"
        size="78"
        style="position: absolute; transform: translate(92%, -55%); z-index: 1"
      >
        <v-avatar :image="avatarImage" size="70" />
      </v-avatar>
    </div>

    <div class="text-center mt-10 text-grey-subtitle">
      <v-chip size="small"> {{ label }} </v-chip>
      <h3 class="mt-2">{{ fullName }}</h3>
    </div>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list class="elevation-2">
          <v-list-item
            v-for="item in menuItems"
            :to="item.navigate"
            @click="item.onClick"
          >
            <v-list-item-title> {{ item.title }} </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { cardCoverMenuItems } from "~~/config/card-cover-menu";
import { useCardStore } from "~~/stores/card.store";
const store = useCardStore(); // TODO: maybe pass this to onClick() callback.
const menuItems = cardCoverMenuItems;

defineProps({
  fullName: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true,
  },
  avatarImage: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
