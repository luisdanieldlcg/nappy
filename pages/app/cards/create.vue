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
});

const createCard = async () => {
  useCardStore().create(dto, view);
};
</script>
