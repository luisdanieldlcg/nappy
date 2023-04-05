<template>
  <Suspense>
    <template #default>
      <NuxtLayout name="dashboard" :header="header">
        <template #append>
          <DoneAction @done="save" />
        </template>
        <CardEditor
          :card="card!"
          :loading="cardStore.loadTracker.updatingById"
        />
      </NuxtLayout>
    </template>
    <template #fallback> </template>
  </Suspense>
</template>

<script setup lang="ts">
import { DashPageHeader } from "~~/layouts/dashboard.vue";
import { useCardStore } from "~~/stores/card.store";

const params = useRoute().params;
const cardId = params.id as string;
const editor = useCardEditorStore();
const cardStore = useCardStore();

const header: DashPageHeader = {
  title: "Edit card",
  icon: "mdi-card-account-details-outline",
  canGoBack: true,
};

const card = cardStore.getById(cardId);

const save = async () => {
  const form = editor.createForm();
  cardStore.updateById(cardId, form);
};
</script>
