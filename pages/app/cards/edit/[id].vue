<template>
  <NuxtLayout name="dashboard" :header="header">
    <template #append>
      <ActionDone @done="save" />
    </template>
    <CardEditor :card="card" :loading="cardStore.loadTracker.updatingById" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { DashPageHeader } from "~~/layouts/dashboard.vue";
import { useCardStore } from "~~/stores/card.store";

const params = useRoute().params;
const cardId = params.id as string;
const editor = useCardEditorStore();
const cardStore = useCardStore();
const card = cardStore.getById(cardId);

if (card === undefined) {
  throw "Card not found";
}

const header: DashPageHeader = {
  title: "Edit card",
  icon: "mdi-card-account-details-outline",
  canGoBack: true,
};

const save = async () => {
  const form = editor.createForm();
  cardStore.updateById(cardId, form);
};
</script>
