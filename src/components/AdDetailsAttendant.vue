<template>
  <div class="ad-details" v-if="ad">
    <div class="detail-row" v-if="ad.category">
      <strong>Interested in:</strong> {{ ad.category }}
      <span v-if="ad.subcategory"> - {{ ad.subcategory }}</span>
    </div>
    <div class="detail-row" v-if="ad.indoor_outdoor">
      <strong>Preference:</strong> {{ ad.indoor_outdoor }}
    </div>
    <div class="detail-row" v-if="ad.postcodes && ad.postcodes.length">
      <strong>Available areas:</strong>
      <span class="postcode-list">
        <span v-for="(postcode, idx) in ad.postcodes" :key="idx" class="postcode-tag">
          {{ postcode }}
        </span>
      </span>
    </div>
    <div class="detail-row" v-if="ad.available_times && ad.available_times.length">
      <strong>Available times:</strong>
      <ul class="time-list">
        <li v-for="(time, idx) in ad.available_times" :key="idx">{{ time }}</li>
      </ul>
    </div>
    <div class="detail-row" v-if="ad.drives !== undefined">
      <strong>Transport:</strong>
      <span v-if="ad.drives">🚗 Drives</span>
      <span v-else>🚶 Doesn't drive</span>
      <span v-if="ad.needs_lift" class="tag"> Needs lift</span>
    </div>
    <div class="detail-row" v-if="ad.disability_info">
      <strong>Disability Info:</strong> {{ ad.disability_info }}
    </div>
    <div class="detail-row" v-if="ad.dog_friendly_only">
      <span class="tag">🐕 Dog friendly activities only</span>
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

.postcode-list {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-left: 5px;
}

.postcode-tag {
  background: #fff3e0;
  color: #e65100;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
}

.time-list {
  margin: 5px 0 0 20px;
  padding: 0;
  list-style: disc;
}

.time-list li {
  margin-bottom: 4px;
}

.tag {
  display: inline-block;
  background: #e8f5e9;
  color: #2e7d32;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  margin-left: 5px;
}
</style>

