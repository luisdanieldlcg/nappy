<template>
  <v-row class="mb-1">
    <v-col cols="2">
      <v-tooltip text="Go back" location="bottom">
        <template #activator="{ props }">
          <div v-bind="props">
            <v-icon icon="mdi-arrow-left" />
          </div>
        </template>
      </v-tooltip>
    </v-col>
    <v-col cols="8">
      <h4 class="font-weight-medium text-grey-subtitle">Edit your Image</h4>
    </v-col>
    <v-col cols="2">
      <v-tooltip text="Save changes" location="bottom">
        <template #activator="{ props }">
          <div v-bind="props">
            <v-icon
              icon="mdi-check"
              @click="editor.selectedImageSlot[0] = SelectedImageType.None"
            />
          </div>
        </template>
      </v-tooltip>
    </v-col>
  </v-row>
  <v-divider></v-divider>
</template>

<script setup lang="ts">
import { useCardEditorStore } from "~~/stores/card-editor.store";
const editor = useCardEditorStore();
</script>

<style scoped></style>
