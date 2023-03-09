<template>
  <AuthForm
    title="Login"
    subtitle="Welcome back! Enter your credentials to log in."
    @submit="tryLogin"
  >
    <template #body>
      <TextField
        v-model="email"
        hint="Enter your email to grant you access."
        label="Email"
        clearable
        :rules="emailRules"
        required
        autocomplete="off"
      />
      <TextField
        v-model="password"
        label="Password"
        hint="Enter your password to grant you access."
        withEye
        :rules="passwordRules"
        required
        autocomplete="new-password"
      />
    </template>
    <!-- 
    <DefaultSnackbar v-model="signup.snackbar" @close="signup.snackbar = false">
      <p>Your account was successfully created!</p>
    </DefaultSnackbar> -->
  </AuthForm>
</template>

<script setup lang="ts">
import { logIn } from "~~/api";
import { LoginDTO } from "~~/api/dtos/login.dto";
import { ViewState } from "~~/utils/view-state";
/**
 * LoginView state
 */
const email = ref("admin@example.com");
const password = ref("12345678");

/**
 * TextField rules
 */
const emailRules = [
  (text: string) => !!text || "Email is required",
  (text: string) => /.+@.+/.test(text) || "This is not a valid email",
];
const passwordRules = [
  (text: string) => !!text || "Password is required",
  (text: string) => text.length >= 8 || "This is not a valid password",
];

/**
 * LoginView actions
 */
const tryLogin = async (view: ViewState) => {
  const dto: LoginDTO = {
    email: email.value,
    password: password.value,
  };
  const result = await view.updateWith<LoginDTO>(() => logIn(dto));
  if (result.isJust) {
    navigateTo("/app/cards");
  }
};
</script>

<style></style>
