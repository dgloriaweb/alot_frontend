<template>
  <header class="navbar">
    <div class="container nav-content">
      <router-link class="logo" to="/">{{ appName }}</router-link>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/browse">Browse</router-link>
        <router-link v-if="authStore.isAuthenticated" to="/post-ad">Post Ad</router-link>
        <router-link v-if="authStore.isAuthenticated" to="/dashboard">Dashboard</router-link>
      </nav>
      <div class="auth-actions">
        <router-link v-if="!authStore.isAuthenticated" class="btn btn-primary" to="/login">
          Login
        </router-link>
        <button
          v-else
          class="btn btn-secondary"
          type="button"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const { appContext } = getCurrentInstance()
const appName = computed(() => appContext.config.globalProperties.$appName)

function handleLogout() {
  authStore.logout()
}
</script>

<style scoped>
.navbar {
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 20px;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
}

.logo {
  font-weight: 700;
  font-size: 20px;
  color: #2c3e50;
  text-decoration: none;
}

nav {
  display: flex;
  gap: 15px;
}

nav a {
  text-decoration: none;
  color: #4a4a4a;
  font-weight: 500;
}

nav a.router-link-active {
  color: #4a90e2;
}

.auth-actions {
  display: flex;
  gap: 10px;
}
</style>

