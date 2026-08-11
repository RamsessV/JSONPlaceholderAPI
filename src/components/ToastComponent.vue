<template>
  <div class="toast" :class="type">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
  type: 'success' | 'error';
}>();
</script>

<style scoped>
.toast {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 1rem 1.5rem;
  color: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px #00000025;
}

.toast.success {
  background-color: #22c55e;
}

.toast.error {
  background-color: #ef4444;
}

.toast p {
  margin: 0;
}
</style>
