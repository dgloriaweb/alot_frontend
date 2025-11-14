<template>
  <article :class="['ad-card', `ad-card-${adType.toLowerCase()}`]">
    <div class="ad-header">
      <div class="ad-meta">
        <span :class="['badge', `badge-${adType.toLowerCase()}`]">{{ adType }}</span>
        <span class="ad-location">{{ ad.location || ad.postcode }}</span>
        <span class="ad-date">{{ formatDate(ad.created_at || ad.publishedAt) }}</span>
        <span v-if="ad.is_public === false" class="ad-visibility">🔒 Members only</span>
        <span v-else class="ad-visibility">🌐 Public</span>
      </div>
      <div class="ad-actions" v-if="showActions">
        <button class="btn-icon" @click="$emit('edit', ad)" title="Edit">✏️</button>
        <button class="btn-icon" @click="$emit('delete', ad)" title="Delete">🗑️</button>
      </div>
    </div>
    <h3 class="ad-title">{{ ad.title || getDefaultTitle() }}</h3>
    <p class="ad-summary" v-if="ad.details || ad.summary">
      {{ truncate(ad.details || ad.summary, 200) }}
    </p>
    <AdDetailsOrganiser v-if="adType === 'Organiser'" :ad="ad" />
    <AdDetailsAttendant v-else-if="adType === 'Attendant'" :ad="ad" />
    <AdDetailsVenue v-else-if="adType === 'Venue'" :ad="ad" />
    <AdDetailsTutor v-else-if="adType === 'Tutor'" :ad="ad" />
  </article>
</template>

<script setup>
import { computed } from 'vue'
import AdDetailsOrganiser from './AdDetailsOrganiser.vue'
import AdDetailsAttendant from './AdDetailsAttendant.vue'
import AdDetailsVenue from './AdDetailsVenue.vue'
import AdDetailsTutor from './AdDetailsTutor.vue'

const props = defineProps({
  ad: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit', 'delete'])

const adType = computed(() => {
  const type = props.ad.type || props.ad.user_type || 'Organiser'
  // Normalize to match badge classes
  const lowerType = type.toLowerCase()
  if (lowerType.includes('organiser') || lowerType.includes('organizer')) return 'Organiser'
  if (lowerType.includes('attendant') || lowerType.includes('participant')) return 'Attendant'
  if (lowerType.includes('venue')) return 'Venue'
  if (lowerType.includes('tutor') || lowerType.includes('instructor')) return 'Tutor'
  return type
})

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function truncate(text, length) {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

function getDefaultTitle() {
  const type = adType.value.toLowerCase()
  if (type === 'organiser') return 'Activity Session'
  if (type === 'attendant') return 'Looking for Activities'
  if (type === 'venue') return 'Venue Available'
  if (type === 'tutor') return 'Instruction Available'
  return 'Ad Listing'
}
</script>

<style scoped>
.ad-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #ddd;
}

.ad-card-organiser {
  border-left-color: #4a90e2;
}

.ad-card-attendant {
  border-left-color: #f39c12;
}

.ad-card-venue {
  border-left-color: #27ae60;
}

.ad-card-tutor {
  border-left-color: #9b59b6;
}

.ad-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.ad-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.ad-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
}

.ad-location {
  font-weight: 500;
}

.ad-date {
  color: #999;
}

.ad-visibility {
  font-size: 0.85rem;
}

.ad-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;
}

.btn-icon:hover {
  background: #f0f0f0;
}

.ad-title {
  font-size: 1.3em;
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.ad-summary {
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}

.badge-organiser {
  background-color: #4a90e2;
  color: white;
}

.badge-attendant {
  background-color: #f39c12;
  color: white;
}

.badge-venue {
  background-color: #27ae60;
  color: white;
}

.badge-tutor {
  background-color: #9b59b6;
  color: white;
}
</style>

