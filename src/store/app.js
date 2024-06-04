import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {

  const loading = ref(false);

  const handleLoading = (value) => {
    loading.value = value;
  }
  

  const modalError = ref({
    show: false,
    messages: ''
  })

  const handleModalError = ({ show, messages }) => {
    modalError.value.show = show;
    modalError.value.messages = messages;
  }

  return {
    loading,
    handleLoading,
    modalError,
    handleModalError
  }

})