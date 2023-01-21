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
        <v-col cols="12" lg="4">
          <v-alert
            type="error"
            border="start"
            variant="tonal"
            color="#cf6679"
            closable
            class="card-shadow"
          >
            Could not connect to Nappy servers.
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
    <!---------------End Header--------------->
    <!-----------------Start Content------------>
    <v-form ref="signupForm" @submit.prevent="onSubmit">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="7" md="6" lg="5" xl="4">
            <v-card class="card-shadow">
              <v-card-text>
                <TextField
                  hint="Enter your email to grant you access."
                  label="Email"
                  clearable
                  :rules="emailRules"
                  required
                />
                <TextField
                  label="Password"
                  hint="Enter your password to grant you access."
                  withEye
                  :rules="passwordRules"
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
const emailRules = [
  (text: string) => !!text || "Email is required",
  (text: string) => /.+@.+/.test(text) || "This is not a valid email",
];
const passwordRules = [
  (text: string) => !!text || "Password is required",
  (text: string) => text.length >= 8 || "This is not a valid password",
];
const signupForm = ref<HTMLFormElement | null>(null);
const onSubmit = () => {
  if (signupForm.value) {
    signupForm.value.validate();
  }
};
</script>

<style scoped></style>
