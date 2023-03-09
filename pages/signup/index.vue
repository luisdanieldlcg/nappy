<template>
  <AuthForm
    title="Signup"
    subtitle="Create an account to get started!"
    @submit="trySignup"
  >
    <template #body>
      <TextField
        v-model="email"
        hint="Enter your email address."
        label="Email"
        clearable
        :rules="emailRules"
        required
        autocomplete="off"
      />
      <TextField
        v-model="password"
        label="Password"
        hint="Your password must be at least 8 characters long."
        :rules="passwordRules"
        required
        withEye
        autocomplete="new-password"
      />

      <TextField
        v-model="passwordConfirm"
        label="Password Confirm"
        hint="Confirm your password."
        required
        withEye
        :rules="passwordConfirmRules"
        autocomplete="new-password"
      />

      <v-checkbox
        v-model="checkbox"
        class="custom-checkbox"
        color="primary"
        label="I agree the Terms of Service"
        :rules="checkboxRules"
      >
        <template #label>
          <div>
            I agree the
            <span class="font-weight-bold">Terms of Service</span>
          </div>
        </template>
      </v-checkbox>
    </template>
    <template #redirect>
      Not a member yet?
      <span class="text-dark font-weight-bold highlight-link">
        <nuxt-link to="/login"> Login instead. </nuxt-link>
      </span>
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import { signUp } from "~~/api";
import { SignupDTO } from "~~/api/dtos/signup.dto";
import { ViewState } from "~~/utils/view-state";

/**
 * SignupView state
 */
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const checkbox = ref(false);
/**
 * TextField rules
 */
const checkboxRules = [
  (check: Boolean) =>
    !!check ||
    "You must agree the Terms of Service if you want to create an account.",
];
const emailRules = [
  (text: string) => !!text || "Email is required",
  (text: string) => /.+@.+/.test(text) || "Email must be valid",
];
const passwordRules = [
  (text: string) => !!text || "Password is required",
  (text: string) =>
    text.length >= 8 || "Your password must be at least 8 characters long.",
];

const passwordConfirmRules = [
  (text: string) => !!text || "Password Confirm is required",
  (text: string) => text === password.value || "Passwords do not match.",
];

/**
 * LoginView actions
 */
const trySignup = async (view: ViewState) => {
  const dto: SignupDTO = {
    email: email.value,
    password: password.value,
    passwordConfirm: passwordConfirm.value,
  };
  const result = await view.updateWith(() => signUp(dto));
  if (result.isJust) {
    navigateTo("/login");
  }
};
</script>

<style scoped>
.checkbox-highlight {
  color: #e60000;
}
</style>
