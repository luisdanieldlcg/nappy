<template>
  <AuthForm
    title="Login"
    subtitle="Welcome back! Enter your credentials to log in."
    @submit="tryLogin"
  >
    <template #body>
      <TextField
        flat
        :rules="emailRules"
        variant="filled"
        type="email"
        v-model="email"
        hint="Enter your email to grant you access."
        label="Enter your email"
        clearable
        required
      />
      <div class="mt-6"></div>
      <TextField
        flat
        :rules="passwordRules"
        variant="filled"
        v-model="password"
        label="Enter your password"
        hint="Enter your password to grant you access."
        withEye
        required
      />
    </template>
    <template #redirect>
      Not a member yet?
      <span class="text-dark font-weight-bold highlight-link">
        <nuxt-link to="/signup" class="text-black text-font-bold">
          Signup instead.
        </nuxt-link>
      </span>
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import { Result } from "true-myth";
import { emailRules, passwordRules } from "~/config/input-rules";
import { ILoginDTO } from "~~/api/dtos/login.dto";
import { AuthModule } from "~~/api/modules/auth.module";

const email = ref("admin@example.com");
const password = ref("12345678");

const tryLogin = async (
  auth: AuthModule,
  cb: (res: Result<unknown, string>) => void
) => {
  const dto: ILoginDTO = {
    email: email.value,
    password: password.value,
  };

  const result = await auth.login(dto);
  cb(result);
  if (result.isOk) {
    navigateTo("/app/cards");
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
