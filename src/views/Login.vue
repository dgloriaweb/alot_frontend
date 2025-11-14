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
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const email = ref(authStore.email)
const loading = ref(false)
const message = ref('')

async function handleSubmit() {
  loading.value = true
  try {
    authStore.setEmail(email.value)
    // Simulate request to backend that sends code via email.
    await new Promise((resolve) => setTimeout(resolve, 800))
    message.value = 'We sent a login code to your email.'
    router.push('/login-code')
  } finally {
    loading.value = false
  }
}
</script>

