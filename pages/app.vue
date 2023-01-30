<template>
  <div>
    <v-navigation-drawer :rail="rail" permanent style="border: none" :order="1">
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
    <v-app-bar :elevation="0">
      <v-app-bar-nav-icon @click="rail = !rail" />
      <v-list-item
        nav
        prepend-avatar="https://apprecs.org/ios/images/app-icons/256/24/851990820.jpg"
      >
        <v-list-item-title style="font-size: 24px; padding: 20px">
          Nap<span class="text-grey">py</span>
        </v-list-item-title>
        <template #prepend> </template>
      </v-list-item>
      <div class="mt-5 mr-7">
        <ThemeSwitcher />
      </div>
    </v-app-bar>

    <v-row justify="center">
      <v-col>
        <v-main>
          <v-container>
            <NuxtPage class></NuxtPage>
          </v-container>
        </v-main>
      </v-col>
    </v-row>
    <v-navigation-drawer location="right" rail style="border: none">
    </v-navigation-drawer>
  </div>
  <!-- <div>
    <v-navigation-drawer :rail="rail" permanent color="surface">
      <div class="spacer">
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
      </div>
    </v-navigation-drawer>
    <v-app-bar flat color="surface">
      <v-list-item
        nav
        prepend-avatar="https://apprecs.org/ios/images/app-icons/256/24/851990820.jpg"
      >
        <v-list-item-title style="font-size: 24px; padding: 20px">
          Nap<span class="text-grey">py</span>
        </v-list-item-title>
        <template #prepend> </template>
      </v-list-item>
      <v-app-bar-nav-icon @click="rail = !rail" />
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
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>

    <DefaultSnackbar v-model="snackbar" @close="snackbar = false">
      Welcome back!
    </DefaultSnackbar>
  </div> -->
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth_store";
definePageMeta({
  middleware: "auth",
});
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
