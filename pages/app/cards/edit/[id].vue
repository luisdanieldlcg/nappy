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
import { DashPageHeader } from "~~/layouts/dashboard.vue";
import { useCardEditorStore } from "~~/stores/card-editor.store";
import { useCardStore } from "~~/stores/card.store";
const view = new ViewState();

const params = useRoute().params;
const cardId = params.id as string;
const cardStore = useCardStore();
const card = cardStore.getById(cardId);

const header: DashPageHeader = {
  title: "Edit card",
  icon: "mdi-card-account-details-outline",
  canGoBack: true
};

const save = async (form: FormData) => {
  if (card.isJust) {
    const editor = useCardEditorStore();
    if (editor.canvas) {
      editor.canvas.toBlob((blob) => {
        if (blob) {
          form.append("backgroundImage", blob);
          cardStore.updateById(card.value, form, view);
        }
      });
    } else {
      cardStore.updateById(card.value, form, view);
    }
  }
};
</script>

<style scoped>
.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
}
</style>
