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
      <p style="font-size: 13px; font-weight: bold" class="text-center ma-2">
        Social Links
      </p>
      <CardEditorLinkList :fields="socialLinks" @field-click="onFieldClick" />
      <p style="font-size: 13px; font-weight: bold" class="text-center ma-2">
        Communication Links
      </p>
      <CardEditorLinkList
        class="mb-6"
        :fields="communicationLinks"
        @field-click="onFieldClick"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { CardLink, socialLinks } from "~~/api/dtos/card.dto";
import { communicationLinks } from "~~/api/dtos/card.dto";

const editor = useCardEditorStore();
const { card } = storeToRefs(editor);
const linkEditor = useLinkEditorStore();

const onFieldClick = (field: CardLink) => {
  linkEditor.setCreateMode(field);
};
</script>
