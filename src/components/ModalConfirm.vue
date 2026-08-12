<template>
  <div class="modal-overlay">
    <div class="modal">
      <p>{{ message }}</p>

      <div class="modal-buttons">
        <MainButton class="red" title="Aceptar" type="button" @on-click="$emit('accept')"/>
        <MainButton title="Cancelar" type="button" @on-click="$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainButton from './MainButton.vue';

interface Props {
  message: string;
}

defineProps<Props>();

defineEmits<{
  accept: [];
  close: [];
}>();
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgb(0 0 0 / 40%);
  z-index: 1000;
}

.modal {
  width: min(90%, 350px);
  padding: 1.5rem;

  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgb(0 0 0 / 20%);

  text-align: center;
}

.modal-buttons {
    display: flex;
    justify-content: space-around;
}



.modal p {
  margin: 0 0 1.5rem;
  color: #374151;
}



</style>
