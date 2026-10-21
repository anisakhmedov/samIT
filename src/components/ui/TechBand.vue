<script setup>
import TechMarquee from './TechMarquee.vue'
</script>

<template>
  <section class="tech-band">
    <div class="head">
      <span class="badge">{{ $t('home.tech_badge') }}</span>
      <h2>{{ $t('home.tech_title') }}</h2>
      <p>{{ $t('home.tech_text') }}</p>
    </div>
    <TechMarquee />
  </section>
</template>

<style scoped>
.tech-band {
  display: flex;
  flex-direction: column;
  gap: 44px;
  padding: 90px 0;
  background: var(--bg);
  color: var(--text);
}
.head {
  width: min(1200px, 100% - 48px);
  margin-inline: auto;
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
h2 {
  margin: 18px 0 0;
  max-width: 40rem;
  font-family: gilroyB, Exo, sans-serif;
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
}
p {
  margin: 14px 0 0;
  max-width: 40rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-muted);
}
</style>
