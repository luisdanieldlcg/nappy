<template>
  <Suspense>
    <NuxtLayout name="dashboard" :header="header">
      <template #default>
        <CardEditor
          v-if="card.isJust"
          mode="edit"
          :card="card.value"
          @on-finish="save"
          :loading="view.isLoading()"
        />
      </template>
      <template #fallback>
        <h1>loading............</h1>
      </template>
    </NuxtLayout>
  </Suspense>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCardStore } from "~~/stores/card.store";
const view = new ViewState();

const params = useRoute().params;
const cardStore = useCardStore();
await cardStore.waitUntilFetch();
const card = cardStore.getById(params.id as string);

const header = {
  title: "Edit card",
  icon: "mdi-card-account-details-outline",
  target: "/app/cards/edit",
};

const save = async () => {
  // if (card.isJust) {
  //   await cardStore.updateById(card.value, view);
  // }
};
</script>

<style scoped>
.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
}
</style>
