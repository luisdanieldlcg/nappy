<template>
  <v-card-actions class="pt-0">
    <v-spacer></v-spacer>
    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" icon :ripple="false">
          <Icon name="mdi:dots-vertical" />
        </v-btn>
      </template>
      <v-list class="elevation-0 card-shadow-light rounded-lg">
        <v-list-item
          v-for="item in items"
          @click="onMenuClicked(item)"
          :ripple="false"
        >
          <v-list-item-title>
            {{ item.title }}
            <Icon class="ml-3" :name="item.icon" />
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card-actions>
</template>

<script setup lang="ts">
import { CardDTO } from '~~/api/dtos/card.dto';

const emit = defineEmits<{
  (e: "menuClicked", card: CardDTO): void;
}>();

const props = defineProps<{
  card: CardDTO;
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
    icon: "solar:eye-bold-duotone",
  },
  {
    title: "Edit",
    navigateTo: `cards/edit/${props.card.id}`,
    action: "edit",
    icon: "solar:pen-2-bold-duotone",
  },
  {
    title: "Delete",
    action: "delete",
    icon: "solar:trash-bin-2-bold-duotone",
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
