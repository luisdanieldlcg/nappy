<template>
  <div>
    <template v-if="selectedField !== undefined">
      <CardEditorLinkForm
        :data="selectedField"
        :icon="selectedField"
        @exit="selectedField = undefined"
      />
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
        :fields="communicationLinks"
        @field-click="onFieldClick"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { allLinks, socialLinks } from "~~/api/dtos/card.dto";
import { LinkData } from "./CardEditorLinkForm.vue";
import { communicationLinks } from "~~/api/dtos/card.dto";
const { card } = storeToRefs(useCardEditorStore());
const selectedField = ref<LinkData | undefined>(undefined);
const onFieldClick = (field: LinkData) => {
  selectedField.value = field;
};

// const socialFields: LinkData[] = [
//   {
//     label: "Facebook",
//     icon: "mdi-facebook",
//     type: LinkType.Facebook,
//   },
//   {
//     label: "Twitter",
//     icon: "mdi-twitter",
//     type: LinkType.Twitter,
//   },
//   {
//     label: "Instagram",
//     icon: "mdi-instagram",
//     type: LinkType.Instagram,
//   },
//   {
//     label: "LinkedIn",
//     icon: "mdi-linkedin",
//     type: LinkType.LinkedIn,
//   },
//   {
//     label: "YouTube",
//     icon: "mdi-youtube",
//     type: LinkType.YouTube,
//   },
// ];
// const communicationFields: LinkData[] = [
//   {
//     label: "Email",
//     icon: "mdi-email",
//     type: LinkType.Email,
//   },
// ];
// const allFields = [
//   {
//     name: "Social",
//     fields: socialFields,
//   },
//   {
//     name: "Communication",
//     fields: communicationFields,
//   },
// ];
</script>
