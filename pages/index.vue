<template>
  <div>
    <!-- -----------------------------------------------
            Start Header
        ----------------------------------------------- -->
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
    <!-- -----------------------------------------------
            End Header
        ----------------------------------------------- -->
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="4">
          <v-card class="card-shadow">
            <v-card-text>
              <v-text-field
                density="compact"
                color="primary"
                label="Email"
                variant="outlined"
                clearable
                hint="Enter your email to get access."
              />
              <v-text-field
                density="compact"
                color="primary"
                rounded-lg
                label="Password"
                variant="outlined"
                hint="Enter your password to get access."
                :type="showText ? 'text' : 'password'"
                :append-inner-icon="showText ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showText = !showText"
              />
              <v-btn color="primary" elevation="0" variant="flat" width="100%">
                submit</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const showText = ref(false);
</script>

<style></style>
