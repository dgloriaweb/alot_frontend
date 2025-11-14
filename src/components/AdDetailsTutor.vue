<template>
  <div class="ad-details" v-if="ad">
    <div class="detail-row" v-if="ad.category">
      <strong>Category:</strong> {{ ad.category }}
      <span v-if="ad.subcategory"> - {{ ad.subcategory }}</span>
    </div>
    <div class="detail-row" v-if="ad.indoor_outdoor">
      <strong>Location:</strong> {{ ad.indoor_outdoor }}
    </div>
    <div class="detail-row" v-if="ad.day_time">
      <strong>Schedule:</strong> {{ ad.day_time }}
    </div>
    <div class="detail-row" v-if="ad.duration">
      <strong>Duration:</strong> {{ ad.duration }}
      <span v-if="ad.flexible_finish"> ({{ ad.flexible_finish }})</span>
    </div>
    <div class="detail-row" v-if="ad.disability_access">
      <strong>Disability Access:</strong> {{ ad.disability_access }}
    </div>
    <div class="detail-row" v-if="ad.dog_friendly">
      <span class="tag">🐕 Dog Friendly</span>
    </div>
    <div class="detail-row" v-if="ad.has_certificate">
      <span class="cert-badge">✅ Certified Instructor</span>
    </div>
    <div class="detail-row" v-if="ad.video_link">
      <a :href="ad.video_link" target="_blank" rel="noopener" class="video-link">
        📹 Watch instructor introduction
      </a>
    </div>
    <div class="detail-row" v-if="ad.venue_needed">
      <span class="tag">🏢 Looking for venue</span>
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

.tag {
  display: inline-block;
  background: #e8f5e9;
  color: #2e7d32;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.cert-badge {
  display: inline-block;
  background: #fff3e0;
  color: #e65100;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
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

