<template>
  <v-text-field
    density="default"
    color="primary"
    variant="outlined"
    :type="showText ? 'text' : 'password'"
    :append-inner-icon="getInnerIcon"
    @click:append-inner="showText = !showText"
    :rules="applyRules()"
  />
</template>

<script setup lang="ts">
import { PropType } from "vue";

type TextFieldType =
  | "email"
  | "password"
  | "passwordConfirm"
  | "not-empty"
  | "none";

const props = defineProps({
  withEye: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<TextFieldType>,
    default: "default",
  },
  mustMatch: {
    type: String,
    required: false,
  },
});
// By default show text if there is no eye property
const showText = ref(!props.withEye);
const getInnerIcon = computed(() => {
  if (!props.withEye) {
    return undefined;
  }
  return showText.value ? "mdi-eye" : "mdi-eye-off";
});

const defaultRules = [(text: string) => !!text || "Please fill in the field."];
const emailRules = [
  (text: string) => !!text || "Email is required",
  (text: string) => /.+@.+/.test(text) || "This is not a valid email",
];

const passwordRules = [
  (text: string) => !!text || "Password is required",
  (text: string) =>
    text.length >= 8 || "Your password must be at least 8 characters long.",
];

const passwordConfirmRules = (password: string) => [
  (text: string) => !!text || "Password Confirm is required",
  (text: string) => text === password || "Passwords do not match.",
];

if (props.mustMatch === undefined && props.type === "passwordConfirm") {
  throw "Make sure to match the password confirmation against the original one using [mustMatch]";
}

const applyRules = () => {
  switch (props.type) {
    case "email":
      return emailRules;
    case "password":
      return passwordRules;
    case "passwordConfirm":
      return passwordConfirmRules(props.mustMatch!);
    case "not-empty":
      return defaultRules;
    default:
      return [];
  }
};
</script>
