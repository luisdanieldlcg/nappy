<template>
  <div class="text-center">
    <h1 class="text-grey-subtitle">Create your first card</h1>
    <p class="text-muted">Unleash your creativity and design a stunning card</p>
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
        <BusinessCardLinks center-title />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { FieldType } from "~/pages/onboarding/index.vue";
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

const onboarding = useOnboardingStore();
const selectItem = (item: FieldType) => {
  onboarding.selectedCardField = item;
  onboarding.showCardFieldModal = true;
};
</script>

<style scoped></style>
