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
import { Result } from "true-myth";
import { ISignupDTO } from "~~/api/dtos/signup.dto";
import { AuthModule } from "~~/api/modules/auth.module";

/**
 * SignupView state
 */
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const checkbox = ref(false);

const checkboxRules = [
  (check: Boolean) =>
    !!check ||
    "You must agree the Terms of Service if you want to create an account.",
];

/**
 * LoginView actions
 */
const trySignup = async (
  auth: AuthModule,
  cb: (res: Result<unknown, string>) => void
) => {
  const dto: ISignupDTO = {
    email: email.value,
    password: password.value,
    passwordConfirm: passwordConfirm.value,
  };
  const result = await auth.signup(dto);
  cb(result);
  if (result.isOk) {
    navigateTo("/login");
  }
};
</script>

<style scoped>
.checkbox-highlight {
  color: #e60000;
}
</style>
