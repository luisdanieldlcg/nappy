<template>
  <v-img
    v-bind="$attrs"
    color="background"
    cover
    class="align-end"
    :src="
      image ||
      'https://images.unsplash.com/photo-1569817480240-41de5e7283c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cm9hZCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80'
    "
  >
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

const imageUrl = (path?: string): string => {
  return "http://localhost:3001/images/" + path;
};
</script>
