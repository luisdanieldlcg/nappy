<template>
  <div class="pt-7 mt-12">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="10" md="9" lg="5">
          <div class="text-center">
            <h2 class="text-h4 font-weight-bold mb-6">{{ title }}</h2>
            <p class="text-muted">
              {{ subtitle }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <v-form ref="form" @submit.prevent="submit" autocomplete="off">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" lg="6" xl="4">
          <v-snackbar v-model="showSnackbar" color="black">
            {{ errorMessage }}
            <template v-slot:actions>
              <v-btn variant="text" @click="showSnackbar = false"> 
                <Icon name="carbon:close" />
              </v-btn>
            </template>
          </v-snackbar>
          <!-- <AnimatedAlert :show="showAlert" v-model="showAlert">
            <template #default>
              {{ errorMessage }}
            </template>
          </AnimatedAlert> -->

          <v-card
            class="elevation-0 px-6 py-3"
            :loading="loading ? 'black' : undefined"
            style="
              box-shadow: rgba(99, 99, 99, 0.07) 25px 15px 7px 0px !important;
            "
          >
            <v-card-text>
              <slot name="body"></slot>
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
                <slot name="redirect" />
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<!-- 
    <DefaultSnackbar v-model="signup.snackbar" @close="signup.snackbar = false">
      <p>Your account was successfully created!</p>
    </DefaultSnackbar> -->
<script setup lang="ts">
import { Result } from "true-myth";
import { AuthModule } from "~~/api/modules/auth.module";

const emit = defineEmits<{
  (
    e: "submit",
    auth: AuthModule,
    cb: (res: Result<unknown, string>) => void
  ): void;
}>();

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
const form = ref<HTMLFormElement | null>(null);
const errorMessage = ref("");
const loading = ref(false);
const showSnackbar = ref(false);

const submit = async () => {
  // Fast Return if for some reason the html element is not attached
  if (!form.value) {
    return;
  }
  const { valid } = await form.value.validate();
  // Return if this is not a valid form
  if (!valid) {
    return;
  }
  loading.value = true;
  const { $api } = useNuxtApp();
  const updateState = (res: Result<unknown, string>) => {
    if (res.isErr) {
      errorMessage.value = res.error;
      showSnackbar.value = true;
    }
    // We need to set loading to false here
    // because emit will not wait for the child event to finish
    // This is why this callback exists in the first place.
    loading.value = false;
  };

  emit("submit", $api.auth, updateState);
};
</script>
