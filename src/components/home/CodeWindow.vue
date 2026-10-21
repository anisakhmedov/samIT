<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Токены: k — ключевое слово, s — строка, f — функция, c — комментарий, p — обычный текст
const lines = [
  [{ t: '// sam-it.global/team.ts', c: 'c' }],
  [
    { t: 'const ', c: 'k' },
    { t: 'team', c: 'p' },
    { t: ' = {', c: 'p' },
  ],
  [
    { t: '  name: ', c: 'p' },
    { t: "'SAM IT Global'", c: 's' },
    { t: ',', c: 'p' },
  ],
  [
    { t: '  stack: [', c: 'p' },
    { t: "'Vue'", c: 's' },
    { t: ', ', c: 'p' },
    { t: "'Python'", c: 's' },
    { t: ', ', c: 'p' },
    { t: "'AI'", c: 's' },
    { t: '],', c: 'p' },
  ],
  [{ t: '}', c: 'p' }],
  [{ t: '', c: 'p' }],
  [
    { t: 'async function ', c: 'k' },
    { t: 'build', c: 'f' },
    { t: '(idea) {', c: 'p' },
  ],
  [
    { t: '  const ', c: 'k' },
    { t: 'design = ', c: 'p' },
    { t: 'await ', c: 'k' },
    { t: 'team.', c: 'p' },
    { t: 'design', c: 'f' },
    { t: '(idea)', c: 'p' },
  ],
  [
    { t: '  const ', c: 'k' },
    { t: 'product = ', c: 'p' },
    { t: 'await ', c: 'k' },
    { t: 'team.', c: 'p' },
    { t: 'develop', c: 'f' },
    { t: '(design)', c: 'p' },
  ],
  [
    { t: '  return ', c: 'k' },
    { t: 'team.', c: 'p' },
    { t: 'launch', c: 'f' },
    { t: '(product)', c: 'p' },
  ],
  [{ t: '}', c: 'p' }],
]

const total = lines.reduce((sum, line) => sum + line.reduce((s, tok) => s + tok.t.length, 0) + 1, 0)
const shown = ref(0)
const done = computed(() => shown.value >= total)
let timer = 0

// Строки с токенами, обрезанные по количеству «напечатанных» символов
const visibleLines = computed(() => {
  let left = shown.value
  const out = []
  for (const line of lines) {
    if (left <= 0) break
    const tokens = []
    for (const tok of line) {
      if (left <= 0) break
      tokens.push({ ...tok, t: tok.t.slice(0, left) })
      left -= tok.t.length
    }
    left -= 1
    out.push(tokens)
  }
  return out
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shown.value = total
    return
  }
  timer = setInterval(() => {
    shown.value += 1
    if (shown.value >= total) clearInterval(timer)
  }, 28)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="window" role="img" aria-label="Code example">
    <div class="titlebar">
      <span class="light red"></span>
      <span class="light yellow"></span>
      <span class="light green"></span>
      <span class="filename">team.ts</span>
    </div>
    <pre class="code"><code><span
      v-for="(line, i) in visibleLines"
      :key="i"
      class="line"
    ><span class="num">{{ i + 1 }}</span><span v-for="(tok, j) in line" :key="j" :class="tok.c">{{ tok.t }}</span><span v-if="i === visibleLines.length - 1 && !done" class="caret"></span>
</span></code></pre>
    <div class="status" :class="{ ok: done }">
      <span class="status-dot"></span>
      {{ done ? 'build passed · 0 errors' : 'compiling…' }}
    </div>
  </div>
</template>

<style scoped>
.window {
  width: 100%;
  max-width: 520px;
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, #121521, #0c0e15);
  border: 1px solid var(--line-strong);
  box-shadow:
    0 40px 80px -30px rgb(0 0 0 / 0.8),
    0 0 0 1px rgb(255 255 255 / 0.02) inset,
    0 0 80px -20px var(--brand-glow);
  overflow: hidden;
}
.titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--line);
  background: rgb(255 255 255 / 0.02);
}
.light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.red {
  background: #ff5f57;
}
.yellow {
  background: #febc2e;
}
.green {
  background: #28c840;
}
.filename {
  margin-left: 12px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
}
.code {
  margin: 0;
  padding: 20px 22px;
  min-height: 318px;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  line-height: 1.75;
  overflow-x: auto;
}
.line {
  display: block;
  white-space: pre;
}
.num {
  display: inline-block;
  width: 2ch;
  margin-right: 18px;
  text-align: right;
  color: #7d8598;
  user-select: none;
}
.k {
  color: #c792ea;
}
.s {
  color: #a5e075;
}
.f {
  color: #61afef;
}
.c {
  color: #8892a6;
}
.p {
  color: #d7dae0;
}
.caret {
  display: inline-block;
  width: 8px;
  height: 1.1em;
  margin-left: 1px;
  vertical-align: text-bottom;
  background: var(--brand);
}
.status {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-top: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-muted);
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand);
}
.status.ok {
  color: var(--success);
}
.status.ok .status-dot {
  background: #28c840;
  box-shadow: 0 0 10px #28c840;
}

@media (prefers-reduced-motion: no-preference) {
  .caret {
    animation: blink 1s steps(1) infinite;
  }
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
