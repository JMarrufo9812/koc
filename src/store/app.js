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

  const showScannerIcon = ref(false)

  const handleShowScannerIcon = (value) => {
    showScannerIcon.value = value;
  }

  return {
    showScannerIcon,
    handleShowScannerIcon,
    loading,
    handleLoading,
    modalError,
    handleModalError
  }

})