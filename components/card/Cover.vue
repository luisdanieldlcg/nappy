<template>
  <v-card width="240" height="280" class="card-shadow-light">
    <CardHeader :max-height="115" :image="card.coverImage" />

    <div class="text-center mt-12 text-grey-subtitle">
      <v-chip size="small"> {{ card.label }} </v-chip>
      <h3 class="mt-1">{{ card.firstName + " " + card.lastName }}</h3>
    </div>

    <v-card-actions class="pt-0">
      <v-spacer></v-spacer>
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list class="elevation-2">
          <v-list-item
            v-for="item in items"
            :to="item.navigateTo"
            @click="onMenuClicked(item)"
          >
            <v-list-item-title> {{ item.title }} </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";

import { useDialogStore } from "~/stores/dialog-store";
const props = defineProps<{
  card: ICardDTO;
}>();
const emit = defineEmits<{
  (e: "menuClicked", card: ICardDTO): void;
}>();

interface MenuItem {
  title: string;
  navigateTo?: string;
  action: "delete" | "edit";
}
const items: MenuItem[] = [
  {
    title: "Edit",
    navigateTo: `cards/edit/${props.card.id}`,
    action: "edit",
  },
  {
    title: "Delete",
    action: "delete",
  },
];

const onMenuClicked = (item: MenuItem) => {
  emit("menuClicked", props.card);
  if (item.action === "delete") {
    useDialogStore().open();
  }
};
</script>
