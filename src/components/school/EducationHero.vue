<script setup>
import { ref, onMounted, nextTick } from 'vue'
import CourseModal from './CourseModal.vue'
import { heroCourses } from '@/data/courses'

const showModal = ref(false)
const selectedCourse = ref('')

const openRequest = () => {
  selectedCourse.value = 'General Course Inquiry'
  showModal.value = true
}

const scrollToCourses = () => {
  const section = document.getElementById('courses')
  if (section) window.scrollTo({ top: section.offsetTop - 150, behavior: 'smooth' })
  else console.warn('Секция с ID "courses" не найдена')
}

const onSuccess = (message) => {
  console.log('Success:', message)
  alert(message)
}
const onError = (message) => {
  console.error('Error:', message)
  alert(message)
}

// Счётчики в блоке статистики набирают значение за ~2 секунды
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach((el) => {
    const text = el.textContent
    const target = parseInt(text.replace(/\D/g, ''))
    const hasK = text.includes('k+')
    const step = target / (2000 / 16)
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        el.textContent = hasK ? '50k+' : Math.floor(target)
        clearInterval(timer)
      } else {
        el.textContent = Math.floor(current) + (hasK && current >= 10 ? 'k+' : '')
      }
    }, 16)
  })
}

onMounted(() => {
  nextTick(() => setTimeout(animateCounters, 500))
})
</script>

<template>
  <section class="school-hero">
    <div class="hero-background">
      <img src="/images/backgrounds/educationFon.png" alt="SAM IT Global Building" class="bg-image" />
      <div class="overlay"></div>
    </div>

    <div class="hero-content">
      <div class="container">
        <div class="content-grid">
          <div class="text-content">
            <h1 class="main-title boltFon">
              <span class="title-white">{{ $t('education.title_white') }}</span>
              <span class="title-orange">{{ $t('education.title_orange') }}</span>
            </h1>
            <p class="subtitle">{{ $t('education.subtitle') }}</p>

            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">1000+</div>
                <div class="stat-label">{{ $t('education.stats.graduated') }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">150</div>
                <div class="stat-label">{{ $t('education.stats.job') }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">500+</div>
                <div class="stat-label">{{ $t('education.stats.studying') }}</div>
              </div>
            </div>

            <div class="cta-buttons">
              <button class="btn-primary" @click="openRequest">{{ $t('education.cta.request') }}</button>
              <button class="btn-secondary" @click="scrollToCourses">{{ $t('education.cta.courses') }}</button>
            </div>
          </div>
          <div class="image-content"></div>
        </div>
      </div>
    </div>
  </section>

  <CourseModal
    v-model="showModal"
    :courses="heroCourses"
    :selected-course="selectedCourse"
    @success="onSuccess"
    @error="onError"
  />
</template>

<style scoped>
.school-hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 120px 0 80px;
  overflow: hidden;
  background: var(--bg);
  color: var(--text);
}
.hero-background {
  position: absolute;
  inset: 0;
}
.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.2;
  filter: grayscale(0.3);
}
.overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 50% 50% at 10% 0%, rgb(var(--brand-rgb) / 0.25), transparent),
    radial-gradient(ellipse 40% 45% at 95% 100%, rgb(139 92 246 / 0.16), transparent),
    linear-gradient(180deg, rgb(7 8 13 / 0.5), var(--bg) 96%);
}
.hero-background::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 70% 60% at 40% 40%, #000, transparent);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 40% 40%, #000, transparent);
}
.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
}
.container {
  width: min(1200px, 100% - 48px);
  max-width: none;
  margin-inline: auto;
  padding: 0;
}
.content-grid {
  display: block;
}
.text-content {
  max-width: 44rem;
}
.main-title {
  margin: 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: clamp(2.4rem, 7vw, 5rem);
  line-height: 1.04;
  letter-spacing: -0.02em;
}
.title-white,
.title-orange {
  display: block;
}
.title-orange {
  background: linear-gradient(135deg, var(--brand), var(--brand-soft) 60%, #ffc27a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.subtitle {
  max-width: 36rem;
  margin: 24px 0 0;
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  line-height: 1.6;
  color: var(--text-muted);
}
.stats-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 36px;
}
.stat-item {
  min-width: 150px;
  padding: 18px 22px;
  border-radius: var(--radius-md);
  background: rgb(255 255 255 / 0.04);
  border: 1px solid var(--line);
}
.stat-number {
  font-family: gilroyB, Exo, sans-serif;
  font-size: 2.2rem;
  line-height: 1;
  background: linear-gradient(135deg, #fff, var(--brand-soft));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.stat-label {
  margin-top: 8px;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 36px;
}
.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 26px;
  border-radius: 999px;
  border: 1px solid transparent;
  font: inherit;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  color: var(--text);
  cursor: pointer;
  transition-property: transform, background-color, border-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
  -webkit-tap-highlight-color: transparent;
}
.btn-primary {
  background: linear-gradient(135deg, var(--brand), var(--brand-soft));
  color: #0b0b0f;
  box-shadow: 0 8px 28px -8px var(--brand-glow);
}
.btn-secondary {
  background: rgb(255 255 255 / 0.04);
  border-color: var(--line-strong);
}
.btn-primary:active,
.btn-secondary:active {
  transform: scale(0.96);
}
.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}
@media (hover: hover) {
  .btn-primary:hover {
    box-shadow: 0 12px 36px -6px var(--brand-glow);
  }
  .btn-secondary:hover {
    background: rgb(255 255 255 / 0.09);
    border-color: rgb(255 255 255 / 0.3);
  }
}
@media (max-width: 640px) {
  .stats-grid {
    flex-wrap: nowrap;
    gap: 10px;
  }
  .stat-item {
    flex: 1 1 0;
    min-width: 0;
    padding: 14px 12px;
  }
  .stat-number {
    font-size: 1.6rem;
  }
  .stat-label {
    font-size: 0.78rem;
  }
}
</style>
