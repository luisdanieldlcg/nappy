<template>
  <v-dialog
    :model-value="props.modelValue"
    max-width="600"
    @update:model-value="updateVisibility"
  >
    <v-card class="pa-2">
      <v-card-title class="text-grey-subtitle">
        <v-row class="pa-5">
          <!-- <p>{{ fields[selected].title }}</p> -->
          <v-spacer> </v-spacer>
          <Icon
            name="mdi-close"
            color="black"
            style="cursor: pointer"
            @click="onCancel"
          />
        </v-row>
      </v-card-title>
      <v-card-subtitle>
        <v-divider thickness="2"></v-divider>
      </v-card-subtitle>
      <v-card-text>
        {{ cardClone.firstName }}

        <template
          v-for="(field, key, index) in selectedField!.fields"
          :key="index"
        >
          <v-text-field :label="field.label" v-model="field.value">
          </v-text-field>
        </template>
      </v-card-text>
      <v-card-actions class="px-5">
        <v-spacer></v-spacer>
        <v-btn @click="onCancel" variant="outlined">Cancel</v-btn>
        <v-btn
          @click="onSave"
          color="black"
          variant="elevated"
          class="elevation-0 px-5"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { FieldType } from "~/pages/onboarding/index.vue";
import { Card } from "~/stores/card-editor.store";

type DialogField = {
  title: string;
  fields: any[];
};
const props = defineProps({
  selected: {
    type: String as PropType<FieldType>,
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const onboarding = useOnboardingStore();

const cardClone = reactive<Card>({
  ...onboarding.card,
  firstName: "x",
});

const textFieldTypes = ["name", "job", "company"];

const selectedField = computed(() => {
  return fields.value.find((field) => field.type === props.selected);
});
const isTextField = computed(() => {
  return textFieldTypes.includes(props.selected);
});

const updateVisibility = (val: boolean) => {
  emit("update:modelValue", val);
};

const fields = ref([
  {
    type: "name",
    title: "Enter your name",
    fields: [
      {
        label: "FirstName",
        value: cardClone.firstName,
      },
      {
        label: "Last Name",
        value: cardClone.lastName,
      },
    ],
  },
]);
// name: {
//   title: "Enter your name",
//   fields: [
//     {
//       label: "FirstName",
//       value: cardClone.firstName,
//     },
//     {
//       label: "Last Name",
//       value: cardClone.lastName,
//     },
//   ],
// },
// job: {
//   title: "Enter your job title",
//   props: [
//     {
//       label: "Job Title",
//     },
//   ],
// },
// company: {
//   title: "Enter your company",
//   component: resolveComponent("TextField"),
//   count: 1,
//   props: [
//     {
//       label: "Company Name",
//     },
//   ],
//   vmodels: [],
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
}>();
const onCancel = () => {
  emit("update:modelValue", false);
};

const onSave = () => {
  console.log("save");
};
</script>

<style scoped></style>
