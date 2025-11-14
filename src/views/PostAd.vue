<template>
  <section>
    <h1>Create a listing</h1>
    <article class="card">
      <div class="form-group">
        <label for="userType">Select which type of user you are: *</label>
        <select id="userType" v-model="userType" class="select" required>
          <option value="">Select a type...</option>
          <option value="organiser">Organiser</option>
          <option value="attendant">Attendant</option>
          <option value="venue">Venue</option>
          <option value="tutor">Tutor / Instructor</option>
        </select>
      </div>

      <div v-if="userType" class="form-container">
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import OrganiserForm from '../components/forms/OrganiserForm.vue'
import AttendantForm from '../components/forms/AttendantForm.vue'
import VenueForm from '../components/forms/VenueForm.vue'
import TutorForm from '../components/forms/TutorForm.vue'

const route = useRoute()
const router = useRouter()

const userType = ref('')
const initialFormData = ref({})

// Check for type in URL query params
onMounted(() => {
  const typeParam = route.query.type
  if (typeParam && ['organiser', 'attendant', 'venue', 'tutor'].includes(typeParam)) {
    userType.value = typeParam
  }
})

async function handleSubmit(formData) {
  try {
    // TODO: Call API to submit ad
    // await submitAd(formData)
    console.log('Submitting ad:', formData)
    alert('Ad submitted successfully! (This is a mock submission)')
    router.push('/my-ads')
  } catch (error) {
    console.error('Error submitting ad:', error)
    alert('Error submitting ad. Please try again.')
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
</style>

