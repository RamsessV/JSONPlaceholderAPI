<template>
  <form @submit.prevent="handleSubmit" class="login__form">
    <p>Bienvenido de nuevo</p>

    <div class="login__field">
      <label for="username">Usuario</label>
      <CustomInput v-model="user.name" type="text" />
    </div>

    <div class="login__field">
      <label for="password">Contraseña</label>
      <CustomInput v-model="user.password" type="password" />
    </div>

    <MainButton title="Ingresar" type="submit" />

    <ToastComponent v-if="visible" :message="message" :type="type" />
  </form>
</template>

<script setup lang="ts">
import { loginAction, sleepAction } from '@/actions';
import CustomInput from '@/components/CustomInput.vue';
import MainButton from '@/components/MainButton.vue';
import ToastComponent from '@/components/ToastComponent.vue';
import { useToast } from '@/composables/useToast';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const { message, visible, type, showToast } = useToast();

const user = reactive({
  name: '',
  password: '',
});

const handleSubmit = async () => {
  if (!user.name || !user.password) {
    showToast('Todos los campos son obligatorios', 'error');
    return;
  }

  const ok = loginAction(user.name, user.password);
  if (!ok) {
    showToast('Credenciales inválidas', 'error');
    return;
  }

  showToast('Inicio de sesión exitoso', 'success');
  await sleepAction(1.5);
  router.replace('/admin');
};
</script>

<style scoped>
.login__form {
  width: 400px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 12px #00000015;
}

.login__form > p {
  margin: 0 0 1rem;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.login__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.login__field label {
  color: #333;
  font-size: 0.9rem;
  font-weight: bold;
}
</style>
