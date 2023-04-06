<template>
  <v-tooltip text="Delete All" location="bottom">
    <template #activator="{ props }">
      <Icon
        class="ml-5 mt-1"
        size="32"
        name="solar:trash-bin-minimalistic-outline"
        v-bind="props"
        @click="openModal"
      />
    </template>
  </v-tooltip>
  <ConfirmDialog
    subtitle="All the cards will be permanently deleted and cannot be restored."
    v-model="dialogHandler"
    :loading="cardStore.loadTracker.deletingById"
    default-action-title="Delete All"
    @default-action="deleteAll"
  >
  </ConfirmDialog>
</template>

<script setup lang="ts">
const dialogHandler = ref(false);

const cardStore = useCardStore();

const deleteAll = async () => {
  if (cardStore.cards.length > 0) {
    await cardStore.deleteAll();
  }
  dialogHandler.value = false;
};
const openModal = async () => {
  dialogHandler.value = true;
};
</script>

<style scoped></style>
