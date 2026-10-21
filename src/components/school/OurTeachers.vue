<script setup>
import { teachers } from '@/data/people'
</script>

<template>
  <section class="teachers-section">
    <div class="container">
      <div class="header">
        <span class="badge">{{ $t('education.teachers.badge') }}</span>
        <h2 class="title">{{ $t('education.teachers.title') }}</h2>
        <p class="subtitle">{{ $t('education.teachers.subtitle') }}</p>
      </div>

      <div class="teachers-grid">
        <div v-for="teacher in teachers" :key="teacher.nameKey" class="teacher-card">
          <div class="teacher-image">
            <img :src="teacher.photo" :alt="$t(teacher.nameKey)" />
            <div class="teacher-overlay" aria-hidden="true">
              <div class="overlay-content">
                <h4>{{ $t(teacher.nameKey) }}</h4>
                <p>{{ $t(teacher.roleKey) }}</p>
              </div>
            </div>
          </div>
          <div class="teacher-info">
            <div class="teacher-category">{{ $t(teacher.roleKey) }}</div>
            <h3 class="teacher-title">{{ $t(teacher.nameKey) }}</h3>
            <p class="teacher-description">{{ $t(teacher.descriptionKey) }}</p>
            <div class="teacher-skills">
              <span v-for="key in teacher.skillsKeys" :key="key" class="skill-tag">{{ $t(key) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.teachers-section {
  color: var(--text);
}
.container {
  width: min(1200px, 100% - 48px);
  max-width: none;
  margin-inline: auto;
}
.header {
  max-width: 44rem;
  margin-bottom: 48px;
}
.badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgb(var(--brand-rgb) / 0.1);
  border: 1px solid rgb(var(--brand-rgb) / 0.3);
  color: var(--brand-soft);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.title {
  margin: 18px 0 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: clamp(2rem, 4.2vw, 3.2rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
}
.subtitle {
  margin: 16px 0 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-muted);
}
.teachers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  margin: 0;
}
.teacher-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, var(--surface), var(--bg-raised));
  border: 1px solid var(--line);
  transition-property: border-color, transform;
  transition-duration: 200ms;
  transition-timing-function: var(--ease-out);
}
.teacher-image {
  position: relative;
  aspect-ratio: 4 / 4.2;
  overflow: hidden;
  background: #0b0d14;
}
.teacher-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  outline: 1px solid oklch(1 0 0 / 0.1);
  outline-offset: -1px;
  transition-property: transform;
  transition-duration: 300ms;
  transition-timing-function: var(--ease-out);
}
.teacher-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  background: linear-gradient(180deg, transparent 30%, rgb(7 8 13 / 0.92));
  opacity: 0;
  transition-property: opacity;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
}
.overlay-content h4 {
  margin: 0 0 4px;
  font-size: 1.15rem;
}
.overlay-content p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-muted);
}
.teacher-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 22px;
}
.teacher-category {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--brand-soft);
}
.teacher-title {
  margin: 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: 1.2rem;
  color: var(--text);
}
.teacher-description {
  margin: 0;
  flex: 1;
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--text-muted);
}
.teacher-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.skill-tag {
  padding: 4px 11px;
  border-radius: 8px;
  background: rgb(255 255 255 / 0.05);
  border: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--text-muted);
}
@media (hover: hover) {
  .teacher-card:hover {
    transform: translateY(-4px);
    border-color: rgb(var(--brand-rgb) / 0.5);
  }
  .teacher-card:hover .teacher-overlay {
    opacity: 1;
  }
  .teacher-card:hover img {
    transform: scale(1.04);
  }
}
</style>
