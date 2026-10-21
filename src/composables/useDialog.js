import { watch, nextTick, onBeforeUnmount, unref } from 'vue'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Поведение модального окна: фокус внутрь при открытии, ловушка Tab, Escape закрывает,
 * при закрытии фокус возвращается на элемент, открывший окно (WCAG 2.1.2, 2.4.3).
 * @param {import('vue').Ref<boolean>} isOpen
 * @param {import('vue').Ref<HTMLElement|null>} container  корневой элемент окна (role="dialog")
 * @param {() => void} close
 */
export function useDialog(isOpen, container, close) {
  let opener = null

  const getFocusable = () => [...(unref(container)?.querySelectorAll(FOCUSABLE) ?? [])].filter((el) => el.offsetParent !== null)

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
      return
    }
    if (e.key !== 'Tab') return
    const items = getFocusable()
    if (!items.length) {
      e.preventDefault()
      return
    }
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  watch(
    isOpen,
    async (open) => {
      if (open) {
        opener = document.activeElement
        document.addEventListener('keydown', onKeydown)
        await nextTick()
        const el = unref(container)
        // Первое поле окна (не кнопка закрытия) или, если его нет, само окно
        ;(getFocusable().find((n) => !n.matches('.close-button, .close-btn')) ?? el)?.focus({ preventScroll: true })
      } else {
        document.removeEventListener('keydown', onKeydown)
        opener?.focus?.({ preventScroll: true })
        opener = null
      }
    },
    { flush: 'post' },
  )

  onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
}
