<template>
  <NuxtLayout name="dashboard" :header="header">
    <v-row>
      <v-col
        cols="12"
        sm="9"
        md="6"
        xl="4"
        v-for="card in cardStore.cards"
        :key="card.id"
      >
        <CardPresentation
          :card="card"
          mode="view"
          @on-delete="onDeleteClicked"
          @on-edit="openEditor"
        />
      </v-col>
    </v-row>
    <ConfirmDialog
      v-model="deleteConfirm"
      @close="deleteConfirm = false"
      @trigger="deleteCard"
      :loading="view.isLoading()"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { CardDTO } from "~~/api/dtos/card.dto";
import { useCardStore } from "~~/stores/card.store";
const header = {
  title: "Cards",
  icon: "mdi-card-account-details-outline",
  target: "/app/cards",
};

const cardStore = useCardStore();
const deleteConfirm = ref(false);
const view = new ViewState();

// We need to keep track of the active card manually because it will be passed to the ConfirmDialog.
// The confirm dialog has no idea of which card do we want to delete.
// Another solution would be to move the dialog to the v-for block but that could cause
// performance issues because it would create a new instance per card.
const activeCard = ref<CardDTO | null>(null);

const onDeleteClicked = (card: CardDTO) => {
  activeCard.value = card;
  deleteConfirm.value = true;
};

const openEditor = (card: CardDTO) => {
  navigateTo(`/app/cards/edit/${card.id}`);
};

const deleteCard = async () => {
  if (activeCard.value) {
    await useCardStore().deleteById(activeCard.value?.id!, view);
    deleteConfirm.value = false;
  }
};
</script>

<style scoped></style>
