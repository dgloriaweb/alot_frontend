<template>
  <header class="navbar">
    <div class="container nav-content">
      <router-link class="logo" to="/">{{ appName }}</router-link>
      
      <button class="hamburger" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-row" :class="{ 'mobile-open': mobileMenuOpen }">
        <nav>
          <router-link to="/" @click="mobileMenuOpen = false">Home</router-link>
          <router-link to="/browse" @click="mobileMenuOpen = false">Browse</router-link>
          <router-link v-if="authStore.isAuthenticated" to="/post-ad" @click="mobileMenuOpen = false">Post Ad</router-link>
          <router-link v-if="authStore.isAuthenticated" to="/my-ads" @click="mobileMenuOpen = false">My Ads</router-link>
          <router-link v-if="authStore.isAuthenticated" to="/dashboard" @click="mobileMenuOpen = false">Dashboard</router-link>
        </nav>
        <div class="auth-actions">
          <router-link v-if="!authStore.isAuthenticated" class="btn btn-primary" to="/login" @click="mobileMenuOpen = false">
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
    </div>
  </header>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const { appContext } = getCurrentInstance()
const appName = computed(() => appContext.config.globalProperties.$appName)
const mobileMenuOpen = ref(false)

function handleLogout() {
  authStore.logout()
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #ffffff 0%, #f7fffe 100%);
  border-bottom: 2px solid #d3f2ee;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(56, 212, 199, 0.08);
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
}

.logo {
  font-weight: 700;
  font-size: 20px;
  color: #173b3f;
  text-decoration: none;
  transition: color 0.3s;
  white-space: nowrap;
}

.logo:hover {
  color: #38d4c7;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #173b3f;
  transition: all 0.3s;
  border-radius: 3px;
}

.nav-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

nav {
  display: flex;
  gap: 15px;
  align-items: center;
}

nav a {
  text-decoration: none;
  color: #4a4a4a;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  transition: all 0.3s;
  font-size: 14px;
  white-space: nowrap;
}

nav a:hover {
  background: #f0fffc;
  color: #173b3f;
}

nav a.router-link-active {
  color: #38d4c7;
  background: #f0fffc;
}

.auth-actions {
  display: flex;
  gap: 10px;
}

.auth-actions .btn {
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 992px) {
  .hamburger {
    display: flex;
  }

  .nav-row {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 280px;
    background: #ffffff;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    align-items: flex-start;
    padding: 80px 30px 30px;
    gap: 10px;
    transition: right 0.3s ease;
    z-index: 1000;
  }

  .nav-row.mobile-open {
    right: 0;
  }

  nav {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 5px;
  }

  nav a {
    width: 100%;
    padding: 12px 15px;
    font-size: 16px;
  }

  .auth-actions {
    width: 100%;
    margin-top: 20px;
  }

  .auth-actions .btn {
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    text-align: center;
  }
}
</style>

