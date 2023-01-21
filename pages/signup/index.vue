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
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="5" xl="5">
          <v-card class="card-shadow">
            <v-card-text>
              <TextField
                hint="Enter your email address."
                label="Email"
                clearable
              />
              <TextField
                label="Password"
                hint="Your password must be at least 8 characters long."
                withEye
              />
              <TextField
                label="Password Confirm"
                hint="Confirm your password."
                withEye
              />
              <v-btn color="primary" elevation="0" variant="flat" width="100%">
                submit</v-btn
              >
              <v-container>
                <p>
                  Already have an account?
                  <span class="text-primary highlight-link">
                    <nuxt-link to="/login"> Login instead. </nuxt-link>
                  </span>
                </p>
              </v-container>

              <nuxt-link to="/"> </nuxt-link>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-----------------End Content------------>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const showText = ref(false);
</script>

<style></style>
