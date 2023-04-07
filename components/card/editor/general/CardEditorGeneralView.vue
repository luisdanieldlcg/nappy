<template>
  <DashNote title="Label this card" icon="solar:tag-bold-duotone" />
  <v-text-field
    class="centered-input"
    label="Card Title"
    hint="Enter the title for this card"
    v-model="card.label"
    density="comfortable"
    variant="underlined"
    style="text-align: center; max-width: 360px; margin: 0 auto"
  >
  </v-text-field>
  <DashNote title="Add your details" icon="solar:clipboard-bold-duotone" />
  <v-row class="mt-0" style="height: 90px">
    <v-col>
      <TextField
        class="rounded-field"
        label="First Name"
        density="compact"
        v-model="card.firstName"
      />
    </v-col>
    <v-col>
      <TextField label="Last Name" density="compact" v-model="card.lastName" />
    </v-col>
  </v-row>
  <v-row class="mt-0">
    <v-col>
      <TextField label="Job Title" density="compact" v-model="card.jobTitle" />
    </v-col>
    <v-col>
      <TextField
        label="Company Name"
        density="compact"
        v-model="card.company"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useCardEditorStore } from "~~/stores/card-editor.store";
const phone = ref("");
const { card } = storeToRefs(useCardEditorStore());
</script>
<style lang="scss">
.rounded-field {
  border-radius: 24px !important;
}
.centered-input input {
  text-align: center;
}

.v-text-field.centered-input .v-label {
  left: 42% !important;

  &.v-label--active {
    transform: translateY(-18px) scale(0.75) translateX(-50%);
    transform: translateY(-80%);
  }
}
</style>
