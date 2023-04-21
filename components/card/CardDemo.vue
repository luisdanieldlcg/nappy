<template>
  <v-card class="pa-12 elevation-0">
    <v-row class="align-center">
      <v-col cols="6" class="ml-10">
        <h1 class="text-capitalize text-grey-subtitle">Digital Business cards</h1>
        <p class="mt-5 text-grey-subtitle" style="font-size: 15px;"> 
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
      <v-col cols="5">
        <img src="~/assets/images/card-demo.png" height="400" />
      </v-col>
      <v-divider thickness="2" class="mt-5"></v-divider>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
const router = useRouter();
const navigateToCardEditor = () => {
  router.push("/app/cards/create");
};
</script>

<style scoped></style>
