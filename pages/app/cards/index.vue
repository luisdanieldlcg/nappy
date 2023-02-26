<template>
  <NuxtLayout name="dashboard" :header="header">
    <v-row justify="center">
      <v-col
        class="pa-0"
        cols="12"
        sm="5"
        md="4"
        v-for="card in cardStore.cards"
        :key="card.id"
      >
        <CardPresentation
          :card="card"
          image="https://wallpaperaccess.com/full/2774333.jpg"
        >
          <CardActionButton
            icon="mdi-pencil"
            tooltip="Edit Card"
            @click="openEditor(card)"
          />
          <CardActionButton
            icon="mdi-trash-can-outline"
            tooltip="Delete Card"
            @click="onDeleteClicked(card)"
          />
        </CardPresentation>
      </v-col>
    </v-row>
    <ConfirmDialog
      title="Are you sure?"
      subtitle="This card will be permanently deleted and cannot be restored."
      v-model="deleteConfirm"
      @close="deleteConfirm = false"
      @trigger="deleteCard"
      :loading="view.isLoading()"
    >
      <template #icon>
        <v-icon
          icon="mdi-alert-circle-outline"
          color="grey-subtitle"
          size="40"
        ></v-icon>
      </template>
      <template #actions>
        <v-btn class="text-capitalize bg-primary" @click="deleteCard">
          Delete Card</v-btn
        >
      </template>
    </ConfirmDialog>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";
import { CardDTO } from "~~/api/dtos/card.dto";
import { useCardStore } from "~~/stores/card.store";
const {} = useDisplay();
const header = {
  title: "Cards",
  icon: "mdi-card-account-details-outline",
  target: "/app/cards",
};

// We need to keep track of the active card manually because it will be passed to the ConfirmDialog.
// The confirm dialog has no idea of which card do we want to delete.
// Another solution would be to move the dialog to the v-for block but that could cause
// performance issues because it would create a new instance per card.
const activeCard = ref<CardDTO | null>(null);
const cardStore = useCardStore();
const deleteConfirm = ref(false);
const view = new ViewState();

const onDeleteClicked = (card: CardDTO) => {
  activeCard.value = card;
  deleteConfirm.value = true;
};

const deleteCard = async () => {
  if (activeCard.value) {
    console.log("====");
    await useCardStore().deleteById(activeCard.value.id, view);
  }
  deleteConfirm.value = false;
};

const openEditor = (card: CardDTO) => {
  navigateTo(`/app/cards/edit/${card.id}`);
};
</script>

<style scoped></style>
