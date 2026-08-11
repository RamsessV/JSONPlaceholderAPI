<template>
  <form @submit.prevent="handleSubmit" class="login__form">
    <p>Bienvenido de nuevo</p>

    <div class="login__field">
      <label for="username">Usuario</label>
      <CustomInput v-model="user.name" type="text" :error="errors.name" />
    </div>

    <div class="login__field">
      <label for="password">Contraseña</label>
      <CustomInput v-model="user.password" type="text" :error="errors.password" />
    </div>

    <MainButton title="Ingresar" type="submit" />

    <ToastComponent v-if="showToast" v-bind="toast" />
  </form>
</template>

<script setup lang="ts">
import { loginAction } from '@/actions';
import CustomInput from '@/components/CustomInput.vue';
import MainButton from '@/components/MainButton.vue';
import ToastComponent from '@/components/ToastComponent.vue';
import { ref, reactive } from 'vue';

const user = reactive({
  name: '',
  password: '',
});

const errors = reactive({
  name: '',
  password: '',
});

const toast = reactive<{
  message: string;
  type: 'success' | 'error';
}>({
  message: '',
  type: 'success',
});

const showToast = ref(false);

const handleToast = (isOk: boolean) => {
  if (isOk) {
    toast.message = 'Inicio de sesión exitoso';
    toast.type = 'success';
  } else {
    toast.message = 'Usuario o contraseña incorrectos';
    toast.type = 'error';
  }

  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 2000);
};

const handleSubmit = () => {
  errors.name = '';
  errors.password = '';

  if (!user.name && !user.password) {
    errors.name = 'El nombre de usuario es obligatorio';
    errors.password = 'La contraseña es obligatoria';
    return;
  }

  if (!user.name) {
    errors.name = 'El nombre de usuario es obligatorio';
    return;
  }

  if (!user.password) {
    errors.password = 'La contraseña es obligatoria';
    return;
  }

  const ok = loginAction(user.name, user.password);
  handleToast(ok);
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
