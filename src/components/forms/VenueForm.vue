<template>
  <form @submit.prevent="handleSubmit" class="ad-form">
    <div class="form-group">
      <label for="postcode">First part of postcode *</label>
      <input
        id="postcode"
        v-model="formData.postcode"
        type="text"
        required
        placeholder="e.g. BN2"
        maxlength="10"
      />
    </div>

    <div class="form-group">
      <label for="available_days">What days of the week do you have free capacity? *</label>
      <input
        id="available_days"
        v-model="formData.available_days"
        type="text"
        required
        placeholder="e.g. Wednesdays, Fridays"
      />
    </div>

    <div class="form-group">
      <label for="available_duration">What duration can you provide on those days? *</label>
      <input
        id="available_duration"
        v-model="formData.available_duration"
        type="text"
        required
        placeholder="e.g. Full day (9am - 9pm) or half day options"
      />
    </div>

    <div class="form-group">
      <label>Categories you welcome in your venue *</label>
      <div class="checkbox-list">
        <label v-for="cat in categories" :key="cat.value" class="checkbox-group">
          <input
            type="checkbox"
            :value="cat.value"
            v-model="formData.categories"
          />
          <span>{{ cat.label }}</span>
        </label>
      </div>
    </div>

    <div class="form-group">
      <label for="subcategories">Subcategories</label>
      <input
        id="subcategories"
        v-model="formData.subcategories"
        type="text"
        placeholder="e.g. yoga, knitting, book club"
      />
    </div>

    <div class="form-group">
      <label for="parking">Parking conditions</label>
      <textarea
        id="parking"
        v-model="formData.parking"
        rows="2"
        placeholder="e.g. Free parking available for 8 cars"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="public_transport">Bus/train accessibility</label>
      <textarea
        id="public_transport"
        v-model="formData.public_transport"
        rows="2"
        placeholder="e.g. Bus routes 12, 25, 49 stop nearby. 10 min walk from station."
      ></textarea>
    </div>

    <div class="form-group">
      <label for="disabled_access">Disabled accessibility *</label>
      <textarea
        id="disabled_access"
        v-model="formData.disabled_access"
        rows="3"
        required
        placeholder="Please detail accessibility features, e.g. Ramp access, disabled toilet, wide doorways"
      ></textarea>
    </div>

    <div class="form-group checkbox-group">
      <input
        id="toilets"
        v-model="formData.toilets"
        type="checkbox"
      />
      <label for="toilets">Toilets provided</label>
    </div>

    <div class="form-group">
      <label for="tools_furniture">Any tool or furniture provided</label>
      <textarea
        id="tools_furniture"
        v-model="formData.tools_furniture"
        rows="3"
        placeholder="e.g. Tables, chairs, yoga mats (10), projector, screen, tea urn"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="video_link">Link to video (YouTube/Vimeo) introducing the venue</label>
      <input
        id="video_link"
        v-model="formData.video_link"
        type="url"
        placeholder="https://www.youtube.com/watch?v=..."
      />
    </div>

    <div class="form-group">
      <label for="contact_name">Contact name (if not the same as organiser)</label>
      <input
        id="contact_name"
        v-model="formData.contact_name"
        type="text"
        placeholder="Name of responsible person"
      />
    </div>

    <div class="form-group">
      <label for="contact_email">Contact email *</label>
      <input
        id="contact_email"
        v-model="formData.contact_email"
        type="email"
        required
        placeholder="venue@example.com"
      />
      <p class="form-hint">This will not be displayed publicly</p>
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

const categories = [
  { value: 'crafting', label: 'Crafting' },
  { value: 'music', label: 'Music' },
  { value: 'walks', label: 'Walks' },
  { value: 'cooking/bakery', label: 'Cooking/Bakery' },
  { value: 'gardening', label: 'Gardening' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'meditation', label: 'Meditation' },
  { value: 'discussion group', label: 'Discussion Group' },
  { value: 'dance', label: 'Dance' }
]

const formData = ref({
  postcode: '',
  available_days: '',
  available_duration: '',
  categories: [],
  subcategories: '',
  parking: '',
  public_transport: '',
  disabled_access: '',
  toilets: false,
  tools_furniture: '',
  video_link: '',
  contact_name: '',
  contact_email: '',
  is_public: true,
  ...props.initialData
})

watch(() => props.initialData, (newData) => {
  if (newData && Object.keys(newData).length > 0) {
    formData.value = { ...formData.value, ...newData }
    if (!Array.isArray(formData.value.categories)) {
      formData.value.categories = []
    }
  }
}, { deep: true })

async function handleSubmit() {
  loading.value = true
  try {
    emit('submit', {
      type: 'Venue',
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

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.checkbox-list .checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
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

