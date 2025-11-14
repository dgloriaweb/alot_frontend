<template>
  <section>
    <h1>Dashboard</h1>
    <article class="card" v-if="user">
      <div class="user-info">
        <p><strong>Name:</strong> {{ user.name || 'Not set' }}</p>
        <p><strong>Email:</strong> {{ user.email || 'Not set' }}</p>
        <p><strong>Account type:</strong> {{ user.saved ? 'Saved user' : 'Guest' }}</p>
      </div>
      <div class="dashboard-actions">
        <router-link to="/my-ads" class="btn btn-primary">View My Ads</router-link>
        <router-link to="/post-ad" class="btn btn-secondary">Create New Ad</router-link>
        <router-link to="/browse" class="btn btn-secondary">Browse Activities</router-link>
      </div>
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

<style scoped>
.user-info {
  margin-bottom: 20px;
}

.user-info p {
  margin-bottom: 8px;
  color: #555;
}

.dashboard-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.dashboard-actions .btn {
  text-decoration: none;
  display: inline-block;
}
</style>

