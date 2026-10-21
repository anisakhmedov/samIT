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
  <article class="about-card">
    <!-- Иконка лежит внутри карточки, в правом верхнем углу -->
    <div class="icon-badge" aria-hidden="true">
      <slot name="icon"><AboutIcon name="graduation" /></slot>
    </div>

    <h4 class="card-title">{{ title }}</h4>
    <p class="card-description">{{ description }}</p>
    <div class="card-image"><img :src="imageSrc" alt="" class="image" /></div>
  </article>
</template>

<style scoped>
.about-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, var(--surface), var(--bg-raised));
  border: 1px solid var(--line);
  color: var(--text);
}
.icon-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--brand), var(--brand-soft));
  color: #0b0b0f;
  box-shadow: 0 8px 24px -8px var(--brand-glow);
}
.card-title {
  margin: 0;
  /* место под иконку, чтобы заголовок не заезжал на неё */
  padding-right: 64px;
  min-height: 52px;
  display: flex;
  align-items: center;
  font-family: gilroyB, Exo, sans-serif;
  font-size: 1.35rem;
  line-height: 1.25;
  color: var(--text);
}
.card-description {
  margin: 0;
  line-height: 1.6;
  color: var(--text-muted);
}
.card-image {
  margin-top: 6px;
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

@media (max-width: 480px) {
  .about-card {
    gap: 8px;
    padding: 18px;
  }
  .icon-badge {
    top: 16px;
    right: 16px;
    width: 46px;
    height: 46px;
    border-radius: 14px;
  }
  .card-title {
    padding-right: 56px;
    min-height: 46px;
    font-size: 1.15rem;
  }
  .card-description {
    font-size: 0.92rem;
    line-height: 1.5;
  }
  .image {
    height: 130px;
  }
}
</style>
