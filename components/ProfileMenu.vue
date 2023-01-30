<template>
  <div>
    <v-container>
      <v-menu :close-on-content-click="false">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            size="small"
            variant="text"
            icon="mdi-menu-down"
          ></v-btn>
        </template>
        <v-card min-width="300" :elevation="2">
          <v-list>
            <v-list-item
              prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
              title="Luis de la Cruz"
              subtitle="danikingrd@gmail.com"
            >
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item title="Logout" to="/login" @click="signOut">
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn variant="text"> Cancel </v-btn>
            <v-btn color="primary" variant="text"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth_store";
const authController = useAuthStore();
const signOut = async () => {
  // await authController.signOut({
  //   onError(err) {},
  //   onSuccess(response) {
  //     location.reload();
  //   },
  // });
};
</script>

<style scoped></style>
