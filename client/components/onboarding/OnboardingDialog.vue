<template>
  <v-dialog
    :model-value="props.modelValue"
    max-width="600"
    @update:model-value="updateVisibility"
  >
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
        <v-form ref="form" @submit.prevent="onSave">
          <template
            v-if="isPersonalDetails"
            v-for="field in fields[props.selected]!.fields"
          >
            <TextField :label="field.label" v-model="field.value" />
          </template>
          <template v-if="isLink">
            <TextField
              v-if="!canHandlePhone"
              type="not-empty"
              label="Title"
              v-model="activeLink.title"
            />
            <template v-else>
              <MazPhoneNumberInput
                v-model="activeLink.title"
                show-code-on-list
                color="black"
              />
            </template>
            <TextField
              v-model="activeLink.subtitle"
              label="Label"
              hint="This is optional, but it helps you remember what this link is for."
            >
            </TextField>
          </template>
        </v-form>
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
import { CardLink, allLinks, mobileLinks } from "~/api/dtos/card.dto";
import { FieldType } from "~/pages/onboarding/index.vue";
import { Card } from "~/stores/card-editor.store";
interface IDialogField {
  title: string;
  fields: [
    {
      label: string;
    }
  ] &
    any;
}
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
const initialValue = reactive<Card>({
  label: "Work",
  firstName: "Daniel",
  lastName: "dlc",
  jobTitle: "",
  company: "",
  color: Colors.greyLight,
  avatarImage: "",
  coverImage: "",
  links: [],
  useNativeIcons: false,
});
const title = computed(() => {
  if (isPersonalDetails.value) {
    return fields[props.selected].title;
  }
  if (isLink.value) {
    return "Add your " + props.selected;
  }
  return "";
});
const form = ref<HTMLFormElement | null>(null);

const links = computed(() => {
  return onboarding.card.links;
});
const canHandlePhone = computed(() => {
  return mobileLinks.includes(props.selected);
});
const activeLink = computed({
  get() {
    return links.value[links.value.length - 1];
  },
  set(value) {
    links.value[links.value.length - 1] = value;
  },
});
watch(
  // Set initial value whenever the dialog is opened
  () => props.modelValue,
  (modelVal, _) => {
    if (modelVal) {
      Object.assign(initialValue, JSON.parse(JSON.stringify(onboarding.card)));
      initLink();
    }
  }
);

const initLink = () => {
  if (!isLink.value) return;
  links.value.push({
    id: "",
    title: "",
    subtitle: "",
    type: props.selected as CardLink,
  });
};

const fields: { [key: string]: IDialogField } = reactive({
  name: {
    title: "Enter your name",
    fields: [
      {
        label: "First Name",
        value: computed({
          get() {
            return onboarding.card.firstName;
          },
          set(value) {
            onboarding.card.firstName = value;
          },
        }),
      },
      {
        label: "Last Name",
        value: computed({
          get() {
            return onboarding.card.lastName;
          },
          set(value) {
            onboarding.card.lastName = value;
          },
        }),
      },
    ],
  },
  job: {
    title: "Enter your job title",
    fields: [
      {
        label: "Job Title",
        value: computed({
          get() {
            return onboarding.card.jobTitle;
          },
          set(value) {
            onboarding.card.jobTitle = value;
          },
        }),
      },
    ],
  },
  company: {
    title: "Enter your company",
    fields: [
      {
        label: "Company Name",
        value: computed({
          get() {
            return onboarding.card.company;
          },
          set(value) {
            onboarding.card.company = value;
          },
        }),
      },
    ],
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
}>();

const updateVisibility = (val: boolean) => {
  emit("update:modelValue", val);
};

const onCancel = () => {
  Object.assign(onboarding.card, initialValue);
  updateVisibility(false);
};

const onSave = async () => {
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
const isPersonalDetails = computed(() => {
  return ["name", "job", "company"].includes(props.selected);
});
const isLink = computed(() => {
  return allLinks.includes(props.selected);
});
</script>
