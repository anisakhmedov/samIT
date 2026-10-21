<script setup>
import { computed, watch, nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import HeaderBlock from '@/components/layout/HeaderBlock.vue'
import FooterBlock from '@/components/layout/FooterBlock.vue'

const route = useRoute()
const { t, locale } = useI18n()
const mainRef = ref(null)

const titleKeys = { '/': 'nav.home', '/projects': 'nav.projects', '/school': 'nav.school' }

// Заголовок вкладки отражает текущую страницу и язык (WCAG 2.4.2)
const pageTitle = computed(() => {
  const key = titleKeys[route.path]
  return !key || route.path === '/' ? 'SAM IT Global' : `${t(key)} — SAM IT Global`
})
watch(pageTitle, (title) => (document.title = title), { immediate: true })

// Язык документа совпадает с выбранным языком интерфейса (WCAG 3.1.1)
watch(locale, (lang) => (document.documentElement.lang = lang), { immediate: true })

// SPA не перезагружает страницу: после смены маршрута переносим фокус в начало контента
watch(
  () => route.path,
  async (_, previous) => {
    if (previous === undefined) return
    await nextTick()
    mainRef.value?.focus({ preventScroll: true })
  },
)
</script>

<template>
  <div id="app">
    <a href="#main" class="skip-link" @click.prevent="mainRef?.focus()">{{ $t('a11y.skip') }}</a>
    <HeaderBlock />
    <main id="main" ref="mainRef" class="main-content" tabindex="-1">
      <router-view />
    </main>
    <FooterBlock />
  </div>
</template>
