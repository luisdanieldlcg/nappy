<template>
  <div>
    <RootHeader title="Signup" subtitle="Create an account to get started!" />

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
    <v-form ref="signupForm" @submit.prevent="onSubmit" autocomplete="off">
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
                  hint="Enter your email address."
                  label="Email"
                  clearable
                  :rules="controller.emailRules"
                  required
                  autocomplete="off"
                />
                <TextField
                  v-model="controller.password"
                  label="Password"
                  hint="Your password must be at least 8 characters long."
                  :rules="controller.passwordRules"
                  required
                  withEye
                  autocomplete="new-password"
                />

                <TextField
                  v-model="controller.passwordConfirm"
                  label="Password Confirm"
                  hint="Confirm your password."
                  required
                  withEye
                  :rules="controller.passwordConfirmRules"
                  autocomplete="new-password"
                />

                <v-checkbox
                  v-model="controller.checkbox"
                  class="custom-checkbox"
                  color="primary"
                  label="I agree the Terms of Service"
                  :rules="controller.checkboxRules"
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
import { useSignupStore } from "~~/stores/signup_store";

const signupForm = ref<HTMLFormElement | null>(null);
const controller = useSignupStore();
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
  // router.push("/login");
  await controller.signUp();
};
</script>

<style scoped>
.checkbox-highlight {
  color: #e60000;
}
</style>
