<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-avatar color="white" :size="size" style="position: absolute">
      <slot>
        <v-hover>
          <template #="{ isHovering, props }">
            <v-avatar :size="innerSize" v-bind="props" style="cursor: pointer">
              <v-overlay
                :model-value="isHovering"
                contained
                scrim="black"
                class="align-center justify-center"
              >
                <v-avatar size="32" color="rgba(0,0,0,.5)">
                  <Icon name="solar:pen-bold" size="18" color="white" />
                </v-avatar>
              </v-overlay>
              <v-img
                v-if="tryDisplayImage"
                cover
                style="object-fit: cover; border-radius: 50%"
                :src="image"
                @error="failedToLoad = true"
              />
              <Icon
                v-bind="$attrs"
                v-else
                name="solar:user-circle-bold"
                color="grey"
                :size="(innerSize + 10).toString()"
              />
            </v-avatar>
          </template>
        </v-hover>
      </slot>
    </v-avatar>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  size: {
    type: Number,
    default: 90,
  },
  image: {
    type: String,
    default: undefined,
  },
});
const tryDisplayImage = computed(() => {
  return (
    props.image != undefined && props.image.length > 0 && !failedToLoad.value
  );
});

const failedToLoad = ref(false);
const innerSize = computed(
  () => props.size + (tryDisplayImage.value ? -10 : 10)
);
</script>
