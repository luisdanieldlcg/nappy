<template>
  <v-img
    v-bind="$attrs"
    color="background"
    cover
    class="align-end"
    :lazy-src="image"
    :src="image"
  >
    <template #placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
  </v-img>
  <div class="d-flex flex-column justify-center align-center">
    <v-avatar color="white" :size="avatarSize + 8" style="position: absolute">
      <v-avatar
        image="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
        :size="avatarSize"
      />
    </v-avatar>
  </div>
</template>

<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: false,
  },
  avatarSize: {
    type: Number,
    required: false,
    default: 70,
  },
});

</script>
