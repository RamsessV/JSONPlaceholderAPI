import { ref } from 'vue';

export const useToast = () => {
  const visible = ref(false);
  const message = ref('');
  const type = ref<'success' | 'error'>('error');

  function showToast(newMessage: string, toastType: 'success' | 'error') {
    message.value = newMessage;
    visible.value = true;
    type.value = toastType;

    setTimeout(() => {
      message.value = '';
      visible.value = false;
    }, 1500);
  }

  return {
    visible,
    message,
    type,
    showToast,
  };
};
