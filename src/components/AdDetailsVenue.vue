<template>
  <div class="ad-details" v-if="ad">
    <div class="detail-row" v-if="ad.available_days">
      <strong>Available days:</strong> {{ ad.available_days }}
    </div>
    <div class="detail-row" v-if="ad.available_duration">
      <strong>Duration available:</strong> {{ ad.available_duration }}
    </div>
    <div class="detail-row" v-if="ad.categories && ad.categories.length">
      <strong>Welcomes:</strong>
      <span class="category-list">
        <span v-for="(cat, idx) in ad.categories" :key="idx" class="category-tag">
          {{ cat }}
        </span>
      </span>
    </div>
    <div class="detail-row" v-if="ad.parking">
      <strong>Parking:</strong> {{ ad.parking }}
    </div>
    <div class="detail-row" v-if="ad.public_transport">
      <strong>Public Transport:</strong> {{ ad.public_transport }}
    </div>
    <div class="detail-row" v-if="ad.disabled_access">
      <strong>Disabled Access:</strong> {{ ad.disabled_access }}
    </div>
    <div class="detail-row" v-if="ad.toilets !== undefined">
      <strong>Toilets:</strong> {{ ad.toilets ? 'Yes' : 'No' }}
    </div>
    <div class="detail-row" v-if="ad.tools_furniture">
      <strong>Tools/Furniture:</strong> {{ ad.tools_furniture }}
    </div>
    <div class="detail-row" v-if="ad.video_link">
      <a :href="ad.video_link" target="_blank" rel="noopener" class="video-link">
        📹 Watch venue introduction
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  ad: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.ad-details {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.detail-row {
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: #555;
}

.detail-row strong {
  color: #333;
  margin-right: 5px;
}

.category-list {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-left: 5px;
}

.category-tag {
  background: #e3f2fd;
  color: #1565c0;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.video-link {
  color: #4a90e2;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.video-link:hover {
  text-decoration: underline;
}
</style>

