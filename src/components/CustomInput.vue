<template>
  <div>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
      @blur="$emit('blur')"
    />

  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  type: 'text' | 'number';
}

withDefaults(defineProps<Props>(), {
  type: 'text',
});

defineEmits<{
  'update:modelValue': [value: string];
  blur: [];
}>();
</script>

<style scoped>
input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  color: #374151;
  line-height: 1.25;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  box-shadow:
    0 1px 3px rgb(0 0 0 / 0.1),
    0 1px 2px rgb(0 0 0 / 0.06);
  appearance: none;
}

input:focus {
  outline: none;
}
</style>
