<template>
  <div class="pt-16 pb-5">
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

  <AnimatedAlert :show="view.alert()" v-model="view.showAlert.value">
    <template #default>
      {{ view.getError() }}
    </template>
  </AnimatedAlert>

  <v-form ref="form" @submit.prevent="submit" autocomplete="off">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="7" md="6" lg="5" xl="4">
          <v-card
            class="elevation-0"
            :loading="view.isLoading() ? 'red' : undefined"
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
import { ViewState } from "~~/utils/view-state";

const emit = defineEmits<{
  (e: "submit", screen: ViewState): void;
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
const view = new ViewState();
const form = ref<HTMLFormElement | null>(null);

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
  emit("submit", view);
};
</script>

<style scoped></style>
