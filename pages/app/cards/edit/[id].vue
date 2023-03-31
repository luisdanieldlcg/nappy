<template>
  <NuxtLayout name="dashboard" :header="header">
    <template #append>
      <v-tooltip text="Save changes" location="bottom">
        <template #activator="{ props }">
          <v-avatar
            @click=""
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
    <CardEditor :card="card" :loading="false" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { DashPageHeader } from "~~/layouts/dashboard.vue";
import { useCardStore } from "~~/stores/card.store";

const params = useRoute().params;
const cardId = params.id as string;
const cardStore = useCardStore();
const card = cardStore.getById(cardId);
if (card === undefined) {
  throw "Card not found";
}
const header: DashPageHeader = {
  title: "Edit card",
  icon: "mdi-card-account-details-outline",
  canGoBack: true,
};

const save = async (form: FormData) => {
  // if (card.isJust) {
  //   // const editor = useCardEditorStore();
  //   // if (editor.canvas) {
  //   //   editor.canvas.toBlob((blob) => {
  //   //     if (blob) {
  //   //       form.append("backgroundImage", blob);
  //   //       cardStore.updateById(card.value, form, view);
  //   //     }
  //   //   });
  //   // } else {
  //   //   cardStore.updateById(card.value, form, view);
  //   // }
  // }
};
</script>

<style scoped>
.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
}
</style>
