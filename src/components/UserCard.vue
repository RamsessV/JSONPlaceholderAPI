<template>
  <article class="user-card">
    <div class="user-card__avatar">
      {{ name.charAt(0).toUpperCase() }}
    </div>

    <div class="user-card__info">
      <h2>{{ name }}</h2>
      <p>{{ email }}</p>
      <span>{{ company }}</span>
    </div>
  </article>
</template>
<script setup lang="ts">
import type { User } from '@/types';


defineProps<User>();

</script>


<style scoped>
.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}

.user-card__avatar {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  color: white;
  background-color: #4f46e5;
  border-radius: 50%;
  font-weight: bold;
}

.user-card__info {
  min-width: 0;
}

.user-card__info h2 {
  margin: 0 0 0.25rem;
  color: #333;
  font-size: 1rem;
}

.user-card__info p {
  margin: 0 0 0.4rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.user-card__info span {
  color: #4f46e5;
  font-size: 0.8rem;
  font-weight: 600;
}

</style>