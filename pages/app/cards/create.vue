<template>
  <NuxtLayout name="dashboard" :header="header">
    <template #prepend>
      <v-tooltip text="Go back" location="bottom">
        <template #activator="{ props }">
          <v-avatar
            v-bind="props"
            color="transparent"
            :icon="'mdi-arrow-left'"
            size="48"
            class="ma-4"
            @click="$router.back()"
            style="cursor: pointer"
          />
        </template>
      </v-tooltip>
    </template>

    <template #append>
      <v-tooltip text="Save changes" location="bottom">
        <template #activator="{ props }">
          <v-avatar
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
      :loading="view.isLoading()"
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
