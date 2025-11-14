<template>
  <section>
    <div class="page-header">
      <h1>My Ads</h1>
      <router-link to="/post-ad" class="btn btn-primary">+ Create New Ad</router-link>
    </div>

    <div v-if="loading" class="card">
      <p>Loading your ads...</p>
    </div>

    <div v-else-if="error" class="card">
      <p class="error">{{ error }}</p>
    </div>

    <div v-else-if="ads.length === 0" class="card empty-state">
      <p>You haven't created any ads yet.</p>
      <router-link to="/post-ad" class="btn btn-primary">Create your first ad</router-link>
    </div>

    <div v-else>
      <div class="ads-stats">
        <p>You have <strong>{{ ads.length }}</strong> {{ ads.length === 1 ? 'ad' : 'ads' }}</p>
        <div class="filter-tabs">
          <button
            v-for="type in adTypes"
            :key="type"
            :class="['filter-tab', { active: selectedType === type }]"
            @click="selectedType = type"
          >
            {{ type }} ({{ getAdsByType(type).length }})
          </button>
          <button
            :class="['filter-tab', { active: selectedType === 'all' }]"
            @click="selectedType = 'all'"
          >
            All ({{ ads.length }})
          </button>
        </div>
      </div>

      <div class="ads-list">
        <AdCard
          v-for="ad in filteredAds"
          :key="ad.id"
          :ad="ad"
          :show-actions="true"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { fetchMyAds } from '../services/api'
import AdCard from '../components/AdCard.vue'

const router = useRouter()
const authStore = useAuthStore()
const ads = ref([])
const loading = ref(true)
const error = ref('')
const selectedType = ref('all')

const adTypes = ['Organiser', 'Attendant', 'Venue', 'Tutor']

const filteredAds = computed(() => {
  if (selectedType.value === 'all') {
    return ads.value
  }
  return ads.value.filter(ad => {
    const adType = ad.type || ad.user_type || ''
    return adType.toLowerCase() === selectedType.value.toLowerCase()
  })
})

function getAdsByType(type) {
  return ads.value.filter(ad => {
    const adType = ad.type || ad.user_type || ''
    return adType.toLowerCase() === type.toLowerCase()
  })
}

async function loadAds() {
  loading.value = true
  error.value = ''
  try {
    const data = await fetchMyAds()
    ads.value = data
  } catch (err) {
    // For localhost:3000, don't redirect to login, just show error
    if (window.location.hostname === 'localhost' && window.location.port === '3000') {
      error.value = 'Unable to load your ads. Using mock data for localhost.'
      // Fallback to mock data
      const { mockMyAds } = await import('../data/mockMyAds')
      ads.value = mockMyAds
    } else if (err.response?.status === 401) {
      error.value = 'Please log in to view your ads.'
      router.push('/login')
    } else {
      error.value = 'Unable to load your ads. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

function handleEdit(ad) {
  router.push(`/post-ad?edit=${ad.id}&type=${ad.type || ad.user_type}`)
}

async function handleDelete(ad) {
  if (!confirm(`Are you sure you want to delete "${ad.title || 'this ad'}"?`)) {
    return
  }
  // TODO: Call delete API endpoint
  // await deleteAd(ad.id)
  // Then reload ads
  loadAds()
}

onMounted(() => {
  // Temporarily disabled auth check for testing
  // if (!authStore.isAuthenticated) {
  //   router.push('/login')
  //   return
  // }
  loadAds()
})
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.page-header h1 {
  margin: 0;
  font-size: 2rem;
  color: #2c3e50;
}

.ads-stats {
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.ads-stats p {
  margin: 0 0 15px 0;
  color: #555;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-tab {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.filter-tab:hover {
  border-color: #38d4c7;
  color: #38d4c7;
}

.filter-tab.active {
  background: #38d4c7;
  border-color: #38d4c7;
  color: white;
}

.ads-list {
  margin-top: 20px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-state p {
  margin-bottom: 20px;
  color: #666;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-header .btn {
    width: 100%;
  }
}
</style>

