<script setup>
import { ref } from 'vue'
import { techRows } from '@/data/tech'

// Лента движется дольше 5 секунд — нужна кнопка паузы (WCAG 2.2.2)
const paused = ref(false)
</script>

<template>
  <div class="marquee-wrap">
    <div class="marquee" :class="{ paused }" role="group" aria-label="Technologies">
      <div v-for="(row, i) in techRows" :key="i" class="marquee-row" :class="{ reverse: i % 2 === 1 }">
        <ul class="track">
          <!-- Список дублируется, чтобы лента замыкалась без разрыва -->
          <li v-for="(tech, j) in [...row, ...row]" :key="j" class="chip" :aria-hidden="j >= row.length || undefined">
            <span class="dot" :style="{ background: tech.color, boxShadow: `0 0 12px ${tech.color}` }"></span>
            {{ tech.name }}
          </li>
        </ul>
      </div>
    </div>

    <button type="button" class="pause" :aria-pressed="paused" @click="paused = !paused">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path v-if="!paused" d="M6 5h4v14H6zM14 5h4v14h-4z" />
        <path v-else d="M8 5v14l11-7z" />
      </svg>
      {{ paused ? $t('a11y.play') : $t('a11y.pause') }}
    </button>
  </div>
</template>

<style scoped>
.marquee-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.marquee {
  display: grid;
  gap: 16px;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}
.marquee-row {
  overflow: hidden;
}
.track {
  display: flex;
  gap: 16px;
  width: max-content;
  margin: 0;
  padding: 0;
  list-style: none;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--text);
  font-size: 1.05rem;
  font-weight: 600;
  white-space: nowrap;
  transition-property: border-color, background-color;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.pause {
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: rgb(255 255 255 / 0.04);
  color: var(--text-muted);
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  transition-property: background-color, color;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}

@media (hover: hover) {
  .chip:hover {
    background: var(--surface-hover);
    border-color: var(--line-strong);
  }
  .marquee-row:hover .track {
    animation-play-state: paused;
  }
  .pause:hover {
    background: rgb(255 255 255 / 0.09);
    color: var(--text);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .track {
    animation: scroll-left 40s linear infinite;
  }
  .reverse .track {
    animation-name: scroll-right;
    animation-duration: 46s;
  }
  .marquee.paused .track {
    animation-play-state: paused;
  }
}
@media (prefers-reduced-motion: reduce) {
  .track {
    flex-wrap: wrap;
    width: auto;
    justify-content: center;
  }
  .chip[aria-hidden='true'] {
    display: none;
  }
  .pause {
    display: none;
  }
}

@keyframes scroll-left {
  to {
    transform: translateX(calc(-50% - 8px));
  }
}
@keyframes scroll-right {
  from {
    transform: translateX(calc(-50% - 8px));
  }
  to {
    transform: translateX(0);
  }
}
</style>
