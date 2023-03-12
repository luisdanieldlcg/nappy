<template>
  <v-card width="220" height="280" class="elevation-1">
    <v-img
      color="background"
      cover
      class="align-end"
      :max-height="120"
      src="https://images.unsplash.com/photo-1569817480240-41de5e7283c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cm9hZCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80"
    >
    </v-img>
    <div>
      <v-avatar
        color="white"
        size="78"
        style="position: absolute; transform: translate(92%, -55%); z-index: 1"
      >
        <v-avatar
          image="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
          size="70"
        />
      </v-avatar>
    </div>

    <div class="text-center mt-10 text-grey-subtitle">
      <v-chip size="small"> {{ card.label }} </v-chip>
      <h3 class="mt-2">{{ card.firstName + " " + card.lastName }}</h3>
    </div>

    <v-card-actions>
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
