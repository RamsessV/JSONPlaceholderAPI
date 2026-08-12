<template>
  <div class="pagination">
    <button
      :disabled="page === 1"
      @click="$emit('previousPage')"
      class="pagination__button"
    >
      <ArrowLeft />
      <span>Anteriores</span>
    </button>

    <button
      :disabled="lastPage"
      @click="$emit('nextPage')"
      class="pagination__button"
    >
      <span>Siguientes</span>
      <ArrowRight />
    </button>
  </div>
</template>

<script setup lang="ts">
import ArrowLeft from '@/assets/ArrowLeft.vue';
import ArrowRight from '@/assets/ArrowRight.vue';

interface Props {
  page: number;
  lastPage: boolean;
}

defineProps<Props>();

defineEmits<{
  nextPage: [];
  previousPage: [];
}>();

</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  padding: 2.5rem 0;
  background-color: #f3f4f6;
}

.pagination__button {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 1rem;
  color: white;
  background-color: #3b82f6;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.pagination__button:hover {
  background-color: #2563eb;
}

.pagination__button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}
</style>
