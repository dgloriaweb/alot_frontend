<template>
  <form @submit.prevent="handleSubmit" class="ad-form">
    <div class="form-group">
      <label for="category">Main category of occupation *</label>
      <select id="category" v-model="formData.category" required>
        <option value="">Select...</option>
        <option value="crafting">Crafting</option>
        <option value="music">Music</option>
        <option value="walks">Walks</option>
        <option value="cooking/bakery">Cooking/Bakery</option>
        <option value="gardening">Gardening</option>
        <option value="other">Other</option>
      </select>
      <input
        v-if="formData.category === 'other'"
        v-model="formData.category_other"
        type="text"
        placeholder="Please specify"
        class="form-group"
        style="margin-top: 10px;"
      />
    </div>

    <div class="form-group">
      <label for="subcategory">Subcategory</label>
      <input
        id="subcategory"
        v-model="formData.subcategory"
        type="text"
        placeholder="e.g. pottery, jazz, hiking"
      />
    </div>

    <div class="form-group">
      <label for="indoor_outdoor">Indoor, outdoor or both *</label>
      <select id="indoor_outdoor" v-model="formData.indoor_outdoor" required>
        <option value="">Select...</option>
        <option value="indoor">Indoor</option>
        <option value="outdoor">Outdoor</option>
        <option value="both">Both</option>
      </select>
    </div>

    <div class="form-group">
      <label>Areas (first part of postcode) where you can attend *</label>
      <div v-for="(postcode, index) in formData.postcodes" :key="index" class="postcode-item">
        <input
          v-model="formData.postcodes[index]"
          type="text"
          required
          placeholder="e.g. SW1"
          maxlength="10"
        />
        <button
          v-if="formData.postcodes.length > 1"
          type="button"
          class="btn-remove"
          @click="removePostcode(index)"
        >
          Remove
        </button>
      </div>
      <button type="button" class="btn btn-secondary btn-small" @click="addPostcode">
        + Add another area
      </button>
    </div>

    <div class="form-group checkbox-group">
      <input id="drives" v-model="formData.drives" type="checkbox" />
      <label for="drives">I drive</label>
    </div>

    <div class="form-group checkbox-group">
      <input id="needs_lift" v-model="formData.needs_lift" type="checkbox" />
      <label for="needs_lift">I need a lift</label>
    </div>

    <div class="form-group checkbox-group">
      <input
        id="show_disabled"
        v-model="formData.show_disabled"
        type="checkbox"
      />
      <label for="show_disabled">Show activities that can be attended by disabled people</label>
    </div>

    <div class="form-group">
      <label for="disability_info">Do you live with any disabilities they should know of?</label>
      <textarea
        id="disability_info"
        v-model="formData.disability_info"
        rows="3"
        placeholder="Please share any relevant information"
      ></textarea>
    </div>

    <div class="form-group">
      <label>Available times *</label>
      <div v-for="(time, index) in formData.available_times" :key="index" class="time-item">
        <input
          v-model="formData.available_times[index]"
          type="text"
          required
          placeholder="e.g. Wednesdays from 6pm"
        />
        <button
          v-if="formData.available_times.length > 1"
          type="button"
          class="btn-remove"
          @click="removeTime(index)"
        >
          Remove
        </button>
      </div>
      <button type="button" class="btn btn-secondary btn-small" @click="addTime">
        + Add another time
      </button>
    </div>

    <div class="form-group">
      <label for="additional_info">Is there anything else you'd like to add?</label>
      <textarea
        id="additional_info"
        v-model="formData.additional_info"
        rows="4"
        placeholder="Tell us more about what you're looking for..."
      ></textarea>
    </div>

    <div class="form-group checkbox-group">
      <input
        id="dog_friendly_only"
        v-model="formData.dog_friendly_only"
        type="checkbox"
      />
      <label for="dog_friendly_only">Dog friendly activities only</label>
    </div>

    <div class="form-group">
      <label for="contact_email">Contact email *</label>
      <input
        id="contact_email"
        v-model="formData.contact_email"
        type="email"
        required
        placeholder="you@example.com"
      />
    </div>

    <div class="form-group">
      <label for="nickname">Nick name / Addressee name</label>
      <input
        id="nickname"
        v-model="formData.nickname"
        type="text"
        placeholder="How should we address you?"
      />
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
  category: '',
  category_other: '',
  subcategory: '',
  indoor_outdoor: '',
  postcodes: [''],
  drives: false,
  needs_lift: false,
  show_disabled: false,
  disability_info: '',
  available_times: [''],
  additional_info: '',
  dog_friendly_only: false,
  contact_email: '',
  nickname: '',
  is_public: true,
  ...props.initialData
})

watch(() => props.initialData, (newData) => {
  if (newData && Object.keys(newData).length > 0) {
    formData.value = { ...formData.value, ...newData }
    if (!formData.value.postcodes || formData.value.postcodes.length === 0) {
      formData.value.postcodes = ['']
    }
    if (!formData.value.available_times || formData.value.available_times.length === 0) {
      formData.value.available_times = ['']
    }
  }
}, { deep: true })

function addPostcode() {
  formData.value.postcodes.push('')
}

function removePostcode(index) {
  if (formData.value.postcodes.length > 1) {
    formData.value.postcodes.splice(index, 1)
  }
}

function addTime() {
  formData.value.available_times.push('')
}

function removeTime(index) {
  if (formData.value.available_times.length > 1) {
    formData.value.available_times.splice(index, 1)
  }
}

async function handleSubmit() {
  loading.value = true
  try {
    emit('submit', {
      type: 'Attendant',
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

.postcode-item,
.time-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.postcode-item input,
.time-item input {
  flex: 1;
}

.btn-remove {
  padding: 8px 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-remove:hover {
  background: #c82333;
}

.btn-small {
  padding: 6px 12px;
  font-size: 0.9rem;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
</style>

