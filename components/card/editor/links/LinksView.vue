<template>
  <div>
    <template v-if="selectedField !== undefined">
      <CardEditorLinkForm
        :mode="mode"
        :link="selectedField"
        :icon="selectedField"
        @exit="selectedField = undefined"
      />
    </template>
    <template v-else>
      <CardEditorDraggableLinks
        v-if="card.links.length > 0"
        @edit="editLink"
        @delete="deleteLink"
      />
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
        :fields="communicationLinks"
        @field-click="onFieldClick"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { CardLink, socialLinks } from "~~/api/dtos/card.dto";
import { communicationLinks } from "~~/api/dtos/card.dto";
import { LinkListTile } from "~~/stores/card-editor.store";

const { card } = storeToRefs(useCardEditorStore());
const editor = useCardEditorStore();
const mode = ref<"edit" | "create">("create");

const selectedField = ref<LinkListTile | undefined>();

const onFieldClick = (field: CardLink) => {
  selectedField.value = {
    title: "",
    subtitle: "",
    type: field,
  };
  mode.value = "create";
};

const editLink = (link: LinkListTile) => {
  selectedField.value = link;
  mode.value = "edit";
};

const deleteLink = (link: LinkListTile) => {
  editor.card.links = editor.card.links.filter((l) => l.title !== link.title);
};
</script>
