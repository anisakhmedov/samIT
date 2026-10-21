/**
 * Стрелки в самодельном выпадающем списке (шаблон APG «select-only combobox»):
 * - на кнопке ↓/↑ открывают список (если он закрыт) или ведут к первому/последнему варианту;
 * - на варианте ↓/↑ двигают фокус, Home/End — в начало/конец.
 * @param {KeyboardEvent} e
 * @param {HTMLElement} wrapper   контейнер кнопки и списка
 * @param {boolean} isOpen
 * @param {() => void} open       открыть список
 * @returns {boolean} true, если клавиша обработана
 */
export function handleListboxKeys(e, wrapper, isOpen, open) {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return false
  const trigger = wrapper.querySelector('[aria-haspopup="listbox"]')
  if (!isOpen) {
    if (e.target === trigger && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault()
      open()
      return true
    }
    return false
  }
  const options = [...wrapper.querySelectorAll('[role="option"]')]
  if (!options.length) return false
  e.preventDefault()
  const index = options.indexOf(document.activeElement)
  let next
  if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = options.length - 1
  else if (e.key === 'ArrowDown') next = index < 0 ? 0 : Math.min(index + 1, options.length - 1)
  else next = index < 0 ? options.length - 1 : Math.max(index - 1, 0)
  options[next].focus()
  return true
}
