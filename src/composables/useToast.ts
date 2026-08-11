import { ref } from 'vue';

export const useToast = () => {
  const visible = ref(false);
  const message = ref('');
  const type = ref<'success' | 'error'>('error');

  function showToast(newMessage: string, toastType: 'success' | 'error', duration: number = 1.5) {
    message.value = newMessage;
    visible.value = true;
    type.value = toastType;

    setTimeout(() => {
      message.value = '';
      visible.value = false;
    }, duration * 1000);
  }

  return {
    visible,
    message,
    type,
    showToast,
  };
};
