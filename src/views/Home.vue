<template>
  <section>
    <h1>{{ appName }}</h1>
    <p class="lead">
      Building local communities through free and affordable leisure activities.
    </p>
    <p class="explanation">
      We connect busy adults with like-minded people and local opportunities for crafting, music, walks, cooking, gardening, and more.
      Our platform helps you find regular, reliable sessions that fit your schedule and budget, creating safe spaces for adults aged 21 and above.
    </p>

    <div class="user-types-grid">
      <article class="card user-type-card">
        <h2>If you have free time</h2>
        <p>Looking for activities to join? Browse sessions near you and connect with local communities.</p>
        <router-link class="btn btn-primary" to="/post-ad?type=attendant">Join as Attendant</router-link>
      </article>

      <article class="card user-type-card">
        <h2>If you have the skills but no venue</h2>
        <p>Are you a tutor or instructor looking for a space? Find venues and build your group.</p>
        <router-link class="btn btn-primary" to="/post-ad?type=tutor">Join as Tutor</router-link>
      </article>

      <article class="card user-type-card">
        <h2>If you are representing a venue</h2>
        <p>Have available space? Connect with instructors and activities that need a home.</p>
        <router-link class="btn btn-primary" to="/post-ad?type=venue">Join as Venue</router-link>
      </article>

      <article class="card user-type-card">
        <h2>If you are organising an activity</h2>
        <p>Running a regular session? Post your activity and grow your community.</p>
        <router-link class="btn btn-primary" to="/post-ad?type=organiser">Join as Organiser</router-link>
      </article>
    </div>

    <article class="card" v-if="latestAds.length">
      <h2>Latest opportunities</h2>
      <ul class="latest-list">
        <li v-for="ad in latestAds" :key="ad.id">
          <h3>{{ ad.title }}</h3>
          <p>{{ ad.body }}</p>
        </li>
      </ul>
    </article>

    <article class="card" v-if="error">
      <p class="error">{{ error }}</p>
    </article>
  </section>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { fetchLatestAds } from '../services/api'

const latestAds = ref([])
const error = ref('')
const { appContext } = getCurrentInstance()
const appName = appContext.config.globalProperties.$appName

onMounted(async () => {
  try {
    const data = await fetchLatestAds(5)
    latestAds.value = data
  } catch (err) {
    error.value = 'Unable to load latest opportunities right now.'
  }
})
</script>

<style scoped>
.lead {
  margin: 10px 0 15px;
  font-size: 1.3em;
  color: #2c3e50;
  font-weight: 500;
}

.explanation {
  margin: 0 0 30px;
  color: #666;
  line-height: 1.7;
}

.user-types-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.user-type-card {
  display: flex;
  flex-direction: column;
}

.user-type-card h2 {
  margin-bottom: 10px;
  color: #2c3e50;
  font-size: 1.3em;
}

.user-type-card p {
  flex-grow: 1;
  margin-bottom: 15px;
  color: #666;
}

.user-type-card .btn {
  margin-top: auto;
  width: 100%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

.latest-list {
  list-style: none;
  margin-top: 15px;
  display: grid;
  gap: 15px;
}

.latest-list h3 {
  margin-bottom: 5px;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .user-types-grid {
    grid-template-columns: 1fr;
  }
}
</style>

