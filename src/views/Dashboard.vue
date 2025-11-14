<template>
  <section>
    <h1>Dashboard</h1>
    <article class="card" v-if="user">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Saved user:</strong> {{ user.saved ? 'Yes' : 'No' }}</p>
    </article>
    <article class="card" v-else>
      <p>Please log in to view your dashboard.</p>
    </article>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
</script>

