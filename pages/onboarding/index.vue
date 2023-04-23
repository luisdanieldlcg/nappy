<template>
  <v-row style="overflow: auto; overflow-y: hidden" no-gutters>
    <v-col cols="5">
      <v-sheet
        color="background"
        height="100vh"
        class="d-flex justify-center align-center"
      >
        <CardCover :card="defaultCard" mode="extended">
          <template #header>
            <img src="~/assets/images/beautiful-garden.jpg" height="255" />
          </template>
          <template #avatar>
            <CardCoverAvatar :size="130" class="mb-4">
              <v-avatar size="120" class="card-shadow-light">
                <img
                  src="~/assets/images/business-man.png"
                  width="200"
                  height="170"
                  class="mt-8"
                />
              </v-avatar>
            </CardCoverAvatar>
          </template>
        </CardCover>
      </v-sheet>
    </v-col>
    <v-col cols="7">
      <v-sheet color="white" height="100vh">
        <v-form
          v-model="isFormValid"
          ref="form"
          validate-on="input"
          autocomplete="off"
          @submit.prevent
        >
          <Stepper :steps="steps">
            <!-- <component :is="view.component"> </component> -->
          </Stepper>
          <!-- <FormWizard :customTabs="tabs">
            <v-window v-model="onboarding.step">
              <v-window-item v-for="view in views">
                <component :is="view.component">
                  <template v-if="view.id === 0" #sub-header>
                    <AnimatedAlert
                      :show="o <v-window v-model="onboarding.step">
              <v-window-item v-for="view in views">
              </v-window-item>
            </v-window>nboarding.showAlert"
                      v-model="onboarding.showAlert"
                    >
                      <template #default>
                        {{ onboarding.errorMessage }}
                      </template>
                    </AnimatedAlert>
                  </template>
                </component>
              </v-window-item>
            </v-window>
            <template #next>
              <OnboardingControls
                v-model="onboarding.step"
                :valid="Boolean(isFormValid)"
              />
            </template>

          </FormWizard> -->
        </v-form>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { CardDTO } from "~/api/dtos/card.dto";
// import "form-wizard-vue3/dist/form-wizard-vue3.css";

const form = ref<HTMLFormElement | null>(null);
const isFormValid = ref(false);
const steps = [
  {
    id: 0,
    title: "Create an account",
    icon: "user",
    component: resolveComponent("CreateAccount"),
  },
  {
    id: 1,
    title: "Customize your card",
    icon: "pencil",
    component: resolveComponent("CustomizeCard"),
  },
  {
    id: 2,
    title: "Get started",
    icon: "pencil",
    component: resolveComponent("GetStarted"),
  },
];
const views = [
  {
    id: 0,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const onboarding = useOnboardingStore();

const tabs = [
  {
    id: 0,
    title: "Create an account",
    icon: "user",
  },
  {
    id: 1,
    title: "Customize your card",
    icon: "pencil",
  },
  {
    id: 2,
    title: "Get started",
  },
];

const defaultCard = reactive<CardDTO>({
  label: "Personal",
  firstName: "Mattew",
  lastName: "Carson",
  jobTitle: "Graphics Designer",
  company: "Matt Designs Inc",
  color: Colors.black,
  avatarImage: "",
  coverImage: "",
  links: [
    {
      type: "instagram",
      title: "@MattCarson",
      subtitle: "Personal",
      id: "",
    },
    {
      type: "phone",
      title: "+12015550124",
      subtitle: "Work",
      id: "",
    },
    {
      type: "email",
      title: "matt@designs.comn",
      subtitle: "Business",
      id: "",
    },
  ],
  useNativeIcons: false,
  id: "",
});
</script>

<style scoped lang="scss">
// Refer to https://github.com/bahadirsofuoglu/form-wizard-vue3/issues/22
::v-deep(.form-wizard-vue) {
  .fw-step-active {
    background: black !important;
    color: rgb(255, 255, 255) !important;
  }
  .fw-step-checked {
    border: 1px solid black !important;
  }
}
</style>
