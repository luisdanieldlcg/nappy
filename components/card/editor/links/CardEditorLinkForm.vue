<!-- <template>
  <v-form ref="form" @submit.prevent="trySave">
    <v-divider thickness="4" color="black"></v-divider>
    <LinkItem :link="linkReference" color="black" :use-native-icons="true" />
    <v-divider thickness="4" color="black"></v-divider>
    <TextField
      v-if="link.type !== 'phone'"
      v-model="title"
      variant="underlined"
      label="Username / URL"
      @input="onTitleChange"
      type="not-empty"
    >
      <template #details>
        <Icon name="ph:link-simple-bold" size="15" class="mr-2" />
        <nuxt-link
          :to="httpLink"
          target="_blank"
          class="font-italic text-grey-darken-3"
        >
          {{ httpLink }}
        </nuxt-link>
      </template>
    </TextField>

    <vue-tel-input
      v-model="title"
      v-bind="phoneInputOpts"
      class="mt-5"
      @input="onTitleChange"
      @country-changed="countrySelected"
      v-if="link.type === 'phone'"
    />
    <p
      class="font-italic text-grey-darken-3 ml-1 mt-1"
      style="font-size: 14px"
      v-if="link.type === 'phone'"
    >
      {{ httpLink }}
    </p>
    <v-switch
      v-if="link.type === 'phone'"
      v-model="internationalNumber"
      color="primary"
      label="Use International phone number"
      hide-details
    />
  </v-form>
</template> -->

<template></template>
<script setup lang="ts">
import { LinkDTO } from "~~/api/dtos/card.dto";

const props = defineProps<{
  link: LinkDTO;
  mode: "edit" | "create";
}>();
const emit = defineEmits(["exit"]);
const editor = useCardEditorStore();
const title = ref("");

// Refer to:
// https://stackoverflow.com/questions/75056086/how-can-i-bind-saved-phone-number-to-vue-tel-input-for-the-purpose-of-editing
// for editing.
const countryCode = ref(undefined);
const form = ref<HTMLFormElement | null>(null);
const internationalNumber = ref(true);
// Reference to the link that is currently being edited
const linkReference = ref({
  title: "",
  subtitle: "",
  type: props.link.type,
  id: "",
});

onMounted(() => {
  if (props.mode === "create") {
    editor.card.links.push(linkReference.value); // push empty link
  }
  if (props.mode === "edit") {
    title.value = props.link.title;
    // optionalLabel.value = props.link.subtitle;
  }
});

const countrySelected = (val: any) => {
  countryCode.value = val.dialCode;
  linkReference.value.title = formattedPhoneNumber.value;
};

const formattedPhoneNumber = computed(() => {
  return `+${countryCode.value} ${title.value}`;
});

const displayTitleText = computed(() => {
  return props.link.type === "phone" ? formattedPhoneNumber.value : title.value;
});

const phoneInputOpts = {
  defaultCountry: "DO",
  validCharactersOnly: true,
  disabledFormatting: false,
};
const httpLink = computed(() => {
  if (props.link.type === "phone") {
    return `tel: ${formattedPhoneNumber.value}`;
  }
  return httpLinkMap[props.link.type] + title.value.toLocaleLowerCase();
});

const onLabelChange = (value: string) => {
  // linkReference.value.subtitle = optionalLabel.value;
};

const onTitleChange = (value: string) => {
  if (props.link.type === "phone") {
    linkReference.value.title = formattedPhoneNumber.value;
  } else {
    linkReference.value.title = title.value;
  }
};

const setSuggestion = (suggestion: string) => {
  // optionalLabel.value = suggestion;
  linkReference.value.subtitle = suggestion;
};

const onSave = () => {
  emit("exit");
};

const trySave = async () => {
  if (!form.value) {
    return;
  }
  const { valid } = await form.value.validate();
  // Return if this is not a valid form
  if (!valid) {
    return;
  }
  onSave();
};
const onCancel = () => {
  if (props.mode === "create") {
    editor.card.links.pop();
  }
  emit("exit");
};
</script>
