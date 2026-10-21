<script setup>
import { onMounted } from 'vue'
import AboutCard from './AboutCard.vue'
import AboutIcon from './AboutIcon.vue'
import { aboutFeatures, aboutStats } from '@/data/about'

onMounted(() => {
  // AOS подключается из CDN в index.html
  window.AOS?.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    mirror: false,
    // при reduced motion AOS не прячет и не двигает блоки
    disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  })
})
</script>

<template>
  <section class="about-us-section">
    <div class="container">
      <div class="section-header" data-aos="fade-down" data-aos-duration="1000">
        <div class="badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span>{{ $t('about_us.badge') }}</span>
        </div>
        <h2 class="section-title">{{ $t('about_us.title') }}</h2>
        <h3 class="section-subtitle">
          {{ $t('about_us.welcome') }} <span class="highlight">{{ $t('about_us.innovation') }}</span>
        </h3>
        <p class="section-description">{{ $t('about_us.description') }}</p>
      </div>

      <div class="content-grid">
        <div class="features-column">
          <AboutCard
            v-for="(feature, i) in aboutFeatures"
            :key="feature.id"
            :title="$t(`about_us.features.${feature.id}.title`)"
            :description="$t(`about_us.features.${feature.id}.desc`)"
            :image-src="feature.imageSrc"
            class="feature-card-item"
            data-aos="fade-right"
            :data-aos-delay="i * 200"
            data-aos-duration="800"
          >
            <template #icon><AboutIcon :name="feature.icon" /></template>
          </AboutCard>
        </div>

        <div class="visual-column">
          <div class="school-photos">
            <div class="main-photo" data-aos="zoom-in" data-aos-delay="400" data-aos-duration="1000">
              <img src="/images/content/img1.jpg" alt="SAM IT Global School" class="photo-main" />
              <div class="photo-overlay">
                <div class="play-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="additional-photos">
              <div class="photo-small" data-aos="flip-left" data-aos-delay="600" data-aos-duration="600">
                <img src="/images/content/img3.jpg" alt="Classroom" class="photo-secondary" />
              </div>
              <div class="photo-small" data-aos="flip-left" data-aos-delay="700" data-aos-duration="600">
                <img src="/images/content/img4.jpg" alt="Students" class="photo-secondary" />
              </div>
              <div class="photo-small" data-aos="flip-left" data-aos-delay="800" data-aos-duration="600">
                <img src="/images/content/img6.jpg" alt="Lab" class="photo-secondary" />
              </div>
            </div>
          </div>

          <div class="stats-container">
            <div
              v-for="(stat, i) in aboutStats"
              :key="stat.id"
              class="stat-card"
              data-aos="fade-up"
              :data-aos-delay="900 + i * 100"
              data-aos-duration="700"
            >
              <div class="stat-icon"><AboutIcon :name="stat.icon" :size="24" /></div>
              <div class="stat-content">
                <div class="stat-number">{{ stat.number }}</div>
                <div class="stat-label">{{ $t(`about_us.stats.${stat.id}`) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
  </section>
</template>

<style scoped>
.about-us-section {
  position: relative;
  padding: 110px 0;
  border-top: 1px solid var(--line);
  background: var(--bg);
  color: var(--text);
  overflow: hidden;
}
.container {
  position: relative;
  z-index: 1;
  width: min(1200px, 100% - 48px);
  max-width: none;
  margin-inline: auto;
  padding: 0;
}
.section-header {
  max-width: 44rem;
  margin-bottom: 56px;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
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
.section-title {
  margin: 18px 0 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: clamp(2rem, 4.2vw, 3.2rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
}
.section-subtitle {
  margin: 10px 0 0;
  font-size: clamp(1.2rem, 2.2vw, 1.6rem);
  font-weight: 500;
  color: var(--text);
}
.highlight {
  color: var(--brand-soft);
}
.section-description {
  margin: 16px 0 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-muted);
}
.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 40px;
  align-items: start;
}
.features-column {
  display: grid;
  gap: 24px;
}
.visual-column {
  display: grid;
  gap: 20px;
}
.school-photos {
  display: grid;
  gap: 14px;
}
.main-photo {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--line);
}
.photo-main {
  display: block;
  width: 100%;
  height: 300px;
  object-fit: cover;
  outline: 1px solid oklch(1 0 0 / 0.1);
  outline-offset: -1px;
}
.photo-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, transparent 40%, rgb(7 8 13 / 0.7));
}
.play-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.14);
  border: 1px solid rgb(255 255 255 / 0.3);
  backdrop-filter: blur(8px);
  color: #fff;
}
.play-button svg {
  /* оптический сдвиг треугольника к острию */
  margin-left: 3px;
}
.additional-photos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.photo-small {
  overflow: hidden;
  border-radius: var(--radius-md);
  border: 1px solid var(--line);
}
.photo-secondary {
  display: block;
  width: 100%;
  height: 110px;
  object-fit: cover;
  outline: 1px solid oklch(1 0 0 / 0.1);
  outline-offset: -1px;
}
.stats-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: var(--radius-md);
  background: var(--surface);
  border: 1px solid var(--line);
}
.stat-icon {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgb(var(--brand-rgb) / 0.12);
  border: 1px solid rgb(var(--brand-rgb) / 0.3);
  color: var(--brand-soft);
}
.stat-number {
  font-family: gilroyB, Exo, sans-serif;
  font-size: 1.8rem;
  line-height: 1;
  color: var(--text);
}
.stat-label {
  margin-top: 6px;
  font-size: 0.85rem;
  color: var(--text-muted);
}
.floating-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}
.shape-1 {
  width: 420px;
  height: 420px;
  top: -120px;
  right: -100px;
  background: rgb(var(--brand-rgb) / 0.14);
}
.shape-2 {
  width: 360px;
  height: 360px;
  bottom: -100px;
  left: -100px;
  background: rgb(139 92 246 / 0.12);
}
.shape-3 {
  display: none;
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 48px;
  }
}
@media (max-width: 640px) {
  .about-us-section {
    padding: 72px 0;
  }
  .stats-container {
    grid-template-columns: 1fr;
  }
}
</style>
