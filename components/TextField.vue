<template>
  <v-text-field
    density="default"
    color="primary"
    variant="outlined"
    :type="showText ? 'text' : 'password'"
    :append-inner-icon="getInnerIcon"
    @click:append-inner="showText = !showText"
    :rules="applyRules()"
  >
    <template #details>
      <slot name="details"></slot>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { defaultRules, emailRules, passwordConfirmRules, passwordRules } from "~/config/input-rules";

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
