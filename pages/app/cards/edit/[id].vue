<template>
  <NuxtLayout name="dashboard" :header="header">
    <CardEditor
      mode="edit"
      :card="card.value"
      @on-finish="save"
      :loading="view.isLoading()"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useCardEditorStore } from "~~/stores/card-editor.store";
import { useCardStore } from "~~/stores/card.store";
const img = ref(
  "https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
);
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
const editorStore = useCardEditorStore();
const save = async () => {
  await cardStore.updateById(card.value, view);
};
</script>

<style scoped>
.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
}
</style>
