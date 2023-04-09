<template>
  <DashNote
    title="Drag each link to re-order it"
    centered
    icon="ri:drag-drop-line"
  ></DashNote>
  <v-list class="d-flex justify-center">
    <draggable v-model="editor.card.links" item-key="title">
      <template #item="{ element: link }">
        <v-list-item>
          <template #title>
            <v-list-item-title
              style="font-size: 15px"
              v-text="link.title"
              class="text-capitalize"
            />
          </template>
          <template #subtitle>
            <v-list-item-subtitle
              style="font-size: 13px"
              v-text="link.subtitle"
              class="text-capitalize"
            />
          </template>

          <template #prepend>
            <v-btn icon color="background" class="elevation-0 mr-4">
              <Icon :name="nativeLinksIconMap[link.type]" />
            </v-btn>
          </template>
          <template #append>
            <Icon
              name="solar:pen-2-bold"
              class="ml-5"
              @click="$emit('edit', link)"
              style="cursor: pointer"
            />
            <Icon
              name="solar:trash-bin-trash-bold-duotone"
              class="ml-5"
              @click="$emit('delete', link)"
              style="cursor: pointer"
            />
          </template>
        </v-list-item>
      </template>
    </draggable>
  </v-list>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { LinkDTO } from "~~/api/dtos/card.dto";

defineEmits<{
  (e: "edit", link: LinkDTO): void;
  (e: "delete", link: LinkDTO): void;
}>();
const editor = useCardEditorStore();
</script>

<style scoped></style>
