<template>
  <div class="maz-phone mt-5">
    <MazPhoneNumberInput
      v-model="phone"
      show-code-on-list
      color="black"
      @update="data = $event"
      :success="data?.isValid"
    />
  </div>
</template>

<script setup lang="ts">
import MazPhoneNumberInput, {
  Result,
} from "maz-ui/components/MazPhoneNumberInput";
const emit = defineEmits(["update:modelValue"]);

const data = ref<Result>();
const phone = ref("");

watch(
  () => phone.value,
  (newValue) => {
    emit("update:modelValue", newValue);
  }
);
</script>

<style lang="scss">
@use "maz-ui/css/main.css";
</style>
