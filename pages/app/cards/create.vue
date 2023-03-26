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
      :loading="cardManager.loadTracker.creating"
      mode="create"
      :card="dto"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ICardDTO } from "~~/api/dtos/card.dto";
import { DashPageHeader } from "~~/layouts/dashboard.vue";
import { useCardEditorStore } from "~~/stores/card-editor.store";
import { useCardStore } from "~~/stores/card.store";

const header: DashPageHeader = {
  title: "Create a New Card",
  icon: "mdi-card-account-details-outline",
  canGoBack: true,
};
useCardEditorStore().$reset();
useImageEditor().$reset();
const dto = reactive<ICardDTO>({
  id: "",
  label: "Work",
  firstName: "Luis",
  lastName: "de la Cruz",
  jobTitle: "",
  company: "",
  coverImage: "",
  color: "red",
  avatarImage: "",
});
const cardManager = useCardStore();
const createCard = async () => {
  const store = useCardEditorStore();
  await store.submit();
  store.$dispose(); // FIXME find a workaround to this
};
</script>
