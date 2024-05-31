import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {

  const loading = ref(false);

  const handleLoading = (value) => {
    loading.value = value;
  }
  

  const modalError = ref({
    show: false,
    msg: ''
  })

  const handleModalError = ({ show, message }) => {
    modalError.value.show = show;
    modalError.value.msg = message;
  }

  return {
    loading,
    handleLoading,
    modalError,
    handleModalError
  }

})