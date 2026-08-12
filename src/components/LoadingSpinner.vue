<template>
  <div class="spinner"></div>
</template>

<style scoped>
.spinner {
  margin: 0 auto;
  width: 30px;
  height: 30px;
  border: 4px solid #ddd;
  border-top-color: #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>