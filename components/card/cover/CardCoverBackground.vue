<template>
  <v-img style="cursor: pointer; position: relative">
    <v-hover>
      <template #="{ isHovering, props }">
        <v-img
          v-bind="props"
          :src="image"
          :lazy-src="image"
          width="100%"
          cover
          @error="showBanner = true"
        >
          <v-overlay
            :model-value="isHovering"
            contained
            scrim="black"
            class="align-center justify-center"
          >
            <v-avatar
              size="32"
              style="position: absolute; left: 115px; bottom: 38px"
              color="rgba(0,0,0,.5)"
            >
              <Icon name="solar:pen-bold" size="18" color="white" />
            </v-avatar>
          </v-overlay>
          <v-card
            v-if="showBanner || !image"
            v-bind="$attrs"
            :color="fallbackColor"
            width="100%"
            style="top: -32px; left: -32px; border-radius: 0 !important"
            :elevation="0"
          >
          </v-card>
        </v-img>
      </template>
    </v-hover>
  </v-img>
</template>

<script setup lang="ts">
defineProps({
  image: {
    type: String,
    deafult: undefined,
  },
  fallbackColor: {
    type: String,
    default: undefined,
  },
});
const showBanner = ref(false);
</script>
