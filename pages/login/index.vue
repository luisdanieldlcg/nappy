<template>
  <div>
    <!---------------Start Header--------------->
    <div class="spacer">
      <v-container class="spacer">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="9" lg="5">
            <div class="text-center">
              <h2 class="ui-title font-weight-bold">Login</h2>
              <p class="text-muted">
                Welcome back! Enter your credentials to log in.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="5">
          <v-alert
            v-model="loginController.viewState.showAlert"
            type="error"
            border="start"
            variant="tonal"
            color="#cf6679"
            closable
            class="card-shadow"
          >
            {{ loginController.viewState.errorMessage }}
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
    <!---------------End Header--------------->
    <!-----------------Start Content------------>
    <v-form ref="loginForm" @submit.prevent="onSubmit">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="7" md="6" lg="5" xl="4">
            <v-card
              class="card-shadow"
              :loading="loginController.viewState.loading ? 'red' : undefined"
            >
              <v-card-text>
                <TextField
                  v-model="loginController.form.email"
                  hint="Enter your email to grant you access."
                  label="Email"
                  clearable
                  :rules="loginController.emailRules"
                  required
                />
                <TextField
                  v-model="loginController.form.password"
                  label="Password"
                  hint="Enter your password to grant you access."
                  withEye
                  :rules="loginController.passwordRules"
                  required
                />

                <v-btn
                  class="mt-5"
                  color="primary"
                  elevation="0"
                  variant="flat"
                  width="100%"
                  type="submit"
                >
                  submit</v-btn
                >
                <p class="text-center mt-8">
                  Not a member yet?
                  <span class="text-primary highlight-link">
                    <nuxt-link to="/signup"> Signup instead. </nuxt-link>
                  </span>
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-----------------End Content------------>
      </v-container>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from "~/stores/login_store";
const loginController = useLoginStore();
const loginForm = ref<HTMLFormElement | null>(null);
const onSubmit = async () => {
  // Fast Return if for some reason the html element is not attacheds
  if (!loginForm.value) {
    return;
  }
  const { valid } = await loginForm.value.validate();
  // Return if this is not a valid form
  if (!valid) {
    return;
  }
  await loginController.logIn();
};
</script>

<style scoped></style>
