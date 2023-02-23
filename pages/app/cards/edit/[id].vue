<template>
  <NuxtLayout name="dashboard" :header="header">
    <CardEditor
      mode="edit"
      :card="card.value"
      @on-finish="save"
      :loading="view.isLoading()"
    />
    <DropZone />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useCardStore } from "~~/stores/card.store";
const header = {
  title: "Edit card",
  icon: "mdi-card-account-details-outline",
  target: "/app/cards/edit",
};
const view = new ViewState();
const cardStore = useCardStore();
const params = useRoute().params;
const card = cardStore.getById(params.id as string);
if (card.isNothing) {
  throw "Unknown card";
}

const save = async () => {
  await cardStore.updateById(card.value, view);
};
</script>
