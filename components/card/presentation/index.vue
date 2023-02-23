<template>
  <div class="text-center mt-6">
    <v-chip> {{ card.label }} </v-chip>
    <v-card class="card-shadow-light" color="background" :elevation="0">
      <CardPresentationHeader
        image="https://wallpaperaccess.com/full/2774333.jpg"
      >
        <template v-if="mode === 'view'">
          <CardActionButton
            icon="mdi-trash-can-outline"
            tooltip="Delete Card"
            @click="emit('onDelete', props.card)"
          />
          <CardActionButton
            icon="mdi-pencil"
            tooltip="Edit Card"
            @click="emit('onEdit', props.card)"
          />
        </template>
        <template v-else-if="mode === 'create' || mode === 'edit'">
          <CardActionButton
            icon="mdi-pencil"
            tooltip="Edit Card"
            @click="emit('onEdit', props.card)"
          />
        </template>
      </CardPresentationHeader>
      <v-container class="pa-6">
        <CardPresentationAvatar
          image="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
        />
        <CardPresentationFooter :card="card" />
      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { CardDTO } from "~~/api/dtos/card.dto";
const props = defineProps<{
  card: CardDTO;
  mode: "view" | "edit" | "create";
}>();
const emit = defineEmits<{
  (e: "onEdit", card: CardDTO): void;
  (e: "onDelete", card: CardDTO): void;
}>();
</script>
