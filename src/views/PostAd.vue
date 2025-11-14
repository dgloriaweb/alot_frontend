<template>
  <section>
    <h1>{{ isEditMode ? 'Edit listing' : 'Create a listing' }}</h1>
    <article class="card">
      <div class="form-group">
        <label for="userType">Select which type of user you are: *</label>
        <select id="userType" v-model="userType" class="select" required :disabled="isEditMode">
          <option value="">Select a type...</option>
          <option value="organiser">Organiser</option>
          <option value="attendant">Attendant</option>
          <option value="venue">Venue</option>
          <option value="tutor">Tutor / Instructor</option>
        </select>
        <p v-if="isEditMode" class="form-hint">User type cannot be changed when editing</p>
      </div>

      <div v-if="loading" class="loading-message">
        <p>Loading ad data...</p>
      </div>
      <div v-else-if="userType" class="form-container">
        <OrganiserForm
          v-if="userType === 'organiser'"
          :initial-data="initialFormData"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
        <AttendantForm
          v-else-if="userType === 'attendant'"
          :initial-data="initialFormData"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
        <VenueForm
          v-else-if="userType === 'venue'"
          :initial-data="initialFormData"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
        <TutorForm
          v-else-if="userType === 'tutor'"
          :initial-data="initialFormData"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockMyAds } from '../data/mockMyAds'
import { createAd, updateAd } from '../services/api'
import OrganiserForm from '../components/forms/OrganiserForm.vue'
import AttendantForm from '../components/forms/AttendantForm.vue'
import VenueForm from '../components/forms/VenueForm.vue'
import TutorForm from '../components/forms/TutorForm.vue'

const route = useRoute()
const router = useRouter()

const userType = ref('')
const initialFormData = ref({})
const loading = ref(false)
const editId = ref(null)

const isEditMode = computed(() => !!editId.value)

// Check for edit ID and type in URL query params
onMounted(async () => {
  const editParam = route.query.edit
  const typeParam = route.query.type

  if (editParam) {
    editId.value = parseInt(editParam)
    await loadAdData(editId.value)
  } else if (typeParam && ['organiser', 'attendant', 'venue', 'tutor'].includes(typeParam)) {
    userType.value = typeParam
  }
})

async function loadAdData(id) {
  loading.value = true
  try {
    // For localhost:3000, use mock data
    if (window.location.hostname === 'localhost' && window.location.port === '3000') {
      const ad = mockMyAds.find(a => a.id === id)
      if (ad) {
        // Map ad type to form userType
        const typeMap = {
          'Organiser': 'organiser',
          'Attendant': 'attendant',
          'Venue': 'venue',
          'Tutor': 'tutor'
        }
        userType.value = typeMap[ad.type] || typeMap[ad.user_type] || ''
        
        // Map ad data to form data based on type
        initialFormData.value = mapAdToFormData(ad)
      } else {
        alert('Ad not found')
        router.push('/my-ads')
      }
    } else {
      // TODO: Fetch from API when backend is ready
      // const response = await fetchAd(id)
      // const ad = response.data
      // ... same mapping logic
    }
  } catch (error) {
    console.error('Error loading ad:', error)
    alert('Error loading ad. Please try again.')
    router.push('/my-ads')
  } finally {
    loading.value = false
  }
}

function mapAdToFormData(ad) {
  const baseData = {
    title: ad.title || '',
    details: ad.details || '',
    summary: ad.summary || '',
    is_public: ad.is_public !== undefined ? ad.is_public : true
  }

  if (ad.type === 'Organiser' || ad.user_type === 'Organiser') {
    return {
      ...baseData,
      postcode: ad.postcode || '',
      indoor_outdoor: ad.indoor_outdoor || '',
      category: ad.category || '',
      subcategory: ad.subcategory || '',
      video_link: ad.video_link || '',
      day_time: ad.day_time || '',
      duration: ad.duration || '',
      flexible_finish: ad.flexible_finish || '',
      disability_access: ad.disability_access || '',
      dog_friendly: ad.dog_friendly || false,
      organiser_email: ad.organiser_email || '',
      has_venue: ad.has_venue || false
    }
  }

  if (ad.type === 'Attendant' || ad.user_type === 'Attendant') {
    return {
      ...baseData,
      category: ad.category || '',
      subcategory: ad.subcategory || '',
      indoor_outdoor: ad.indoor_outdoor || '',
      postcodes: ad.postcodes || [''],
      drives: ad.drives || false,
      needs_lift: ad.needs_lift || false,
      show_disabled: ad.show_disabled || false,
      disability_info: ad.disability_info || '',
      available_times: ad.available_times || [''],
      additional_info: ad.additional_info || '',
      dog_friendly_only: ad.dog_friendly_only || false,
      contact_email: ad.contact_email || '',
      nickname: ad.nickname || ''
    }
  }

  if (ad.type === 'Venue' || ad.user_type === 'Venue') {
    return {
      ...baseData,
      postcode: ad.postcode || '',
      available_days: ad.available_days || '',
      available_duration: ad.available_duration || '',
      categories: Array.isArray(ad.categories) ? ad.categories : (ad.categories ? [ad.categories] : []),
      subcategories: Array.isArray(ad.subcategories) ? ad.subcategories.join(', ') : (ad.subcategories || ''),
      parking: ad.parking || '',
      public_transport: ad.public_transport || '',
      disabled_access: ad.disabled_access || '',
      toilets: ad.toilets || false,
      tools_furniture: ad.tools_furniture || '',
      video_link: ad.video_link || '',
      contact_name: ad.contact_name || '',
      contact_email: ad.contact_email || ''
    }
  }

  if (ad.type === 'Tutor' || ad.user_type === 'Tutor') {
    return {
      ...baseData,
      postcode: ad.postcode || '',
      indoor_outdoor: ad.indoor_outdoor || '',
      category: ad.category || '',
      subcategory: ad.subcategory || '',
      video_link: ad.video_link || '',
      day_time: ad.day_time || '',
      duration: ad.duration || '',
      flexible_finish: ad.flexible_finish || '',
      disability_access: ad.disability_access || '',
      dog_friendly: ad.dog_friendly || false,
      tutor_email: ad.tutor_email || ad.organiser_email || '',
      has_venue: ad.has_venue || false,
      has_certificate: ad.has_certificate || false
    }
  }

  return baseData
}

async function handleSubmit(formData) {
  try {
    // For localhost:3000, simulate API call
    if (window.location.hostname === 'localhost' && window.location.port === '3000') {
      console.log(isEditMode.value ? 'Updating ad:' : 'Submitting ad:', formData)
      alert(
        isEditMode.value
          ? 'Ad updated successfully! Your changes are pending admin approval. (Mock)'
          : 'Ad submitted successfully! Your ad is pending admin approval. You will receive an email confirmation. (Mock)'
      )
      router.push('/my-ads')
      return
    }

    // Real API calls
    if (isEditMode.value) {
      await updateAd(editId.value, formData)
      alert('Ad updated successfully! Your changes are pending admin approval.')
    } else {
      await createAd(formData)
      alert('Ad submitted successfully! Your ad is pending admin approval. You will receive an email confirmation.')
    }
    router.push('/my-ads')
  } catch (error) {
    console.error('Error submitting ad:', error)
    if (error.response?.status === 422) {
      alert('Please fill in all required fields correctly.')
    } else if (error.response?.status === 401) {
      alert('Please log in to post an ad.')
      router.push('/login')
    } else {
      alert('Error submitting ad. Please try again.')
    }
  }
}

function handleCancel() {
  router.push('/my-ads')
}
</script>

<style scoped>
.select {
  width: 100%;
  padding: 10px;
}

.hint {
  margin-top: 10px;
  color: #777;
}

.form-hint {
  font-size: 0.85rem;
  color: #666;
  margin-top: 5px;
  font-style: italic;
}

.loading-message {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.select:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>

