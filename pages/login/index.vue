<template>
  <div>
    <RootHeader
      title="Login"
      subtitle=" Welcome back! Enter your credentials to log in."
    />
    <!-------------Start Animation Alert---------->
    <AnimatedAlert :show="showAlert" v-model="showAlert">
      <template #default>
        {{ errorMessage }}
      </template>
    </AnimatedAlert>
    <!-------------End Animation Alert---------->

    <!-----------------Start Content------------>
    <v-form ref="loginForm" @submit.prevent="onSubmit" autocomplete="off">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="7" md="6" lg="5" xl="4">
            <v-card class="elevation-0" :loading="loading ? 'red' : undefined">
              <v-card-text>
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

                <v-btn
                  class="mt-5"
                  color="dark"
                  elevation="0"
                  variant="flat"
                  width="100%"
                  type="submit"
                >
                  submit</v-btn
                >
                <p class="text-center mt-8">
                  Not a member yet?
                  <span class="text-dark font-weight-bold highlight-link">
                    <nuxt-link to="/signup" class="text-black text-font-bold">
                      Signup instead.
                    </nuxt-link>
                  </span>
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-----------------End Content------------>
      </v-container>
    </v-form>
    <!-- <DefaultSnackbar v-model="signup.snackbar" @close="signup.snackbar = false">
      <p>Your account was successfully created!</p>
    </DefaultSnackbar> -->
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/auth.store";

/**
 * LoginView state
 */
const loading = ref(false);
const email = ref("admin@example.com");
const password = ref("12345678");
const errorMessage = ref("");
const showAlert = ref(false);
const loginForm = ref<HTMLFormElement | null>(null);
const authStore = useAuthStore();

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
const onSubmit = async () => {
  // Fast Return if for some reason the html element is not attached
  if (!loginForm.value) {
    return;
  }
  const { valid } = await loginForm.value.validate();
  // Return if this is not a valid form
  if (!valid) {
    return;
  }
  const result = await authStore.logIn({
    email: email.value,
    password: password.value,
  });
  result.match({
    Ok(e) {
      errorMessage.value = "";
      showAlert.value = false;
      useRouter().replace("/app");
    },
    Err(e) {
      errorMessage.value = e;
      showAlert.value = true;
    },
  });
};
</script>

<style></style>
