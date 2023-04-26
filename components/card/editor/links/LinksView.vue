<template>
  <div>
    <template v-if="linkEditor.editing">
      <LinkEditor />
    </template>
    <template v-else>
      <template v-if="card.links.length > 0">
        <DashNote
          title="Drag each link to re-order it"
          centered
          icon="ri:drag-drop-line"
        ></DashNote>
        <ReorderableLinks :card="editor.card" :can-drag="true">
          <template #append="{ index, link }">
            <Icon
              name="solar:trash-bin-trash-bold-duotone"
              class="ml-5"
              @click="deleteLink(link)"
              style="cursor: pointer"
            />
            <Icon
              name="solar:pen-2-bold"
              class="ml-5"
              @click="editLink(link, index)"
              style="cursor: pointer"
            />
          </template>
        </ReorderableLinks>
      </template>

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
import { CardLink, LinkDTO } from "~~/api/dtos/card.dto";

const editor = useCardEditorStore();
const { card } = storeToRefs(editor);
const linkEditor = useLinkEditorStore();

const onFieldClick = (field: CardLink) => {
  linkEditor.setCreateMode(field);
};
const editLink = (link: LinkDTO, index: number) => {
  linkEditor.setEditingMode(link, index);
};

const deleteLink = (link: LinkDTO) => {
  editor.card.links = editor.card.links.filter((l) => l.title !== link.title);
};
</script>
