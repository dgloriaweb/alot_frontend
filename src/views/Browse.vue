<template>
  <section>
    <h1>Browse opportunities</h1>
    <p class="lead">
      Discover public activities shared by organisers, venues, and instructors.
    </p>
    
    <div v-if="loading" class="card">
      <p>Loading opportunities...</p>
    </div>

    <div v-else-if="error" class="card">
      <p class="error">{{ error }}</p>
    </div>

    <div v-else-if="ads.length === 0" class="card">
      <p>No opportunities found.</p>
    </div>

    <div v-else class="ads-list">
      <AdCard
        v-for="ad in ads"
        :key="ad.id"
        :ad="ad"
        :show-actions="false"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { mockAds } from '../data/mockAds'
import { mockMyAds } from '../data/mockMyAds'
import AdCard from '../components/AdCard.vue'

const ads = ref([])
const loading = ref(true)
const error = ref('')

onMounted(() => {
  // For localhost:3000, use mock data
  if (window.location.hostname === 'localhost' && window.location.port === '3000') {
    // Combine and deduplicate ads
    const allAds = [...mockMyAds, ...mockAds].map(ad => ({
      ...ad,
      sortDate: ad.publishedAt 
        ? new Date(ad.publishedAt).getTime() 
        : (ad.created_at ? new Date(ad.created_at).getTime() : 0),
      uniqueKey: `${(ad.title || '').toLowerCase().trim()}_${(ad.location || ad.postcode || '').toLowerCase().trim()}`
    }))

    // Deduplicate: keep first occurrence (from mockMyAds)
    const seen = new Set()
    const deduplicatedAds = allAds.filter(ad => {
      if (seen.has(ad.uniqueKey)) {
        return false
      }
      seen.add(ad.uniqueKey)
      return true
    })

    // Filter for public ads only and sort by date
    ads.value = deduplicatedAds
      .filter(ad => ad.is_public !== false)
      .sort((a, b) => b.sortDate - a.sortDate)
    loading.value = false
  } else {
    // TODO: Fetch from API when backend is ready
    ads.value = []
    loading.value = false
  }
})
</script>

<style scoped>
.ads-list {
  margin-top: 20px;
}
</style>

