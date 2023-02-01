<template>
  <div>
    <RootHeader
      title="Login"
      subtitle=" Welcome back! Enter your credentials to log in."
    />
    <!-------------Start Animation Alert---------->
    <AnimatedAlert
      :show="controller.viewState.showAlert"
      v-model="controller.viewState.showAlert"
    >
      <template #default>
        {{ controller.viewState.errorMessage }}
      </template>
    </AnimatedAlert>
    <!-------------End Animation Alert---------->

    <!-----------------Start Content------------>
    <v-form ref="loginForm" @submit.prevent="onSubmit" autocomplete="off">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="7" md="6" lg="5" xl="4">
            <v-card
              class="elevation-0"
              :loading="controller.viewState.loading ? 'red' : undefined"
            >
              <v-card-text>
                <TextField
                  v-model="controller.email"
                  hint="Enter your email to grant you access."
                  label="Email"
                  clearable
                  :rules="controller.emailRules"
                  required
                  autocomplete="off"
                />
                <TextField
                  v-model="controller.password"
                  label="Password"
                  hint="Enter your password to grant you access."
                  withEye
                  :rules="controller.passwordRules"
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
    <DefaultSnackbar v-model="signup.snackbar" @close="signup.snackbar = false">
      <p>Your account was successfully created!</p>
    </DefaultSnackbar>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from "~/stores/login_store";
import { useSignupStore } from "~~/stores/signup_store";
const controller = useLoginStore();
const signup = useSignupStore();

const loginForm = ref<HTMLFormElement | null>(null);
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
  await controller.signIn();
};
</script>

<style></style>
