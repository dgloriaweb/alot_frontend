<template>
  <section>
    <h1>Create a listing</h1>
    <article class="card">
      <p>Select which type of user you are:</p>
      <select v-model="userType" class="form-group select">
        <option value="organiser">Organiser</option>
        <option value="attendant">Attendant</option>
        <option value="venue">Venue</option>
        <option value="tutor">Tutor / Instructor</option>
      </select>
      <p class="hint">This page will house the full forms described in the brief.</p>
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const userType = ref('organiser')
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

