<template>
  <form @submit.prevent="handleSubmit" class="ad-form">
    <div class="form-group">
      <label for="postcode">First part of postcode *</label>
      <input
        id="postcode"
        v-model="formData.postcode"
        type="text"
        required
        placeholder="e.g. SW1"
        maxlength="10"
      />
    </div>

    <div class="form-group">
      <label for="indoor_outdoor">Indoor or outdoor *</label>
      <select id="indoor_outdoor" v-model="formData.indoor_outdoor" required>
        <option value="">Select...</option>
        <option value="indoor">Indoor</option>
        <option value="outdoor">Outdoor</option>
      </select>
    </div>

    <div class="form-group">
      <label for="category">Main category *</label>
      <select id="category" v-model="formData.category" required>
        <option value="">Select...</option>
        <option value="crafting">Crafting</option>
        <option value="music">Music</option>
        <option value="walks">Walks</option>
        <option value="cooking/bakery">Cooking/Bakery</option>
        <option value="gardening">Gardening</option>
      </select>
    </div>

    <div class="form-group">
      <label for="subcategory">Subcategory</label>
      <input
        id="subcategory"
        v-model="formData.subcategory"
        type="text"
        placeholder="e.g. pottery, watercolor, jazz"
      />
    </div>

    <div class="form-group">
      <label for="details">Details *</label>
      <textarea
        id="details"
        v-model="formData.details"
        required
        rows="5"
        placeholder="Describe your activity, what participants can expect, skill level required, etc."
      ></textarea>
    </div>

    <div class="form-group">
      <label for="video_link">Link to video (YouTube/Vimeo)</label>
      <input
        id="video_link"
        v-model="formData.video_link"
        type="url"
        placeholder="https://www.youtube.com/watch?v=..."
      />
    </div>

    <div class="form-group">
      <label for="day_time">Day and time of the week *</label>
      <input
        id="day_time"
        v-model="formData.day_time"
        type="text"
        required
        placeholder="e.g. Sundays, 10am - 12pm"
      />
    </div>

    <div class="form-group">
      <label for="duration">Duration *</label>
      <input
        id="duration"
        v-model="formData.duration"
        type="text"
        required
        placeholder="e.g. 2 hours"
      />
    </div>

    <div class="form-group">
      <label for="flexible_finish">Flexible or strict finish *</label>
      <select id="flexible_finish" v-model="formData.flexible_finish" required>
        <option value="">Select...</option>
        <option value="flexible">Flexible (people can leave before end)</option>
        <option value="strict">Strict finish time</option>
      </select>
    </div>

    <div class="form-group">
      <label for="disability_access">Suitable for people living with disabilities</label>
      <textarea
        id="disability_access"
        v-model="formData.disability_access"
        rows="3"
        placeholder="Please specify accessibility features, adaptations available, etc."
      ></textarea>
    </div>

    <div class="form-group checkbox-group">
      <input
        id="dog_friendly"
        v-model="formData.dog_friendly"
        type="checkbox"
      />
      <label for="dog_friendly">Dog friendly activity</label>
    </div>

    <div class="form-group">
      <label for="organiser_email">Your email address (non-public) *</label>
      <input
        id="organiser_email"
        v-model="formData.organiser_email"
        type="email"
        required
        placeholder="you@example.com"
      />
      <p class="form-hint">This will not be displayed publicly</p>
    </div>

    <div class="form-group checkbox-group">
      <input
        id="has_venue"
        v-model="formData.has_venue"
        type="checkbox"
      />
      <label for="has_venue">I have a venue, this venue is already hosting this event</label>
    </div>

    <div class="form-group checkbox-group">
      <input
        id="is_public"
        v-model="formData.is_public"
        type="checkbox"
      />
      <label for="is_public">Make this ad public (visible to non-logged-in users)</label>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Submitting...' : 'Submit Ad' }}
      </button>
      <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit', 'cancel'])

const loading = ref(false)

const formData = ref({
  postcode: '',
  indoor_outdoor: '',
  category: '',
  subcategory: '',
  details: '',
  video_link: '',
  day_time: '',
  duration: '',
  flexible_finish: '',
  disability_access: '',
  dog_friendly: false,
  organiser_email: '',
  has_venue: false,
  is_public: true,
  ...props.initialData
})

watch(() => props.initialData, (newData) => {
  if (newData && Object.keys(newData).length > 0) {
    formData.value = { ...formData.value, ...newData }
  }
}, { deep: true })

async function handleSubmit() {
  loading.value = true
  try {
    emit('submit', {
      type: 'Organiser',
      ...formData.value
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.ad-form {
  margin-top: 20px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.form-hint {
  font-size: 0.85rem;
  color: #666;
  margin-top: 5px;
}
</style>

