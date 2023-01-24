<template>
  <div>
    <v-navigation-drawer
      style="border: none"
      :rail="rail"
      permanent
      tz
      @click="rail = false"
    >
      <v-list-item
        nav
        prepend-avatar="https://apprecs.org/ios/images/app-icons/256/24/851990820.jpg"
      >
        <v-list-item-title
          class="text-center"
          style="font-size: 24px; padding: 20px"
        >
          Nap<span class="text-grey">py</span>
        </v-list-item-title>
        <template #append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <div class="spacer">
        <v-list :items="items" color="primary" density="comfortable" nav />
      </div>
    </v-navigation-drawer>
    <v-app-bar flat color="background">
      <v-app-bar-title> Dashboard </v-app-bar-title>
      <ThemeSwitcher />
      <v-list>
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
          title="Luis de la Cruz"
          subtitle="danikingrd@gmail.com"
        >
        </v-list-item>
      </v-list>
    </v-app-bar>
    <v-main>
      <v-container class="my-8 mx-10" fluid>
        <NuxtPage />
      </v-container>
    </v-main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const rail = ref(true);

const items = [
  {
    title: "Overview",
    props: {
      prependIcon: "mdi-view-dashboard-outline",
      to: "/app/overview",
    },
  },
  {
    title: "Cards",
    props: {
      prependIcon: "mdi-card-account-details",
      to: "/app/cards",
    },
  },
  {
    title: "Contacts",
    props: {
      prependIcon: "mdi-account-box",
      to: "/app/contacts",
    },
  },
];
</script>
