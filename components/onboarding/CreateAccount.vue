<template>
  <div> 
    <h1 class="text-center text-grey-subtitle">Signup</h1>
    <p class="text-muted text-center mt-3">Create an account to get started!</p>
    <v-form autocomplete="off">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="7" md="6">
            <TextField
              v-model="email"
              hint="Enter your email address."
              label="Email"
              autocomplete="off"
              type="email"
              clearable
              density="comfortable"
              required
            />
            <TextField
              v-model="password"
              label="Password"
              hint="Your password must be at least 8 characters long."
              autocomplete="new-password"
              type="password"
              required
              withEye
              density="comfortable"

            />

            <TextField
              v-model="passwordConfirm"
              label="Password Confirm"
              hint="Confirm your password."
              autocomplete="new-password"
              type="passwordConfirm"
              :mustMatch="password"
              required
              withEye
              density="comfortable"
            />
            <!-- <v-checkbox
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
            </v-checkbox> -->
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const checkbox = ref(false);
const checkboxRules = [
  (check: Boolean) =>
    !!check ||
    "You must agree the Terms of Service if you want to create an account.",
];
</script>

<style scoped></style>
