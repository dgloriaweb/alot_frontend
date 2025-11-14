<template>
  <section class="card">
    <h1>Request login code</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="you@example.com"
        />
      </div>
      <button class="btn btn-primary" type="submit" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send code' }}
      </button>
    </form>
    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { requestLoginCode } from '../services/api'

const router = useRouter()
const authStore = useAuthStore()
const email = ref(authStore.email)
const loading = ref(false)
const message = ref('')
const error = ref('')

async function handleSubmit() {
  loading.value = true
  error.value = ''
  message.value = ''
  try {
    authStore.setEmail(email.value)
    await requestLoginCode(email.value)
    message.value = 'We sent a login code to your email. Please check your inbox.'
    setTimeout(() => {
      router.push('/login-code')
    }, 1500)
  } catch (err) {
    if (err.response?.status === 429) {
      error.value = 'Please try again later. Too many requests.'
    } else if (err.response?.data?.message) {
      error.value = err.response.data.message
    } else {
      error.value = 'Unable to send code. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

