<template>
  <DashNote title="Drag each link to re-order it" centered></DashNote>
  <v-list class="d-flex justify-center">
    <draggable v-model="editor.card.links" item-key="title">
      <template #item="{ element: link }">
        <v-list-item :title="link.title" :subtitle="link.subtitle">
          <template #prepend>
            <v-btn
              :icon="`mdi-${link.type.toLowerCase()}`"
              class="elevation-0 mr-4"
              color="background"
            />
          </template>
        </v-list-item>
      </template>
    </draggable>
  </v-list>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";

const editor = useCardEditorStore();
</script>

<style scoped></style>
