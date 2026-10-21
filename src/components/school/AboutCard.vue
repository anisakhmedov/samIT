<script setup>
import AboutIcon from './AboutIcon.vue'

defineProps({
  title: { type: String, default: 'Developer School' },
  description: {
    type: String,
    default: 'Practical classes with experienced mentors, mastering modern technologies, creating original projects.',
  },
  imageSrc: { type: String, default: '/images/content/img1.jpg' },
})
</script>

<template>
  <div class="about-card">
    <svg width="100%" height="100%" preserveAspectRatio="none" class="card-background" viewBox="0 0 670 370" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        class="card-border"
        d="M670 350C670 361.046 661.046 370 650 370H20C8.95429 370 0 361.046 0 350V20C0 8.95432 8.95431 0 20 0H567C578.046 0 587 8.95431 587 20V63C587 74.0457 595.954 83 607 83H650C661.046 83 670 91.9543 670 103V350Z"
        fill="white"
      />
    </svg>
    <div class="icon-container">
      <div class="icon-background">
        <slot name="icon"><AboutIcon name="graduation" /></slot>
      </div>
    </div>
    <div class="card-content">
      <h4 class="card-title">{{ title }}</h4>
      <p class="card-description">{{ description }}</p>
      <div class="card-image"><img :src="imageSrc" :alt="title" class="image" /></div>
    </div>
  </div>
</template>

<style scoped>
.about-card {
  position: relative;
  min-height: 260px;
  color: var(--text);
}
/* Контур карточки с «вырезом» под иконку: заливка и обводка в тёмной теме */
.card-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.card-border {
  fill: var(--surface);
  stroke: var(--line-strong);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}
.icon-container {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
  min-width: 56px;
  aspect-ratio: 1;
}
.icon-background {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--brand), var(--brand-soft));
  color: #0b0b0f;
  box-shadow: 0 8px 24px -8px var(--brand-glow);
}
.card-content {
  position: relative;
  display: grid;
  gap: 12px;
  padding: 28px;
  padding-right: 18%;
}
.card-title {
  margin: 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: 1.35rem;
  color: var(--text);
}
.card-description {
  margin: 0;
  line-height: 1.6;
  color: var(--text-muted);
}
.card-image {
  margin: 8px -18% 0 0;
  overflow: hidden;
  border-radius: 14px;
}
.image {
  display: block;
  width: 100%;
  height: 170px;
  object-fit: cover;
  outline: 1px solid oklch(1 0 0 / 0.1);
  outline-offset: -1px;
}
</style>
