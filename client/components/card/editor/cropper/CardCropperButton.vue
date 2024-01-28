<template>
  <v-tooltip :text="tooltip">
    <template #activator="{ props }">
      <div v-bind="props">
        <v-btn class="square-btn" size="42" v-bind="$attrs">
          <Icon  color="white" :name="icon" />
        </v-btn>
      </div>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    required: true,
  },
  tooltip: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.square-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  background-color: rgba(black, 0.4);
  top: 50%;
  left: 5px;
  transition: background 0.5s;
  &:hover {
    background: rgb(19, 19, 19);
  }
}
</style>
