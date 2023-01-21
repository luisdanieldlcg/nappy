<template>
  <div>
    <!---------------Start Header--------------->
    <div class="spacer">
      <v-container class="spacer">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="9" lg="4">
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
    <!---------------End Header--------------->
    <!-----------------Start Content------------>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="5" xl="5">
          <v-card class="card-shadow">
            <v-card-text>
              <TextField
                hint="Enter your email to get access."
                label="Email"
                clearable
              />
              <TextField
                label="Password"
                hint="Enter your password to get access."
                withEye
              />

              <v-btn color="primary" elevation="0" variant="flat" width="100%">
                submit</v-btn
              >
              <v-container>
                <p>
                  Not a member yet?
                  <span class="text-primary highlight-link">
                    <nuxt-link to="/signup"> Signup instead. </nuxt-link>
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
