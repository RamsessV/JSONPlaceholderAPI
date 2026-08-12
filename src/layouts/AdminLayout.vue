<template>
  <div class="dashboard">
    <aside class="sidebar">
      <div class="brand">
        <span>Admin Panel</span>
      </div>

      <div class="sidebar__decoration">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <p class="sidebar__text">Gestiona la información de tu aplicación desde un solo lugar.</p>
    </aside>

    <div class="content">
      <header class="header">
        <h1>Dashboard</h1>

        <MainButton class="red" title="Cerrar sesión" type="button" @on-click="handleLogOut" />
      </header>

      <main class="main">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logoutAction } from '@/actions/logout.action';
import MainButton from '@/components/MainButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogOut = () => {
  logoutAction();
  router.replace('/auth');
};
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  display: flex;
  background-color: #f5f5f5;
}

.sidebar {
  width: 230px;
  padding: 2rem;
  color: white;
  background-color: #1f2937;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: bold;
}

.sidebar__decoration {
  display: flex;
  gap: 0.5rem;
  margin-top: 5rem;
}

.sidebar__decoration span {
  width: 10px;
  height: 10px;
  background-color: #6366f1;
  border-radius: 50%;
}

.sidebar__text {
  margin-top: 1rem;
  color: #9ca3af;
  font-size: 0.9rem;
  line-height: 1.5;
}

.content {
  flex: 1;
}

.header {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: white;
  border-bottom: 1px solid #ddd;
}

.header h1 {
  margin: 0;
  color: #333;
  font-size: 1.4rem;
}

.header button {
  padding: 0.5rem 1rem;
  color: white;
  background-color: #ef4444;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.main {
  padding: 2rem;
}
</style>
