<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-avatar color="white" :size="size" style="position: absolute">
      <slot>
        <v-avatar v-if="tryDisplayImage" :size="innerSize">
          <v-img
            cover
            style="object-fit: cover; border-radius: 50%"
            :src="image"
            @error="failedToLoad = true"
          />
        </v-avatar>
        <Icon
          name="solar:user-circle-bold"
          color="grey"
          :size="(innerSize + 10).toString()"
          v-else
        />
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
const onError = () => {
  console.log("er");
  failedToLoad.value = true;
};
const failedToLoad = ref(false);
const innerSize = computed(() => props.size - 10);
</script>
