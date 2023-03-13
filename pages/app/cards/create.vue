<template>
  <NuxtLayout name="dashboard" :header="header">
    <CardEditor
      mode="create"
      :card="dto"
      @on-finish="createCard"
      :loading="view.isLoading()"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ICreateCardDTO } from "~~/api/dtos/card.dto";
import { DashPageHeader } from "~~/config/dash/header";
import { useCardEditorStore } from "~~/stores/card-editor.store";
import { useCardStore } from "~~/stores/card.store";
const header: DashPageHeader = {
  title: "Create a New Card",
  icon: "mdi-card-account-details-outline",
  target: "/app/cards/create",
  saveHandler() {
    
  }
};
const view = new ViewState();
const dto = reactive<ICreateCardDTO>({
  id: "",
  label: "Work",
  firstName: "Luis",
  lastName: "de la Cruz",
  jobTitle: "",
  company: "",
  backgroundImage: "",
});
const cardStore = useCardStore();
const createCard = async (form: FormData) => {
  const editor = useCardEditorStore();
  if (editor.canvas) {
    editor.canvas.toBlob((blob) => {
      if (blob) {
        form.append("backgroundImage", blob);
        cardStore.create(form, view);
      }
    });
  } else {
    cardStore.create(form, view);
  }
};
</script>
