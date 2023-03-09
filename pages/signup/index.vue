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
        autocomplete="off"
        type="email"
        clearable
        required
      />
      <TextField
        v-model="password"
        label="Password"
        hint="Your password must be at least 8 characters long."
        autocomplete="new-password"
        type="password"
        required
        withEye
      />

      <TextField
        v-model="passwordConfirm"
        label="Password Confirm"
        hint="Confirm your password."
        autocomplete="new-password"
        type="passwordConfirm"
        :mustMatch="password"
        required
        withEye
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
