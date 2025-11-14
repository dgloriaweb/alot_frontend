<template>
  <section class="card">
    <h1>Enter login code</h1>
    <form @submit.prevent="handleVerify">
      <div class="form-group">
        <label for="code">One-time code</label>
        <input
          id="code"
          v-model="code"
          type="text"
          pattern="\\d{6}"
          maxlength="6"
          required
          placeholder="123456"
        />
      </div>
      <button class="btn btn-primary" type="submit" :disabled="loading">
        {{ loading ? 'Verifying...' : 'Verify code' }}
      </button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const code = ref(authStore.loginCode)
const loading = ref(false)
const error = ref('')

async function handleVerify() {
  loading.value = true
  error.value = ''
  try {
    authStore.setLoginCode(code.value)
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock saved user data
    authStore.login({
      id: 1,
      name: 'Demo User',
      saved: true,
      email: authStore.email
    })

    router.push('/dashboard')
  } catch (err) {
    error.value = 'Could not verify code. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

