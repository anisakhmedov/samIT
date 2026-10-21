import { ref, onMounted, onBeforeUnmount } from 'vue'

/** Реактивный media query: true, пока условие выполняется (в браузере; на сервере всегда false). */
export function useMediaQuery(query) {
  const matches = ref(false)
  let mql = null
  const update = () => (matches.value = mql.matches)

  onMounted(() => {
    mql = window.matchMedia(query)
    update()
    mql.addEventListener('change', update)
  })
  onBeforeUnmount(() => mql?.removeEventListener('change', update))

  return matches
}
