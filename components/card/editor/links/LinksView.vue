<template>
  <div>
    <template v-if="linkEditor.editing">
      <LinkEditor />
    </template>
    <template v-else>
      <CardEditorDraggableLinks v-if="card.links.length > 0" />
      <DashNote
        title="Click a field below to add a new link"
        centered
        icon="solar:link-round-angle-bold-duotone"
      >
      </DashNote>
      <BusinessCardLinks @field-click="onFieldClick" center-title />
    </template>
  </div>
</template>

<script setup lang="ts">
import { CardLink } from "~~/api/dtos/card.dto";

const editor = useCardEditorStore();
const { card } = storeToRefs(editor);
const linkEditor = useLinkEditorStore();

const onFieldClick = (field: CardLink) => {
  linkEditor.setCreateMode(field);
};
</script>
