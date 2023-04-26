<template>
  <div>
    <h1 class="text-center text-grey-subtitle">Signup</h1>
    <p class="text-muted text-center mt-3">Create an account to get started!</p>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="7">
          <slot name="sub-header"></slot>
          <TextField
            v-model="accountForm.email"
            hint="Enter your email address."
            label="Email"
            autocomplete="off"
            type="email"
            clearable
            density="comfortable"
            required
          />
          <TextField
            v-model="accountForm.password"
            label="Password"
            hint="Your password must be at least 8 characters long."
            autocomplete="new-password"
            type="password"
            required
            withEye
            density="comfortable"
          />

          <TextField
            v-model="accountForm.passwordConfirm"
            label="Password Confirm"
            hint="Confirm your password."
            autocomplete="new-password"
            type="passwordConfirm"
            :mustMatch="accountForm.password"
            required
            withEye
            density="comfortable"
          />

          <v-checkbox
            v-model="accountForm.agreeToTerms"
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
defineProps(["update:modelValue"]);
const checkboxRules = [
  (check: Boolean) =>
    !!check ||
    "You must agree the Terms of Service if you want to create an account.",
];
const { accountForm } = storeToRefs(useOnboardingStore());
</script>

<style scoped></style>