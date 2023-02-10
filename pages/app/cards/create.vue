<template>
  <NuxtLayout name="dashboard">
    <v-container>
      <v-row>
        <v-col cols="4">
          <DashProfileCard :fullName="firstName" />
        </v-col>
        <v-col cols="5">
          <v-expansion-panels class="mt-7">
            <TextField
              label="Card Title"
              hint="Enter the title for this card"
              v-model="firstName"
            />

            <DashFieldExpansion title="Full Name">
              <TextField label="First Name" />
              <TextField label="LastName" />
            </DashFieldExpansion>

            <DashFieldExpansion title="More details">
              <TextField label="Job Title" />
              <TextField label="Company Name" />
            </DashFieldExpansion>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">

const firstName = ref("Luis de la Cruz");
</script>

<style scoped></style>
