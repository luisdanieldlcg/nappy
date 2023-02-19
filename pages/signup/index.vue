<template>
  <div>
    <RootHeader title="Signup" subtitle="Create an account to get started!" />

    <!-------------Start Animation Alert---------->
    <AnimatedAlert :show="showAlert" v-model="showAlert">
      <template #default>
        {{ errorMessage }}
      </template>
    </AnimatedAlert>
    <!-------------End Animation Alert---------->
    <v-form ref="signupForm" @submit.prevent="onSubmit" autocomplete="off">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="7" md="6" lg="5" xl="4">
            <v-card class="elevation-0" :loading="loading ? 'red' : undefined">
              <v-card-text>
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

                <v-btn
                  color="dark"
                  elevation="0"
                  variant="flat"
                  width="100%"
                  type="submit"
                  class="mt-5"
                >
                  submit</v-btn
                >
                <p class="text-center mt-8">
                  Already have an account?
                  <span class="text-dark font-weight-bold highlight-link">
                    <nuxt-link to="/login"> Login instead. </nuxt-link>
                  </span>
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth.store";

/**
 * SignupView state
 */
const loading = ref(false);
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const checkbox = ref(false);
const errorMessage = ref("");
const showAlert = ref(false);
const signupForm = ref<HTMLFormElement | null>(null);
const authStore = useAuthStore();

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
const onSubmit = async () => {
  // Fast Return if for some reason the html element is not attached
  if (!signupForm.value) {
    return;
  }
  const { valid } = await signupForm.value.validate();
  // Return if this is not a valid form
  if (!valid) {
    return;
  }
  const result = await authStore.signUp({
    email: email.value,
    password: password.value,
    passwordConfirm: passwordConfirm.value,
  });
  
  result.match({
    Err(error) {
      console.log(error);
    },
    Ok(e) {
      console.log({ e });
    },
  });
};
</script>

<style scoped>
.checkbox-highlight {
  color: #e60000;
}
</style>
