<template>
  <div class="text-center">
    <h1 class="text-grey-subtitle">Create your first card</h1>
    <p class="text-muted">Unleash your creativity and design a stunning card</p>
    <div v-if="onboarding.editingImage">
      <v-row justify="center">
        <v-col cols="7" class="mt-12 ml-10">
          <CardCropper @crop="cropImage" @cancel="closeCrop" />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <h3 class="text-grey-subtitle py-6">Add your personal details</h3>
      <v-row justify="center">
        <v-col cols="1" v-for="entry in personalDetailsFields">
          <CardLinkButton
            :label="entry.label"
            :icon="entry.icon"
            @click="selectItem(entry.type)"
          />
        </v-col>
      </v-row>
      <h3 class="text-grey-subtitle py-6">Add your links</h3>
      <v-row justify="center">
        <v-col cols="7">
          <BusinessCardLinks center-title @field-click="selectItem" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FieldType } from "~/pages/onboarding/index.vue";

const onboarding = useOnboardingStore();

const cropImage = (blob: Blob) => {
  closeCrop();
  const imageEditor = useImageEditor();

  switch (imageEditor.imageSlot) {
    case ImageType.Cover:
      onboarding.coverImageBlob = blob;
      onboarding.card.coverImage = URL.createObjectURL(blob);
      break;
    case ImageType.Avatar:
      onboarding.avatarImageBlob = blob;
      onboarding.card.avatarImage = URL.createObjectURL(blob);
      break;
  }
};
const closeCrop = () => {
  onboarding.editingImage = false;
};

interface Field {
  type: FieldType;
  label: string;
  icon: string;
}
const personalDetailsFields: Field[] = [
  {
    type: "name",
    label: "Name",
    icon: "mingcute:user-1-line",
  },
  {
    type: "job",
    label: "Job Title",
    icon: "tabler:briefcase",
  },
  {
    type: "company",
    label: "Company",
    icon: "solar:buildings-outline",
  },
];
const selectItem = (item: FieldType) => {
  onboarding.updateLinkModalReq({
    field: item,
    index: -1,
    isEditing: false,
  });
};
</script>
