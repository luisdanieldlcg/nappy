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
    <v-form ref="signupForm" @submit.prevent="onSubmit">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="7" md="6" lg="5" xl="4">
            <v-card class="card-shadow">
              <v-card-text>
                <TextField
                  hint="Enter your email address."
                  label="Email"
                  clearable
                  :rules="emailRules"
                  required
                />
                <TextField
                  v-model="password"
                  label="Password"
                  hint="Your password must be at least 8 characters long."
                  :rules="passwordRules"
                  required
                  withEye
                />

                <TextField
                  label="Password Confirm"
                  hint="Confirm your password."
                  required
                  withEye
                  :rules="passwordConfirmRules"
                />

                <v-checkbox
                  v-model="checkbox"
                  class="custom-checkbox"
                  color="primary"
                  :rules="checkboxRules"
                >
                  <template v-slot:label>
                    <div>
                      I agree the
                      <client-only>
                        <v-tooltip location="bottom">
                          <template v-slot:activator="{ props }">
                            <a
                              target="_blank"
                              href="https://vuetifyjs.com"
                              v-bind="props"
                              @click.stop
                            >
                              <strong class="checkbox-highlight"
                                >Terms of Service</strong
                              >
                            </a>
                          </template>
                          Opens the Terms of Service in a new window.
                        </v-tooltip>
                      </client-only>
                    </div>
                  </template>
                </v-checkbox>

                <v-btn
                  color="primary"
                  elevation="0"
                  variant="flat"
                  width="100%"
                  type="submit"
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
const password = ref("");
const checkbox = ref(false);
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
    text.length > 8 || "Your password must be at least 8 characters long.",
];

const passwordConfirmRules = [
  (text: string) => !!text || "Password Confirm is required",
  (text: string) => text === password.value || "Passwords do not match.",
];
const signupForm = ref<HTMLFormElement | null>(null);
const onSubmit = () => {
  if (signupForm.value) {
    signupForm.value.validate();
  }
};
</script>

<style scoped>
.checkbox-highlight {
  color: #f82a2a;
  opacity: 1;
}
.v-input__details {
  margin-left: 20px !important;
  color: rebeccapurple;
}
</style>
