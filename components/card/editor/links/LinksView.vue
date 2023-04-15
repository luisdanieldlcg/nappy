<template>
  <div>
    <template v-if="selectedField !== undefined">
      <LinkBuilder
        @save="quitEditor"
        @cancel="quitEditor"
        :link="selectedField"
        :mode="mode"
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
        class="mb-6"
        :fields="communicationLinks"
        @field-click="onFieldClick"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { CardLink, LinkDTO, socialLinks } from "~~/api/dtos/card.dto";
import { communicationLinks } from "~~/api/dtos/card.dto";

const editor = useCardEditorStore();
const { card } = storeToRefs(editor);
const phoneView = resolveComponent("PhoneLinkBuilder");
const selectedField = ref<LinkDTO | undefined>();
const mode = ref<"edit" | "create">("create");

const onFieldClick = (field: CardLink) => {
  selectedField.value = {
    title: "",
    subtitle: "",
    type: field,
    id: "",
  };
  mode.value = "create";
};

const quitEditor = () => {
  selectedField.value = undefined;
};
const editLink = (link: LinkDTO) => {
  selectedField.value = link;
  mode.value = "edit";
};

const deleteLink = (link: LinkDTO) => {
  editor.card.links = editor.card.links.filter((l) => l.title !== link.title);
};
</script>
