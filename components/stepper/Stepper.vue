<template>
  <div class="wrapper-stepper">
    <div class="stepper">
      <div class="stepper-progress">
        <div
          class="stepper-progress-bar"
          :style="'width:' + stepperProgress"
        ></div>
      </div>

      <div
        v-for="(count, index) in steps.length"
        class="stepper-item"
        :class="{ current: step == index, success: step > index }"
        :key="index"
      >
        <div class="stepper-item-counter">
          <Icon name="ph:check-bold" class="icon-success" />
          <span class="number">
            {{ count }}
          </span>
        </div>
        <span class="stepper-item-title"> Step {{ count }} </span>
      </div>
    </div>
    <div v-for="entry in steps" :key="entry.title">
      <div v-if="entry.id == step" class="text-center my-10 py-16">
        <v-window>
          <v-window-item>
            <component :is="entry.component" />
          </v-window-item>
        </v-window>
      </div>
    </div>
    <v-btn @click="step--" :disabled="step == 0">Back</v-btn>
    <v-btn
      @click="step++"
      :disabled="step == 4"
      class="elevation-0"
      color="black"
      >Next</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import { ConcreteComponent } from "nuxt/dist/app/compat/capi";

interface Step {
  id: number;
  title: string;
  icon: string;
  component: ConcreteComponent | string;
}
const props = defineProps<{
  steps: Step[];
}>();
const step = ref(0);
const stepperProgress = computed(() => {
  const deltaX = props.steps.length - 1;
  return 100 * (step.value / deltaX) + "%";
});
const primaryColor = ref(Colors.black);
const secondaryColor = ref("#313131");
const disabledColor = ref("#d5dbde");
</script>

<style scoped lang="scss">
$transiton: all 500ms ease;

.wrapper-stepper {
  background-color: #fff;
  padding: 25px 80px;
  border-radius: 32px;
  box-shadow: rgba($color: #313131, $alpha: 0.09);
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 0;
  margin-bottom: 24px;

  &-progress {
    position: absolute;
    background-color: v-bind(disabledColor);
    height: 2px;
    z-index: -1;
    left: 0;
    right: 0;
    margin: 0 auto;

    &-bar {
      position: absolute;
      left: 0;
      height: 100%;
      width: 0%;
      background-color: v-bind(primaryColor);
      transition: $transiton;
    }
  }
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: v-bind(disabledColor);
  transition: $transiton;

  &-counter {
    height: 46px;
    width: 46px;
    display: grid;
    place-items: center;
    background-color: #fff;
    border-radius: 100%;
    border: 2px solid v-bind(disabledColor);

    .icon-success {
      position: absolute;
      opacity: 0;
      transform: scale(0);
      width: 24px;
      transition: $transiton;
    }

    .number {
      font-size: 22px;
      transition: $transiton;
    }
  }

  &-title {
    position: absolute;
    font-size: 14px;
    bottom: -24px;
  }
}

.stepper-item.success {
  .stepper-item-counter {
    border-color: v-bind(primaryColor);
    background-color: v-bind(secondaryColor);
    color: #fff;
    font-weight: 600;

    .icon-success {
      opacity: 1;
      transform: scale(1);
    }

    .number {
      opacity: 0;
      transform: scale(0);
    }
  }

  .stepper-item-title {
    color: v-bind(primaryColor);
  }
}

.stepper-item.current {
  .stepper-item-counter {
    border-color: v-bind(primaryColor);
    background-color: v-bind(primaryColor);
    color: #fff;
    font-weight: 600;
  }

  .stepper-item-title {
    color: #818181;
  }
}
</style>
