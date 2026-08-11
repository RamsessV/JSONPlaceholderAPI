<template>
  <button @click="$emit('onClick')">{{ title }}</button>
</template>

<script setup lang="ts">
interface props {
  title: string;
  type: 'button' | 'submit';
}

withDefaults(defineProps<props>(), {
  type: 'button',
});

defineEmits<{
  onClick: [];
}>();
</script>

<style scoped>
button {
  padding: 0.75rem;
  margin-top: 0.5rem;
  color: white;
  background-color: #4f46e5;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #4338ca;
}
</style>
