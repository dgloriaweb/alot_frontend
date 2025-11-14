<template>
  <section>
    <article class="card hero-card">
      <p class="eyebrow">Hero</p>
      <h1>{{ hero.title }}</h1>
      <p class="lead">{{ hero.subtitle }}</p>
      <p class="explanation">{{ hero.description }}</p>
      <div class="hero-actions">
        <router-link class="btn btn-primary" to="/browse">Browse activities</router-link>
        <router-link class="btn btn-secondary" to="/post-ad">Share an opportunity</router-link>
      </div>
    </article>

    <div class="user-types-grid">
      <article
        v-for="path in userPaths"
        :key="path.id"
        class="card user-type-card"
      >
        <figure class="user-type-figure">
          <img :src="path.image" :alt="path.alt" loading="lazy" />
          <figcaption>{{ path.photoCredit }}</figcaption>
        </figure>
        <p class="user-type-who"><strong>{{ path.who }}</strong></p>
        <p class="user-type-why"><em>{{ path.why }}</em></p>
        <p class="user-type-how">{{ path.how }}</p>
        <router-link :class="['btn', `btn-${path.type}`]" :to="path.ctaLink">
          {{ path.cta }}
        </router-link>
      </article>
    </div>

    <article class="card" v-if="peekAds.length">
      <h2>Peek into content</h2>
      <p class="peek-description">Latest opportunities shared by the community (mock data).</p>
      <ul class="latest-list">
        <li v-for="ad in peekAds" :key="ad.id">
          <div class="latest-meta">
            <span :class="['badge', `badge-${getBadgeClass(ad.type)}`]">{{ ad.type }}</span>
            <span>{{ ad.location }}</span>
            <span>{{ formatPublished(ad.publishedAt) }}</span>
          </div>
          <h3>{{ ad.title }}</h3>
          <p>{{ snippet(ad.summary || ad.details || '') }}</p>
        </li>
      </ul>
    </article>

    <article class="card" v-if="error">
      <p class="error">{{ error }}</p>
    </article>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchLatestAds } from '../services/api'
import { mockAds } from '../data/mockAds'
import { mockMyAds } from '../data/mockMyAds'

const hero = {
  title: 'we care ALOT Community Hub',
  subtitle: 'Adults Leisure Outdoor and Technical Indoor Activities Group',
  description:
    'Building local communities through free and affordable leisure activities. We connect busy adults with like-minded people and local opportunities for crafting, music, walks, cooking, gardening, and more. Our platform helps you find regular, reliable sessions that fit your schedule and budget, creating safe spaces for adults aged 21 and above.'
}

const userPaths = [
  {
    id: 'path-free-time',
    type: 'attendant',
    image:
      'https://images.unsplash.com/photo-1695665128110-703ff866cdab?q=80&w=auto=format&fit=crop&w=640&q=80',
    alt: 'Bored woman looking out her window',
    photoCredit: 'Photo: Unsplash / em b',
    who: 'If you have free time, and you are looking for activities to join',
    why: 'Working weekdays, or short of leisure time, still looking for activities to join?',
    how: 'Browse sessions near you and connect with local communities.',
    cta: 'Attend activities',
    ctaLink: '/browse'
  },
  {
    id: 'path-tutor',
    type: 'tutor',
    image:
      'https://images.unsplash.com/photo-1761034114091-6d30447e25aa?auto=format&fit=crop&w=640&q=80',
    alt: 'Creative instructor demonstrating yoga basics',
    photoCredit: 'Photo: Unsplash / Christian Harb',
    who: 'If you have the skills but no venue',
    why: 'Ready to guide a group yet still searching for the right space?',
    how: 'Find venues and members who would love to learn from you.',
    cta: 'Offer your skills',
    ctaLink: '/post-ad?type=tutor'
  },
  {
    id: 'path-venue',
    type: 'venue',
    image:
      'https://images.unsplash.com/photo-1616045152590-ebda3a20804c?auto=format&fit=crop&w=640&q=80',
    alt: 'Bright community hall with chairs and plants',
    photoCredit: 'Photo: Unsplash / Rendy Novantino',
    who: 'If you are representing a venue',
    why: 'Have a hall or cosy studio standing empty during the week?',
    how: 'Connect with organisers and tutors who need a welcoming space.',
    cta: 'List your venue',
    ctaLink: '/post-ad?type=venue'
  },
  {
    id: 'path-organiser',
    type: 'organiser',
    image:
      'https://images.unsplash.com/photo-1601566674556-3ac2a27fec9f?auto=format&fit=crop&w=640&q=80',
    alt: 'Group of adults enjoying a creative workshop',
    photoCredit: 'Photo: Unsplash / Richard Burton',
    who: 'If you are organising an activity',
    why: 'Already hosting a session and want reliable participants?',
    how: 'Post your activity, set expectations, and reach nearby adults.',
    cta: 'Post your session',
    ctaLink: '/post-ad?type=organiser'
  }
]

const latestAds = ref([])
const error = ref('')

// Combine mockAds and mockMyAds, then sort by publishedAt in descending order
// Deduplicate by title and location to avoid showing the same ad twice
// Put mockMyAds first so they take precedence (more complete data)
const allAds = [...mockMyAds, ...mockAds].map(ad => ({
  ...ad,
  // Normalize publishedAt - use publishedAt or created_at, convert to Date for sorting
  sortDate: ad.publishedAt 
    ? new Date(ad.publishedAt).getTime() 
    : (ad.created_at ? new Date(ad.created_at).getTime() : 0),
  // Create a unique key for deduplication (title + location)
  uniqueKey: `${(ad.title || '').toLowerCase().trim()}_${(ad.location || ad.postcode || '').toLowerCase().trim()}`
}))

// Deduplicate: keep first occurrence (which will be from mockMyAds since it's first)
const seen = new Set()
const deduplicatedAds = allAds.filter(ad => {
  if (seen.has(ad.uniqueKey)) {
    return false
  }
  seen.add(ad.uniqueKey)
  return true
})

const peekAds = ref(
  deduplicatedAds
    .filter(ad => ad.is_public !== false) // Only show public ads
    .sort((a, b) => b.sortDate - a.sortDate) // Descending order (newest first)
    .slice(0, 10) // Limit to 10 most recent
)

onMounted(async () => {
  try {
    const data = await fetchLatestAds(5)
    latestAds.value = data
  } catch (err) {
    error.value = 'Unable to load latest opportunities right now.'
  }
})

function snippet(text) {
  const trimmed = text.slice(0, 150).trim()
  return `${trimmed}... (read more)`
}

function formatPublished(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function getBadgeClass(type) {
  if (!type) return 'organiser'
  const lowerType = type.toLowerCase()
  if (lowerType.includes('organiser') || lowerType.includes('organizer')) return 'organiser'
  if (lowerType.includes('attendant') || lowerType.includes('participant')) return 'attendant'
  if (lowerType.includes('venue')) return 'venue'
  if (lowerType.includes('tutor') || lowerType.includes('instructor')) return 'tutor'
  return 'organiser'
}
</script>

<style scoped>
.hero-card {
  background: linear-gradient(135deg, #ffffff 0%, #f0fffc 100%);
  border: 1px solid #d3f2ee;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 13px;
  color: #38d4c7;
  margin-bottom: 5px;
}

h1 {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 10px;
  color: #173b3f;
}

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

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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
  gap: 10px;
}

.user-type-figure {
  position: relative;
  margin: 0;
}

.user-type-figure img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
}

.user-type-figure figcaption {
  font-size: 12px;
  color: #7a7a7a;
  margin-top: 4px;
}

.user-type-who {
  margin: 0;
}

.user-type-why {
  margin: 0;
}

.user-type-how {
  margin-bottom: 10px;
  color: #555;
}

.user-type-card .btn {
  margin-top: auto;
  width: 100%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: none;
  color: white;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-organiser {
  background-color: #4a90e2;
}

.btn-organiser:hover {
  background-color: #357abd;
}

.btn-attendant {
  background-color: #f39c12;
}

.btn-attendant:hover {
  background-color: #d68910;
}

.btn-venue {
  background-color: #27ae60;
}

.btn-venue:hover {
  background-color: #229954;
}

.btn-tutor {
  background-color: #9b59b6;
}

.btn-tutor:hover {
  background-color: #8e44ad;
}

.latest-list {
  list-style: none;
  margin-top: 15px;
  display: grid;
  gap: 15px;
}

.latest-meta {
  display: flex;
  gap: 10px;
  font-size: 0.9rem;
  color: #6b6b6b;
  flex-wrap: wrap;
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

.latest-list h3 {
  margin-bottom: 5px;
  color: #2c3e50;
}

.peek-description {
  color: #555;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .user-types-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
  }
}
</style>

