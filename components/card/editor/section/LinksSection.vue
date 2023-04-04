<template>
  <div>
    <CardEditorLinkForm
      :data="selectedField"
      v-if="selectedField !== undefined"
      :icon="selectedField"
      @exit="selectedField = undefined"
    />
    <CardLinkButtonList
      v-else
      v-for="entry in allFields"
      :title="entry.name"
      :fields="entry.fields"
      @field-click="onFieldClick"
    />
    <CardEditorReorderableLinks />
  </div>
</template>

<script setup lang="ts">
import { LinkType } from "~~/api/dtos/card.dto";
import { LinkData } from "../LinkForm.vue";
const selectedField = ref<LinkData | undefined>(undefined);
const onFieldClick = (field: LinkData) => {
  selectedField.value = field;
};

const socialFields: LinkData[] = [
  {
    label: "Facebook",
    icon: "mdi-facebook",
    type: LinkType.Facebook,
  },
  {
    label: "Twitter",
    icon: "mdi-twitter",
    type: LinkType.Twitter,
  },
  {
    label: "Instagram",
    icon: "mdi-instagram",
    type: LinkType.Instagram,
  },
  {
    label: "LinkedIn",
    icon: "mdi-linkedin",
    type: LinkType.LinkedIn,
  },
  {
    label: "YouTube",
    icon: "mdi-youtube",
    type: LinkType.YouTube,
  },
];
const communicationFields: LinkData[] = [
  {
    label: "Email",
    icon: "mdi-email",
    type: LinkType.Email,
  },
];
const allFields = [
  {
    name: "Social",
    fields: socialFields,
  },
  {
    name: "Communication",
    fields: communicationFields,
  },
];
</script>
