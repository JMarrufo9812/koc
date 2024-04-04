import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {

  const loading = ref(false);

  const handleLoading = (value) => {
    loading.value = value;
  }

  return {
    loading,
    handleLoading
  }

})