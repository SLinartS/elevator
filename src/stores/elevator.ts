import { ref, computed, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const useElevatorStore = defineStore('elevator', () => {
  const queue: Ref<number[]> = ref([]);

  const stageQueue = computed(() => queue.value);

  function addStageToQueue(stage: number): void {
    queue.value.push(stage);
  }

  function deleteStageFromQueue(): void {
    queue.value.shift();
  }

  return { stageQueue, addStageToQueue, deleteStageFromQueue };
});
