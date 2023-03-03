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
import { CreateCardDTO } from "~~/api/dtos/card.dto";
import { useCardEditorStore } from "~~/stores/card-editor.store";
import { useCardStore } from "~~/stores/card.store";
const header = {
  title: "Create a New Card",
  icon: "mdi-card-account-details-outline",
  target: "/app/cards/create",
};
const view = new ViewState();
const dto = reactive<CreateCardDTO>({
  id: "",
  label: "Work",
  firstName: "Luis",
  lastName: "de la Cruz",
  jobTitle: "",
  company: "",
  backgroundImage: "",
});

const createCard = async () => {
  const form = new FormData();
  const editor = useCardEditorStore();
  if (editor.canvas) {
    editor.canvas.toBlob((blob) => {
      console.log("======");
      if (blob) {
        form.append("backgroundImage", blob);
        Object.entries(dto).forEach(([key, value]) => {
          form.append(key, value);
        });
        useCardStore().create(form, view);
      }
    });
  }
};
</script>
