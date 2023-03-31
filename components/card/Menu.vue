<template>
  <v-card-actions class="pt-0">
    <v-spacer></v-spacer>
    <v-menu>
      <template #activator="{ props }">
        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
      </template>
      <v-list class="elevation-2">
        <v-list-item v-for="item in items" @click="onMenuClicked(item)">
          <v-list-item-title> {{ item.title }} </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card-actions>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";
const emit = defineEmits<{
  (e: "menuClicked", card: ICardDTO): void;
}>();

const props = defineProps<{
  card: ICardDTO;
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
  if (item.action === "edit") {
    navigateTo(item.navigateTo);
  }
};
</script>

<style scoped></style>
