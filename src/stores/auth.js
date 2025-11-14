import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const email = ref('')
  const loginCode = ref('')

  const isAuthenticated = computed(() => user.value !== null)
  const isSavedUser = computed(() => user.value?.saved === true)

  function setEmail(emailValue) {
    email.value = emailValue
  }

  function setLoginCode(code) {
    loginCode.value = code
  }

  function login(userData) {
    user.value = userData
    if (typeof window !== 'undefined') {
      localStorage.setItem('alot_user', JSON.stringify(userData))
    }
  }

  function logout() {
    user.value = null
    email.value = ''
    loginCode.value = ''
    if (typeof window !== 'undefined') {
      localStorage.removeItem('alot_user')
    }
  }

  function loadUser() {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('alot_user')
    if (stored) {
      user.value = JSON.parse(stored)
    }
  }

  return {
    user,
    email,
    loginCode,
    isAuthenticated,
    isSavedUser,
    setEmail,
    setLoginCode,
    login,
    logout,
    loadUser
  }
})

