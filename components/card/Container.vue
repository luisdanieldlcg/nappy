<template>
  <v-card class="shadow">
    <slot name="header"></slot>
    <CardHeader
      v-if="$slots['header'] === undefined"
      :header="{
        coverImage,
        color: card.color,
      }"
      :avatar-size="avatarSize || 80"
      :height="imageHeight"
    />

    <div class="d-flex flex-column justify-center align-center">
      <!-- I need to make the card move down the elements even if its absolute -->
      <v-avatar color="white" :size="avatarSize" style="position: absolute">
        <slot name="avatar"></slot>

        <template v-if="$slots['avatar'] === undefined">
          <v-avatar v-if="avatarImage" :image="avatarImage" :size="84" />
          <v-icon
            v-else
            icon="mdi-account-circle"
            color="grey"
            :size="avatarSize"
          />
        </template>
      </v-avatar>
    </div>
    <v-card-text class="pl-4 pt-3">
      <div class="text-grey-subtitle text-center">
        <div class="mt-14">
          <v-chip> {{ card.label }} </v-chip>
        </div>
        <h1 class="mt-4 text-no-wrap">
          {{ card.firstName + " " + card.lastName }}
        </h1>
        <p class="text-h6 mt-2">{{ card.jobTitle }}</p>
        <p class="text-h6">{{ card.company }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  imageHeight: number;
  avatarSize?: number;
}>();

const { card } = storeToRefs(useCardEditorStore());
// I need to convert the card blob into a URL for the image
const coverImage = computed(() => {
  if (card.value.coverImage) {
    return URL.createObjectURL(card.value.coverImage);
  }
  return "";
});
const avatarImage = computed(() => {
  if (card.value.avatarImage) {
    return URL.createObjectURL(card.value.avatarImage);
  }
  return "";
});
</script>

<style lang="scss" scoped>
.shadow {
  overflow-x: hidden;
  box-shadow: 0 5px 15px 0 rgba(49, 49, 93, 0.13),
    0 15px 35px 0 rgba(49, 49, 93, 0.1);
}
</style>
