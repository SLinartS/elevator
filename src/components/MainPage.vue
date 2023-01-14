<template>
  <main class="main">
    <div class="shaft">
      <div
        :class="['elevator', { 'elevator-wait': elevatorWait }]"
        :style="elevatorStyle"
      ></div>
      <StageElem v-for="stage in stages" :key="stage" />
    </div>
    <div class="buttons">
      <ButtonElem
        v-for="stage in stages"
        :key="stage"
        :stage="stage"
        :action="addStageToQueue"
      />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useElevatorStore } from '@/stores/elevator';
import { storeToRefs } from 'pinia';
import ButtonElem from './ButtonElem.vue';
import StageElem from './StageElem.vue';
import { watch, ref, computed } from 'vue';
import deepCopy from '../utils/deepCopy/deepCopy';

const store = useElevatorStore();
const { stageQueue } = storeToRefs(store);
const { addStageToQueue, deleteStageFromQueue } = store;

const stages = ref([1, 2, 3, 4]);

let elevatorStyle = ref('');
let elevatorWait = ref(false);
let lastTop = ref(0);

function move(): void {
  elevatorWait.value = false;
  elevatorStyle.value = `top: ${lastTop.value}px`;
  if (Math.ceil(lastTop.value) === nextTop.value) {
    lastTop.value = nextTop.value;
    deleteStageFromQueue();
    if (stageQueue.value.length !== 0) {
      elevatorWait.value = true;
      setTimeout(move, 1000);
      return;
    }
  }
  if (lastTop.value < nextTop.value) {
    lastTop.value += 1;
  } else {
    lastTop.value -= 1;
  }
  if (stageQueue.value.length === 0) {
    return;
  }
  setTimeout(move, 1);
}

const nextTop = computed(() => {
  const value = stages.value[stageQueue.value[0] - 1];
  return (value - 1) * 150 + value - 1;
});

const watchedStageQueue = computed(() => {
  return deepCopy(stageQueue.value);
});

watch(
  watchedStageQueue,
  (newValue, oldValue) => {
    if (oldValue.length === 0) {
      move();
    }
  },
  { deep: true }
);
</script>

<style lang="scss">
$width: 100px;
$height: 150px;

.main {
  display: grid;
  grid-template-columns: $width $width;
  gap: 1px;
  background: #1a1a1a;
}

.shaft,
.buttons {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, $height);
  background: #1a1a1a;
  gap: 1px;
}

.shaft {
  position: relative;

  &__stage {
    box-sizing: border-box;
    background-color: bisque;
  }
}

.elevator {
  position: absolute;
  width: $width;
  height: $height;
  top: 0px;
  left: 0px;
  z-index: 1;
  background-color: brown;

  &-wait {
    animation: elevatorwait 200ms linear 0s infinite normal forwards;
  }
}

@keyframes elevatorwait {
  0% {
    background-color: yellow;
  }
  50% {
    background-color: violet;
  }
  100% {
    background-color: brown;
  }
}
</style>
