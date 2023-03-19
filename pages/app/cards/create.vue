<template>
  <NuxtLayout name="dashboard" :header="header">
    <template #append>
      <v-tooltip text="Save changes" location="bottom">
        <template #activator="{ props }">
          <v-avatar
            @click="createCard"
            v-bind="props"
            class="ml-2"
            icon="mdi-check"
            color="transparent"
            size="36"
            style="cursor: pointer"
          />
        </template>
      </v-tooltip>
    </template>
    <CardEditor
      mode="create"
      :card="dto"
      @on-finish="createCard"
      :loading="cardManager.loadTracker.creating"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ICreateCardDTO } from "~~/api/dtos/card.dto";
import { DashPageHeader } from "~~/layouts/dashboard.vue";
import { useCardEditorStore } from "~~/stores/card-editor.store";
import { useCardStore } from "~~/stores/card.store";

const header: DashPageHeader = {
  title: "Create a New Card",
  icon: "mdi-card-account-details-outline",
  canGoBack: true,
};
const dto = reactive<ICreateCardDTO>({
  id: "",
  label: "Work",
  firstName: "Luis",
  lastName: "de la Cruz",
  jobTitle: "",
  company: "",
  coverImage: "",
  color: "",
});
const cardManager = useCardStore();
const createCard = async () => {
  const store = useCardEditorStore();
  await store.submit(dto);
  store.$dispose(); // FIXME find a workaround to this
};
</script>
