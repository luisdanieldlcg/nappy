<template>
  <div>
    <v-sheet color="background">
      <v-row align="center" justify="center" v-if="showTitle">
        <v-col :cols="showCustomCard ? 2 : 4" offset="3" class="pb-0">
          <p
            class="font-weight-bold text-grey-subtitle"
            style="font-size: 17px"
          >
            {{ title }}
          </p>
        </v-col>
        <v-col :cols="3" class="pb-0 pl-0">
          <Icon
            name="icon-park-outline:preview-open"
            color="#313131"
            @click="startLeaving"
            style="cursor: pointer"
          />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-scale-transition
          :key="PREVIEW_CARD_KEY"
          v-show="showPreviewCard"
          @after-leave="handleCardPreviewLeave"
        >
          <CardCropperPreview :card="card" v-if="onboard.editingImage" />
        </v-scale-transition>

        <v-scale-transition
          v-show="showCustomCard"
          :key="CUSTOM_CARD_KEY"
          @after-leave="handleCustomCardLeave"
        >
          <CardCover
            v-if="!onboard.editingImage"
            :can-drag="true"
            :card="card"
            mode="normal"
            @link-click="onLinkClicked"
            @avatar-clicked="onAvatarClicked"
            @background-clicked="onBackgroundClicked"
          />
        </v-scale-transition>

        <v-col cols="7" v-if="showCustomCard" class="ml-16">
          <ExtendedColorPicker v-model="card.color" />
        </v-col>
      </v-row>

      <v-scale-transition
        v-show="showDefaultCard"
        :key="CUSTOM_CARD_KEY"
        @after-leave="nextTransition(CUSTOM_CARD_KEY)"
      >
        <CardCover :card="defaultCard" mode="extended" :can-drag="false">
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
      </v-scale-transition>
    </v-sheet>
    <ImageDropDialog v-model="imageDrop" @picked="imagePicked" />
  </div>
</template>

<script setup lang="ts">
import { CardDTO, LinkDTO } from "~/api/dtos/card.dto";
// The goal is to have a smooth transition between the default card and the custom card
// The card that will appear first is the default card, then the custom card will appear
const showDefaultCard = ref(true);
const showCustomCard = ref(false);
const showPreviewCard = ref(false);

const DEFAULT_CARD_KEY = "default-card";
const CUSTOM_CARD_KEY = "custom-card";
const PREVIEW_CARD_KEY = "preview-card";

const onboard = useOnboardingStore();

const { card } = storeToRefs(onboard);
const title = computed(() => {
  return showDefaultCard.value ? "Demo preview" : "Live preview";
});

const showTitle = computed(() => {
  return onboard.step === 1 && !onboard.editingImage;
});
const imageDrop = ref(false);
const imageEditor = useImageEditor();

const handleCardPreviewLeave = () => {
  return nextTransition(CUSTOM_CARD_KEY);
};
const handleCustomCardLeave = () => {
  // Only show the default card if the user is not editing an image
  if (!onboard.editingImage) {
    return nextTransition(DEFAULT_CARD_KEY);
  } else {
    return nextTransition(PREVIEW_CARD_KEY);
  }
};

const onAvatarClicked = () => {
  imageDrop.value = true;
  imageEditor.imageSlot = ImageType.Avatar;
};
const onBackgroundClicked = () => {
  imageDrop.value = true;
  imageEditor.imageSlot = ImageType.Cover;
};

const imagePicked = (image: string) => {
  onboard.editingImage = true;
  imageEditor.onOpen(image);
};

const onLinkClicked = (item: LinkDTO, index: number) => {
  onboard.updateLinkModalReq({
    field: item.type,
    index,
    isEditing: true,
  });
};
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

// Now we need to swap the transitions, but only after one has finished,
// thus we use the after-leave event

const startLeaving = () => {
  // This function will be called in the button to trigger the transition
  // Now we need to know which card is currently showing to reset the transition.
  if (showDefaultCard.value) {
    showDefaultCard.value = false;
  }
  if (showCustomCard.value) {
    showCustomCard.value = false;
  }
  if (showPreviewCard.value) {
    showPreviewCard.value = false;
  }
};

const nextTransition = (key: string) => {
  if (key === DEFAULT_CARD_KEY) {
    showDefaultCard.value = true;
    showCustomCard.value = false;
    showPreviewCard.value = false;
  }
  if (key === CUSTOM_CARD_KEY) {
    showCustomCard.value = true;
    showDefaultCard.value = false;
    showPreviewCard.value = false;
  }
  if (key === PREVIEW_CARD_KEY) {
    showPreviewCard.value = true;
    showDefaultCard.value = false;
    showCustomCard.value = false;
  }
};

const stopHandle = watchEffect(() => {
  if (onboard.step === 1) {
    startLeaving();
    stopHandle();
  }
});
</script>

<style scoped lang="scss">
// Refer to https://github.com/vuetifyjs/vuetify/issues/6470
.scale-transition-enter-active,
.scale-transition-leave-active {
  transition-duration: 0.3s !important ;
}
</style>
