<template>
  <v-form ref="form" @submit.prevent="trySave">
    <v-divider thickness="4" color="black"></v-divider>
    <v-list-item :subtitle="optionalLabel">
      <template #title>
        <v-list-item-title v-text="title" class="text-capitalize" />
      </template>
      <template #subtitle>
        <v-list-item-subtitle v-text="optionalLabel" class="text-capitalize" />
      </template>
      <template #prepend>
        <v-btn elevation="0" icon color="background" class="mr-4">
          <Icon :name="nativeLinksIconMap[link.type]" />
        </v-btn>
      </template>
    </v-list-item>
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
        <!--Open link-->
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
      v-model="phone"
      v-bind="phoneInputOpts"
      class="mt-5"
      @country-changed="countrySelected"
      v-if="link.type === 'phone'"
    />
    <p class="font-italic text-grey-darken-3">{{ httpLink }}</p>

    <TextField
      v-model="optionalLabel"
      variant="underlined"
      label="Label (optional)"
      @input="onOptionalLabelChange"
      hint="This is optional, but it helps you remember what this link is for."
    />

    <p class="font-italic mt-4">Here are some suggestions for your label:</p>
    <div style="max-width: 400px">
      <v-row class="mt-1">
        <v-col v-for="suggestion in suggestionsMap[link.type]" cols="4">
          <v-btn
            max-width="130"
            min-width="100"
            class="elevation-0 text-capitalize"
            variant="outlined"
            rounded
            @click="setSuggestion(suggestion)"
          >
            <p>{{ suggestion }}</p>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <v-divider thickness="3" class="mt-4"></v-divider>
    <v-row class="mt-3 mb-3">
      <v-col cols="6">
        <v-btn
          class="elevation-0 mr-3 text-capitalize"
          @click="onCancel"
          variant="outlined"
          >Cancel</v-btn
        >
        <v-btn class="bg-black elevation-0 text-capitalize" type="submit"
          >Save</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { LinkListTile } from "~~/stores/card-editor.store";

const emit = defineEmits(["exit"]);
const props = defineProps<{
  link: LinkListTile;
  mode: "edit" | "create";
}>();
// Refer to:
// https://stackoverflow.com/questions/75056086/how-can-i-bind-saved-phone-number-to-vue-tel-input-for-the-purpose-of-editing
// for editing.
const phone = ref(undefined);
const countryCode = ref(undefined);

const countrySelected = (val: any) => {
  countryCode.value = val.dialCode;
};

const phoneInputOpts = {
  defaultCountry: "DO",
  validCharactersOnly: true,
  disabledFormatting: false,
};
const httpLink = computed(() => {
  if (props.link.type === "phone") {
    return `tel:${countryCode.value}${phone.value}`;
  }
  return httpLinkMap[props.link.type] + title.value.toLocaleLowerCase();
});
onMounted(() => {
  if (props.mode === "create") {
    editor.card.links.push({
      title: "",
      subtitle: "",
      type: props.link.type,
    });
  }
  if (props.mode === "edit") {
    title.value = props.link.title;
    optionalLabel.value = props.link.subtitle;
  }
});

const editor = useCardEditorStore();
const title = ref("");
const optionalLabel = ref("");

// Suggestions for the optional label
const suggestionsMap: { [key: string]: string[] } = {
  instagram: ["personal", "business", "entertainment", "news"],
  twitter: ["politics", "sports", "business", "personal"],
  tiktok: ["dance", "comedy", "education", "entertainment"],
  linkedin: ["professional", "networking", "recruiter"],
  facebook: ["personal", "family", "friends", "business"],
  email: ["personal", "work", "business", "newsletter"],
  phone: ["personal", "work", "business", "Emergency"],
  whatsapp: ["personal", "work", "group chat", "urgent"],
  discord: ["community", "gaming", "study group", "friends"],
  telegram: ["personal", "work", "group chat", "business"],
};

// Reference to the link that is currently being edited
const linkReference = computed(() => {
  return editor.card.links[editor.card.links.length - 1];
});

const onOptionalLabelChange = (value: string) => {
  linkReference.value.subtitle = optionalLabel.value;
};

const onTitleChange = (value: string) => {
  linkReference.value.title = title.value;
};

const setSuggestion = (suggestion: string) => {
  optionalLabel.value = suggestion;
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
const form = ref<HTMLFormElement | null>(null);
</script>

<style scoped></style>
