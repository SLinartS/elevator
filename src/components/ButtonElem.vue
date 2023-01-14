<template>
  <button class="button" @click="action(stage)">{{ stage }}</button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    stage: {
      type: Number,
      required: true,
    },
    action: { type: Function, required: true },
  },
});
</script>
<style lang="scss">
.button {
  border: none;
  transition: 0.2s all ease-in-out;

  &:hover {
    filter: brightness(0.8);
  }
  &:active {
    filter: brightness(0.5);
  }
}
</style>
