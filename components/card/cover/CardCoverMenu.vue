<template>
  <v-card-actions class="pt-0">
    <v-spacer></v-spacer>
    <v-menu>
      <template #activator="{ props }">
        <v-btn icon="mdi-dots-vertical" v-bind="props" :ripple="false"></v-btn>
      </template>
      <v-list class="elevation-0 card-shadow-light rounded-lg">
        <v-list-item
          v-for="item in items"
          @click="onMenuClicked(item)"
          :ripple="false"
        >
          <v-list-item-title>
            {{ item.title }}
            <v-icon class="ml-3" :icon="item.icon" />
          </v-list-item-title>
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
  action: "delete" | "edit" | "view";
  icon: string;
}
const items: MenuItem[] = [
  {
    title: "View",
    navigateTo: `/${props.card.id}`,
    action: "view",
    icon: "mdi-eye",
  },
  {
    title: "Edit",
    navigateTo: `cards/edit/${props.card.id}`,
    action: "edit",
    icon: "mdi-pencil",
  },
  {
    title: "Delete",
    action: "delete",
    icon: "mdi-delete",
  },
];

const onMenuClicked = (item: MenuItem) => {
  emit("menuClicked", props.card);
  switch (item.action) {
    case "delete":
      useDialogStore().open();
      break;
    case "edit":
      navigateTo(item.navigateTo);
      break;
    case "view":
      navigateTo(item.navigateTo);
      break;
  }
};
</script>

<style scoped></style>
