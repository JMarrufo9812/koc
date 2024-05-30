import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {

  const loading = ref(false);

  const handleLoading = (value) => {
    loading.value = value;
  }
  

  const modalError = ref({
    show: false,
    message: ''
  })

  const handleModalError = ({ show, message }) => {
    modalError.value.show = show;
    modalError.value.show = message;
  }

  return {
    loading,
    handleLoading,
    modalError,
    handleModalError
  }

})