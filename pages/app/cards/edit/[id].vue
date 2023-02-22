<template>
  <NuxtLayout name="dashboard" :header="header">
    <CardEditor
      :card="card.value"
      @on-finish="save"
      :loading="view.isLoading()"
    />
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
const save = async () => {};
</script>
