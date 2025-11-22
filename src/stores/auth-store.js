import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const user = ref(null)

  function setAuthenticated(value) {
    isAuthenticated.value = value
  }

  function setUser(userData) {
    user.value = userData
  }

  function logout() {
    isAuthenticated.value = false
    user.value = null
  }

  return {
    isAuthenticated,
    user,
    setAuthenticated,
    setUser,
    logout,
  }
})
