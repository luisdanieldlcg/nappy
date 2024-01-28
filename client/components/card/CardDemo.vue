<template>
  <v-card class="pa-8 pt-12 elevation-0">
    <v-row class="align-center" :class="centerText" no-gutters>
      <v-col :cols="smallScreen ? 12 : 6" class="ml-1">
        <h1 class="text-capitalize text-grey-subtitle">
          Digital Business cards
        </h1>
        <p class="mt-5 text-grey-subtitle" style="font-size: 15px">
          Create a digital business card that you can share with anyone.
        </p>
        <v-btn
          class="text-uppercase elevation-0 mt-10"
          width="220"
          height="50"
          variant="tonal"
          @click="navigateToCardEditor"
        >
          <p>
            Create your card
            <Icon name="mdi-arrow-right" />
          </p>
        </v-btn>
      </v-col>
      <v-col cols="4" v-if="!smallScreen">
        <img src="~/assets/images/card-demo.png" height="320" />
      </v-col>
      <v-divider thickness="2" class="mt-5"></v-divider>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";

const { width } = useDisplay();
const smallScreen = computed(() => width.value < 1200);
const centerText = computed(() => {
  return {
    "text-center": smallScreen.value,
  };
});

const router = useRouter();
const navigateToCardEditor = () => {
  router.push("/app/cards/create");
};
</script>
