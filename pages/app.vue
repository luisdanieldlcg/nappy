<template>
  <div>
    <v-navigation-drawer
      :rail="rail"
      permanent
      style="border: none"
      :order="1"
      color="background"
    >
      <v-list color="primary" density="comfortable" nav>
        <v-list-item
          class="rounded-lg"
          v-for="entry in items"
          :prepend-icon="entry.icon"
          :to="entry.targetRoute"
          @click="entry.click"
        >
          <template #title>
            {{ entry.title }}
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :elevation="0" color="background">
      <v-app-bar-nav-icon @click="rail = !rail" />
      <v-list-item
        nav
        prepend-avatar="https://apprecs.org/ios/images/app-icons/256/24/851990820.jpg"
      >
        <v-list-item-title style="font-size: 24px; padding: 8px">
          Nap<span class="text-grey">py</span>
        </v-list-item-title>
        <template #prepend> </template>
      </v-list-item>
      <v-spacer></v-spacer>
      <div class="mt-5 mr-7">
        <ThemeSwitcher />
      </div>
      <v-btn icon>
        <v-avatar color="#5f6368" size="small">
          <span class="text-white">L</span>
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-card class="bg-surface rounded-xl">
        <v-container>
          <NuxtPage></NuxtPage>
        </v-container>
      </v-card>
    </v-main>

    <v-navigation-drawer
      location="right"
      rail
      style="border: none"
      color="background"
    >
    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth_store";
definePageMeta({
  middleware: "auth",
});
const route = useRoute();
const rail = ref(false);
const snackbar = ref(true);
const items = [
  {
    title: "Overview",
    icon: "mdi-view-dashboard-outline",
    targetRoute: "/app/overview",
    props: {
      class: "rounded-lg",
    },
  },
  {
    title: "Cards",
    icon: "mdi-card-account-details",
    targetRoute: "/app/cards",
  },
  {
    title: "Contacts",
    icon: "mdi-account-group-outline",
    targetRoute: "/app/contacts",
  },
  {
    title: "Settings",
    icon: "mdi-cog-outline",
    targetRoute: "/app/settings",
  },
  {
    title: "Logout",
    icon: "mdi-logout",
    click: async () => {
      const authController = useAuthStore();
      // await authController.signOut({
      //   onError(err) {},
      //   onSuccess(response) {
      //     return navigateTo("/");
      //   },
      // });
    },
  },
];
</script>

<style></style>
