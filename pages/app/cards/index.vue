<template>
  <NuxtLayout name="dashboard">
    <v-row>
      <v-col
        cols="12"
        sm="9"
        md="6"
        xl="4"
        v-for="card in cardStore.cards"
        :key="card.id"
      >
        <ConfirmDialog
          v-model="deleteConfirm"
          @close="deleteConfirm = false"
          @trigger="deleteCard(card)"
          :loading="view.isLoading()"
        />
        <CardPresentation :card="card">
          <CardActionButton
            icon="mdi-pencil"
            tooltip="Edit Card"
            @click="openEditor"
          />
          <CardActionButton
            icon="mdi-trash-can-outline"
            tooltip="Delete Card"
            @click="deleteConfirm = true"
          />
        </CardPresentation>
      </v-col>
    </v-row>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { CardDTO } from "~~/api/dtos/card.dto";
import { useCardStore } from "~~/stores/card.store";

const cardStore = useCardStore();
const deleteConfirm = ref(false);
const view = new ViewState();

const openEditor = () => {
  navigateTo("/app/cards/edit");
};

const deleteCard = async (card: CardDTO) => {
  await useCardStore().deleteById(card.id, view);
};
</script>

<style scoped></style>
