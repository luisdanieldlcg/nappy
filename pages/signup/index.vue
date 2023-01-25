<template>
  <div>
    <!---------------Start Header--------------->
    <div class="spacer">
      <v-container class="spacer">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="9" lg="4">
            <div class="text-center">
              <h2 class="ui-title font-weight-bold">Signup</h2>
              <p class="text-muted">Create an account to get started!</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!---------------End Header--------------->
    <!-----------------Start Content------------>

    <!-------------Start Animation Alert---------->
    <AnimatedAlert
      :show="signupController.viewState.showAlert"
      v-model="signupController.viewState.showAlert"
    >
      <template #default>
        {{ signupController.viewState.errorMessage }}
      </template>
    </AnimatedAlert>
    <!-------------End Animation Alert---------->
    <v-form ref="signupForm" @submit.prevent="onSubmit" autocomplete="off">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="7" md="6" lg="5" xl="4">
            <v-card
              class="elevation-0"
              :loading="signupController.viewState.loading ? 'red' : undefined"
            >
              <v-card-text>
                <TextField
                  v-model="signupController.form.email"
                  hint="Enter your email address."
                  label="Email"
                  clearable
                  :rules="signupController.emailRules"
                  required
                  autocomplete="off"
                />
                <TextField
                  v-model="signupController.form.password"
                  label="Password"
                  hint="Your password must be at least 8 characters long."
                  :rules="signupController.passwordRules"
                  required
                  withEye
                  autocomplete="new-password"
                />

                <TextField
                  v-model="signupController.form.passwordConfirm"
                  label="Password Confirm"
                  hint="Confirm your password."
                  required
                  withEye
                  :rules="signupController.passwordConfirmRules"
                  autocomplete="new-password"
                />

                <v-checkbox
                  v-model="signupController.form.checkbox"
                  class="custom-checkbox"
                  color="primary"
                  :rules="signupController.checkboxRules"
                >
                  <template #label>
                    <div>
                      I agree the
                      <v-tooltip location="bottom">
                        <template v-slot:activator="{ props }">
                          <nuxt-link
                            class="checkbox-highlight"
                            target="_blank"
                            href="https://vuetifyjs.com"
                            v-bind="props"
                            @click.stop
                          >
                            Terms of Service
                          </nuxt-link>
                        </template>
                        Opens the Terms of Service in a new window.
                      </v-tooltip>
                    </div>
                  </template>
                </v-checkbox>

                <v-btn
                  color="primary"
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
                  <span class="text-primary highlight-link">
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
const router = useRouter();
const signupController = useSignupStore();
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
  await signupController.signup(() => {
    router.push("/login");
  });
};
</script>

<style scoped>
.checkbox-highlight {
  color: #e60000;
}
</style>
