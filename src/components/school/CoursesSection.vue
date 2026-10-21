<script setup>
import { ref } from 'vue'
import CourseModal from './CourseModal.vue'
import { courses } from '@/data/courses'
import { useMediaQuery } from '@/composables/useMediaQuery'

// На телефоне сетка — горизонтальная лента; делаем её доступной с клавиатуры
const narrow = useMediaQuery('(max-width: 480px)')
const showModal = ref(false)
const selectedCourse = ref('')

const enroll = (course) => {
  selectedCourse.value = course.titleKey
  showModal.value = true
}
const onSuccess = (message) => alert(message)
const onError = (message) => alert(message)
</script>

<template>
  <div
    class="grid-container"
    :role="narrow ? 'region' : undefined"
    :aria-label="narrow ? $t('school.courses_title') : undefined"
    :tabindex="narrow ? 0 : undefined"
  >
    <article
      v-for="course in courses"
      :key="course.id"
      class="course"
      :class="{ featured: course.featured }"
      @click="enroll(course)"
    >
      <div class="media">
        <img :src="course.image" alt="" loading="lazy" class="media-image" />
        <span class="category">{{ $t(course.categoryKey) }}</span>
      </div>

      <div class="body">
        <span class="level" :class="`level-${course.level}`">
          <span class="level-dot" aria-hidden="true"></span>
          {{ $t(`school.levels.${course.level}`) }}
        </span>

        <h3 class="title">{{ $t(course.titleKey) }}</h3>
        <p class="desc">{{ $t(course.descKey) }}</p>

        <ul class="meta">
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {{ $t('school.months', { n: course.months }, course.months) }}
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {{ $t(course.studentsKey) }}
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="star">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {{ $t(course.ratingKey) }}
          </li>
        </ul>

        <div class="foot">
          <span class="price">{{ course.price }}</span>
          <span class="cta" aria-hidden="true">
            {{ $t('school.courses.enroll') }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      <!-- Настоящая кнопка на всю карточку: доступна с клавиатуры и скринридеру -->
      <button
        type="button"
        class="item-hit"
        :aria-label="`${$t(course.titleKey)} — ${$t('school.courses.enroll')}`"
        @click.stop="enroll(course)"
      ></button>
    </article>

    <CourseModal
      v-model="showModal"
      :courses="courses"
      :selected-course="selectedCourse"
      telegram-chat-id="6961771197"
      @success="onSuccess"
      @error="onError"
    />
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
  margin-top: clamp(24px, 5vw, 48px);
}

.course {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, var(--surface), var(--bg-raised));
  border: 1px solid var(--line);
  color: var(--text);
  cursor: pointer;
  transition-property: border-color, transform;
  transition-duration: 200ms;
  transition-timing-function: var(--ease-out);
}

/* ---------- Изображение ---------- */
.media {
  position: relative;
  height: 190px;
  flex: none;
  overflow: hidden;
  background: #0b0d14;
}
.media-image {
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
.media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgb(7 8 13 / 0.35), transparent 45%, rgb(7 8 13 / 0.55));
}
.category {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 1;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgb(7 8 13 / 0.78);
  border: 1px solid var(--line-strong);
  backdrop-filter: blur(8px);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text);
}

/* ---------- Содержимое ---------- */
.body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 12px;
  padding: 22px 24px 24px;
}
.level {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
}
.level-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}
.level-beginner .level-dot {
  color: #4ade80;
  box-shadow: 0 0 10px #4ade80;
}
.level-intermediate .level-dot {
  color: #fbbf24;
  box-shadow: 0 0 10px #fbbf24;
}
.level-advanced .level-dot {
  color: #f87171;
  box-shadow: 0 0 10px #f87171;
}
.title {
  margin: 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: 1.3rem;
  line-height: 1.25;
  color: var(--text);
}
.desc {
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-muted);
}
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.85rem;
  color: var(--text-muted);
}
.meta li {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}
.meta svg {
  flex: none;
  color: var(--brand-soft);
}
.meta .star {
  color: #fbbf24;
}

.foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}
.price {
  font-family: gilroyB, Exo, sans-serif;
  font-size: 1.15rem;
  color: var(--success);
  white-space: nowrap;
}
.cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--brand-soft);
}
.cta svg {
  transition-property: transform;
  transition-duration: 200ms;
  transition-timing-function: var(--ease-out);
}

/* ---------- Кнопка на всю карточку ---------- */
.item-hit {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  border: 0;
  border-radius: inherit;
  background: transparent;
  cursor: pointer;
}
.item-hit:focus-visible {
  outline-offset: -4px;
}

@media (hover: hover) {
  .course:hover {
    transform: translateY(-4px);
    border-color: rgb(var(--brand-rgb) / 0.5);
  }
  .course:hover .media-image {
    transform: scale(1.04);
  }
  .course:hover .cta svg {
    transform: translateX(4px);
  }
}

/* ---------- Сетка: 1 → 2 → 3 колонки ---------- */
@media (min-width: 720px) {
  .grid-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .course.featured {
    grid-column: 1 / -1;
    flex-direction: row;
  }
  .course.featured .media {
    width: 46%;
    height: auto;
    min-height: 260px;
  }
  .course.featured .title {
    font-size: 1.6rem;
  }
}
@media (min-width: 1100px) {
  .grid-container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .course.featured {
    grid-column: span 2;
  }
}
@media (max-width: 719px) {
  .body {
    padding: 20px;
  }
}
@media (max-width: 480px) {
  .grid-container {
    gap: 14px;
  }
  .media {
    height: 150px;
  }
  .category {
    top: 10px;
    left: 10px;
    padding: 5px 10px;
    font-size: 0.68rem;
  }
  .body {
    gap: 8px;
    padding: 16px;
  }
  .title {
    font-size: 1.15rem;
  }
  .desc {
    font-size: 0.9rem;
    line-height: 1.5;
    -webkit-line-clamp: 2;
  }
  .meta {
    gap: 6px 14px;
    font-size: 0.8rem;
  }
  .foot {
    padding-top: 12px;
  }
  .price {
    font-size: 1.05rem;
  }
}
/* ---------- Телефон: длинный список — горизонтальная лента ---------- */
@media (max-width: 480px) {
  .grid-container {
    display: flex;
    gap: 12px;
    margin-inline: calc(var(--page-gutter) / -2);
    padding: 2px calc(var(--page-gutter) / 2) 14px;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: calc(var(--page-gutter) / 2);
    scrollbar-width: thin;
    scrollbar-color: var(--line-strong) transparent;
  }
  .course {
    flex: 0 0 84%;
    scroll-snap-align: start;
  }
}
</style>
