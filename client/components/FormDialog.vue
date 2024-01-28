<template>
  <v-dialog
    :model-value="modelValue"
    max-width="600"
    @update:model-value="updateVisibility"
    @keydown.esc="onSave"
    tabindex="0"
  >
    <v-form ref="form" @submit.prevent="onSave">
      <v-card class="pa-2">
        <v-card-title class="text-grey-subtitle">
          <v-row class="pa-5">
            <p>{{ title }}</p>
            <v-spacer> </v-spacer>
            <Icon
              name="mdi-close"
              color="black"
              style="cursor: pointer"
              @click="onSave"
            />
          </v-row>
        </v-card-title>
        <v-card-subtitle>
          <v-divider thickness="2"></v-divider>
        </v-card-subtitle>
        <v-card-text>
          <slot />
        </v-card-text>
        <v-card-actions class="px-5">
          <v-spacer></v-spacer>
          <v-btn @click="onCancel" variant="outlined">Cancel</v-btn>
          <v-btn
            type="submit"
            color="black"
            variant="elevated"
            class="elevation-0 px-5"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  modelValue: boolean;
  noValidate?: boolean;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "cancel"): void;
  (e: "visibility-update", value: boolean): void;
}>();

watch(
  () => props.modelValue,
  (newVal, _) => {
    emit("visibility-update", newVal);
  }
);

const form = ref<HTMLFormElement | null>(null);

const updateVisibility = (val: boolean) => {
  emit("update:modelValue", val);
};
const onSave = async () => {
  if (props.noValidate) {
    updateVisibility(false);
    return;
  }
  if (!form || !form.value) {
    return;
  }
  const { valid } = await form.value.validate();
  // Return if this is not a valid form
  if (!valid) {
    return;
  }
  updateVisibility(false);
};
const onCancel = () => {
  updateVisibility(false);
  emit("cancel");
};
</script>
