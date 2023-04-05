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
      <div class="mb-3 mt-2">
        <v-card
          class="elevation-0 pa-2"
          color="background"
          max-width="290"
          style="margin: 0 auto !important"
        >
          <p class="ml-6">
            Drag each link to re-order it
            <v-icon color="primary" class="mb-1 ml-2"
              >mdi-information-outline</v-icon
            >
          </p>
        </v-card>
      </div>
      <CardEditorDraggableLinks v-if="card.links" />

      <div class="mb-4 mt-4g">
        <v-card
          class="elevation-0 pa-2"
          color="background"
          max-width="350"
          style="margin: 0 auto !important"
        >
          <p class="ml-6">
            Click a field below to add a new link
            <v-icon color="primary" class="mb-1 ml-2"
              >mdi-information-outline</v-icon
            >
          </p>
        </v-card>
      </div>
      <CardEditorLinkList
        v-for="entry in allFields"
        :title="entry.name"
        :fields="entry.fields"
        @field-click="onFieldClick"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { LinkType } from "~~/api/dtos/card.dto";
import { LinkData } from "./CardEditorLinkForm.vue";
const { card } = storeToRefs(useCardEditorStore());
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
