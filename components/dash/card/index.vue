<template>
  <ConfirmDialog
    v-model="deleteConfirm"
    @close="deleteConfirm = false"
    @trigger="deleteSelected"
    :loading="view.isLoading()"
  />

  <div class="text-center mt-6">
    <v-chip> {{ card.label }} </v-chip>
    <v-card class="card-shadow-light" color="background" :elevation="0">
      <v-hover v-slot="{ isHovering, props }">
        <v-img
          v-bind="props"
          cover
          class="align-end"
          src="https://wallpaperaccess.com/full/2774333.jpg"
        >
          <v-overlay
            :close-on-content-click="false"
            :model-value="isHovering"
            contained
            class="align-center justify-center"
          >
            <DashCardActionButton icon="mdi-pencil" tooltip="Edit Card" />
            <DashCardActionButton
              icon="mdi-trash-can-outline"
              tooltip="Delete Card"
              @click="deleteConfirm = true"
            />
          </v-overlay>
        </v-img>
      </v-hover>

      <v-container class="pa-6">
        <div class="mb-8">
          <v-avatar
            color="white"
            size="108"
            style="
              position: absolute;
              transform: translate(-50%, -86%);
              z-index: 1;
            "
          >
            <v-avatar
              image="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
              size="100"
            >
            </v-avatar>
          </v-avatar>
        </div>
        <div class="text-left text-grey-subtitle">
          <h1>{{ card.firstName + " " + card.lastName }}</h1>
          <h2 class="font-weight-medium">{{ card.jobTitle }}</h2>
          <h2 class="font-weight-medium">{{ card.company }}</h2>
        </div>
        <!-- <v-list-item subtitle="Personal" class="mt-5 pa-0">
          <template #prepend>
            <v-avatar color="red">
              <v-icon icon="mdi-email"></v-icon>
            </v-avatar>
          </template>
          <template #title>
            <p class="font-weight-bold">danikingrd@gmail.com</p>
          </template>
        </v-list-item> -->
      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useCardStore } from "~~/stores/card.store";
import { CardDTO } from "../../../api/dtos/card.dto";
const props = defineProps<{
  card: CardDTO;
}>();
const view = new ViewState();
const deleteSelected = async () => {
  await useCardStore().deleteById(props.card.id, view);
  deleteConfirm.value = false;
};
const deleteConfirm = ref(false);
</script>
