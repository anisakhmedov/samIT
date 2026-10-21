<script setup>
import CodeWindow from '@/components/home/CodeWindow.vue'
import TechMarquee from '@/components/ui/TechMarquee.vue'
import { links } from '@/data/links'

const floatingChips = [
  { name: 'Vue 3', color: '#42b883', class: 'chip-a' },
  { name: 'Python', color: '#ffd43b', class: 'chip-b' },
  { name: 'Flutter', color: '#02a8f4', class: 'chip-c' },
  { name: 'TensorFlow', color: '#ff8f00', class: 'chip-d' },
]

const directions = [
  { key: 'outsourcing', to: '/projects', tags: ['Web', 'Mobile', 'AI'] },
  { key: 'education', to: '/school', tags: ['Frontend', 'Backend', 'Mobile'] },
  { key: 'ai', href: links.aiSchool, tags: ['ML', 'Data', 'GenAI'] },
]

const stats = [
  { value: '150+', label: 'hero.stats.projects' },
  { value: '50+', label: 'hero.stats.clients' },
  { value: '500+', label: 'hero.stats.students' },
  { value: '5', label: 'hero.stats.years' },
]
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <img src="/images/hero/main.jpg" alt="" class="hero-photo" />
        <div class="grid-pattern"></div>
        <div class="glow glow-brand"></div>
        <div class="glow glow-cyan"></div>
      </div>

      <div class="shell hero-grid">
        <div class="hero-copy">
          <span class="eyebrow reveal" style="--i: 0">
            <span class="eyebrow-dot"></span>{{ $t('home.eyebrow') }}
          </span>
          <h1 class="title reveal" style="--i: 1">
            SAM IT <span class="title-accent">GLOBAL</span>
          </h1>
          <p class="subtitle reveal" style="--i: 2">{{ $t('hero.subtitle') }}</p>
          <div class="actions reveal" style="--i: 3">
            <router-link to="/projects" class="btn btn-primary-new">{{ $t('buttons.outsourcing') }}</router-link>
            <router-link to="/school" class="btn btn-ghost">{{ $t('buttons.education') }}</router-link>
            <a :href="links.aiSchool" class="btn btn-ghost">{{ $t('buttons.ai_school') }}</a>
          </div>
        </div>

        <div class="hero-visual reveal" style="--i: 2">
          <CodeWindow />
          <span v-for="chip in floatingChips" :key="chip.name" class="float-chip" :class="chip.class" aria-hidden="true">
            <span class="chip-dot" :style="{ background: chip.color, boxShadow: `0 0 12px ${chip.color}` }"></span>
            {{ chip.name }}
          </span>
        </div>
      </div>
    </section>

    <!-- Технологии -->
    <section class="block-section tech">
      <div class="shell">
        <header class="section-head">
          <span class="badge">{{ $t('home.tech_badge') }}</span>
          <h2>{{ $t('home.tech_title') }}</h2>
          <p>{{ $t('home.tech_text') }}</p>
        </header>
      </div>
      <TechMarquee />
    </section>

    <!-- Направления -->
    <section class="block-section">
      <div class="shell">
        <header class="section-head">
          <span class="badge">{{ $t('home.dir_badge') }}</span>
          <h2>{{ $t('home.dir_title') }}</h2>
        </header>
        <div class="cards">
          <component
            :is="d.to ? 'router-link' : 'a'"
            v-for="(d, i) in directions"
            :key="d.key"
            :to="d.to"
            :href="d.href"
            class="card"
          >
            <span class="card-index">0{{ i + 1 }}</span>
            <h3>{{ $t(`home.${d.key}.title`) }}</h3>
            <p>{{ $t(`home.${d.key}.text`) }}</p>
            <ul class="tags">
              <li v-for="tag in d.tags" :key="tag">{{ tag }}</li>
            </ul>
            <span class="card-cta">
              {{ $t(`home.${d.key}.cta`) }}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </component>
        </div>
      </div>
    </section>

    <!-- Цифры -->
    <section class="block-section stats-section">
      <div class="shell">
        <ul class="stats">
          <li v-for="stat in stats" :key="stat.label" class="stat">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ $t(stat.label) }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA -->
    <section class="block-section cta-section">
      <div class="shell">
        <div class="cta-panel">
          <div class="grid-pattern" aria-hidden="true"></div>
          <h2>{{ $t('home.cta_title') }}</h2>
          <p>{{ $t('home.cta_text') }}</p>
          <a :href="links.telegram" target="_blank" rel="noopener" class="btn btn-primary-new">
            {{ $t('home.cta_button') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  background: var(--bg);
  color: var(--text);
}
.shell {
  width: min(1200px, 100% - var(--page-gutter));
  margin-inline: auto;
}

/* ---------- Hero ---------- */
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 110px 0 70px;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
}
.hero-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.18;
  filter: grayscale(0.4);
}
.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(7 8 13 / 0.55), var(--bg) 96%);
}
.grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000, transparent);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000, transparent);
  z-index: 1;
}
.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(110px);
  z-index: 1;
}
.glow-brand {
  width: 520px;
  height: 520px;
  top: -140px;
  left: -120px;
  background: rgb(var(--brand-rgb) / 0.28);
}
.glow-cyan {
  width: 460px;
  height: 460px;
  right: -120px;
  bottom: -100px;
  background: rgb(34 211 238 / 0.16);
}
.hero-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 56px;
  align-items: center;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: rgb(255 255 255 / 0.04);
  font-size: 0.85rem;
  color: var(--text-muted);
}
.eyebrow-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand);
  box-shadow: 0 0 10px var(--brand);
}
.title {
  margin: 22px 0 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: clamp(1.75rem, 9vw, 5.6rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
}
.title-accent {
  background: linear-gradient(135deg, var(--brand), var(--brand-soft) 60%, #ffc27a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.subtitle {
  max-width: 34rem;
  margin: 24px 0 0;
  font-size: clamp(1.05rem, 1.6vw, 1.3rem);
  line-height: 1.55;
  color: var(--text-muted);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 36px;
}
.hero-copy,
.hero-visual {
  min-width: 0;
}
.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
}
.float-chip {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 999px;
  background: rgb(17 20 29 / 0.85);
  border: 1px solid var(--line-strong);
  backdrop-filter: blur(10px);
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 12px 30px -10px rgb(0 0 0 / 0.7);
}
.chip-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.chip-a {
  top: -18px;
  left: 2%;
}
.chip-b {
  top: 14%;
  right: -4%;
}
.chip-c {
  bottom: 18%;
  left: -6%;
}
.chip-d {
  bottom: -18px;
  right: 8%;
}

/* ---------- Блоки ---------- */
.block-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(28px, 5vw, 56px);
  min-height: 100vh;
  min-height: 100dvh;
  padding: clamp(56px, 9vw, 110px) 0 clamp(40px, 7vw, 80px);
  border-top: 1px solid var(--line);
}
.section-head {
  max-width: 44rem;
  margin-bottom: 48px;
}
.tech .section-head {
  margin-bottom: 0;
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
.section-head h2 {
  margin: 18px 0 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: clamp(1.6rem, 4.2vw, 3.2rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.section-head p {
  margin: 16px 0 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-muted);
}

/* ---------- Карточки направлений ---------- */
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 32px;
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, var(--surface), var(--bg-raised));
  border: 1px solid var(--line);
  color: inherit;
  text-decoration: none;
  transition-property: border-color, background-color, transform;
  transition-duration: 200ms;
  transition-timing-function: var(--ease-out);
}
.card-index {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--brand-soft);
}
.card h3 {
  margin: 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: 1.7rem;
}
.card p {
  margin: 0;
  flex: 1;
  line-height: 1.6;
  color: var(--text-muted);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
}
.tags li {
  padding: 5px 12px;
  border-radius: 8px;
  background: rgb(255 255 255 / 0.05);
  border: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
}
.card-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  font-weight: 600;
  color: var(--brand-soft);
}
.card-cta svg {
  transition-property: transform;
  transition-duration: 200ms;
  transition-timing-function: var(--ease-out);
}
.card:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}
@media (hover: hover) {
  .card:hover {
    transform: translateY(-4px);
    border-color: rgb(var(--brand-rgb) / 0.5);
    background: linear-gradient(180deg, var(--surface-hover), var(--bg-raised));
  }
  .card:hover .card-cta svg {
    transform: translateX(4px);
  }
}

/* ---------- Цифры ---------- */
.stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  padding: clamp(20px, 5vw, 36px) clamp(16px, 4vw, 28px);
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--line);
}
.stat-value {
  font-family: gilroyB, Exo, sans-serif;
  font-size: clamp(2.2rem, 8vw, 4.4rem);
  line-height: 1;
  background: linear-gradient(135deg, #fff, var(--brand-soft));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.stat-label {
  color: var(--text-muted);
  font-size: 1rem;
}

/* ---------- CTA ---------- */
.cta-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  padding: clamp(32px, 6vw, 72px);
  border-radius: var(--radius-lg);
  border: 1px solid rgb(var(--brand-rgb) / 0.35);
  background: radial-gradient(ellipse at top left, rgb(var(--brand-rgb) / 0.22), transparent 60%), var(--surface);
  overflow: hidden;
}
.cta-panel > * {
  position: relative;
  z-index: 1;
}
.cta-panel .grid-pattern {
  position: absolute;
  z-index: 0;
  opacity: 0.6;
}
.cta-panel h2 {
  margin: 0;
  max-width: 28rem;
  font-family: gilroyB, Exo, sans-serif;
  font-size: clamp(1.7rem, 4.5vw, 3.4rem);
  line-height: 1.1;
}
.cta-panel p {
  margin: 0;
  max-width: 34rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-muted);
}
.cta-panel .btn {
  margin-top: 10px;
}

/* ---------- Адаптив ---------- */
@media (min-width: 640px) {
  .stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
@media (min-width: 900px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  }
}
@media (max-width: 1023px) {
  .hero,
  .block-section {
    min-height: auto;
  }
  .float-chip {
    display: none;
  }
}

/* ---------- Движение (только при отсутствии reduce) ---------- */
@media (prefers-reduced-motion: no-preference) {
  /* Входная анимация hero: opacity + blur 4px + сдвиг 12px, шаг 100ms */
  .reveal {
    animation: reveal 300ms ease-out both;
    animation-delay: calc(var(--i, 0) * 100ms);
  }
}
@keyframes reveal {
  from {
    opacity: 0;
    filter: blur(4px);
    transform: translateY(12px);
  }
}
/* ---------- Телефон: компактнее ---------- */
@media (max-width: 480px) {
  .hero {
    padding: 84px 0 40px;
  }
  .hero-grid {
    gap: 28px;
  }
  .eyebrow {
    padding: 6px 12px;
    font-size: 0.75rem;
  }
  .title {
    margin-top: 16px;
  }
  .subtitle {
    margin-top: 14px;
    font-size: 1rem;
    line-height: 1.5;
  }
  .actions {
    gap: 10px;
    margin-top: 22px;
  }
  .actions .btn {
    flex: 1 1 100%;
  }
  .section-head {
    margin-bottom: 28px;
  }
  .section-head p {
    margin-top: 10px;
    font-size: 1rem;
  }
  .badge {
    padding: 5px 12px;
    font-size: 0.72rem;
  }
  .section-head h2 {
    margin-top: 12px;
  }
  .cards {
    gap: 14px;
  }
  .card {
    gap: 10px;
    padding: 20px;
  }
  .card h3 {
    font-size: 1.35rem;
  }
  .tags {
    margin-top: 2px;
  }
  .stats {
    gap: 12px;
  }
  .stat {
    gap: 6px;
  }
  .stat-value {
    font-size: clamp(1.9rem, 9vw, 4.4rem);
  }
  .stat-label {
    font-size: 0.85rem;
  }
  .cta-panel {
    gap: 12px;
    padding: 24px 20px;
  }
  .cta-panel p {
    font-size: 1rem;
  }
}
@media (max-width: 360px) {
  .hero {
    padding-top: 76px;
  }
  .card {
    padding: 16px;
  }
  .cta-panel {
    padding: 20px 16px;
  }
}
</style>
