<template>
  <div>
    <template v-if="selectedField !== undefined">
      <component
        @save="selectedField = undefined"
        :is="selectedField.type === 'phone' ? phoneView : genericView"
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
const genericView = resolveComponent("GenericLinkBuilder");
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

const editLink = (link: LinkDTO) => {
  selectedField.value = link;
  mode.value = "edit";
};

const deleteLink = (link: LinkDTO) => {
  editor.card.links = editor.card.links.filter((l) => l.title !== link.title);
};
</script>
