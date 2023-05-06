<template>
  <v-list class="d-flex justify-center">
    <draggable v-model="card.links" :item-key="keyHandler" v-bind="dragOptions">
      <template #item="{ element, index }">
        <LinkItem
          :style="
            canDrag && hover.value && hover.index === index
              ? {
                  'border-radius': 8 + 'px',
                  cursor: 'pointer',
                }
              : {}
          "
          :border="canDrag && hover.value && hover.index === index"
          :link="element"
          :color="card.color"
          :use-native-icons="card.useNativeIcons"
          @click="$emit('click', element, index as number)"
          @mouseover="updateHoverState(true, index)"
          @mouseleave="updateHoverState(false, index)"
          :ripple="false"
        >
          <template #append>
            <slot
              name="append"
              :index="(index as number)"
              :link="(element as LinkDTO)"
            ></slot>
          </template>
        </LinkItem>
      </template>
    </draggable>
  </v-list>
</template>

<script setup lang="ts">
import { LinkDTO } from "~/api/dtos/card.dto";
import draggable from "vuedraggable";
import { Card } from "~/stores/card-editor.store";

const props = defineProps<{
  card: Card;
  canDrag: boolean;
}>();
defineEmits<{
  (event: "click", item: LinkDTO, index: number): void;
}>();
const updateHoverState = (value: boolean, index: number) => {
  hover.value = {
    value,
    index,
  };
};

const keyHandler = (el: LinkDTO): string => {
  return el.type + ":" + el.title + ":" + el.subtitle;
};
const hover = ref({
  value: false,
  index: 0,
});
const dragOptions = ref({
  animation: 200,
  group: "description",
  // disabled by default
  disabled: !props.canDrag,
  // ghostClass: "ghost",
});
</script>

<style scoped>
/* .ghost {
  opacity: 0.5;
  background: #000000;
  border-radius: 12px;
} */
</style>
