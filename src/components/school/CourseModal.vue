<script setup>
import { ref, reactive, watch, toRef } from 'vue'
import { useDialog } from '@/composables/useDialog'
import { handleListboxKeys } from '@/composables/listboxKeys'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  courses: { type: Array, required: true },
  selectedCourse: { type: String, default: '' },
  telegramChatId: { type: String, default: 'SERVER_SIDE_ONLY' },
})
const emit = defineEmits(['update:modelValue', 'success', 'error'])

const { t } = useI18n()

const dialogRef = ref(null)
const selectButton = ref(null)
const submitting = ref(false)
const dropdownOpen = ref(false)
const form = reactive({ name: '', phone: '', selectedCourse: '', comment: '' })

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      document.body.style.overflow = 'hidden'
      if (props.selectedCourse) form.selectedCourse = props.selectedCourse
    } else {
      document.body.style.overflow = 'auto'
      dropdownOpen.value = false
    }
  },
)
watch(
  () => props.selectedCourse,
  (value) => {
    if (value) form.selectedCourse = value
  },
)

const findCourse = (titleKey) => props.courses.find((c) => c.titleKey === titleKey)
const priceOf = (titleKey) => findCourse(titleKey)?.price ?? ''

function resetForm() {
  form.name = ''
  form.phone = ''
  form.selectedCourse = ''
  form.comment = ''
}

function close() {
  emit('update:modelValue', false)
  resetForm()
}

function pickCourse(titleKey) {
  form.selectedCourse = titleKey
  dropdownOpen.value = false
  selectButton.value?.focus()
}

// Escape закрывает только список, а не всё окно
function onSelectKeydown(e) {
  if (handleListboxKeys(e, e.currentTarget, dropdownOpen.value, () => (dropdownOpen.value = true))) return
  if (e.key === 'Escape' && dropdownOpen.value) {
    e.stopPropagation()
    e.preventDefault()
    dropdownOpen.value = false
    selectButton.value?.focus()
  }
}

useDialog(toRef(props, 'modelValue'), dialogRef, close)

async function submit() {
  submitting.value = true
  try {
    const course = findCourse(form.selectedCourse)
    const courseName = course ? t(course.titleKey) : 'Не выбран'
    const text = `
🎓 Новая заявка на курс!

👤 Имя: ${form.name}
📱 Телефон: ${form.phone}
📚 Курс: ${courseName}${course ? ` — ${course.price}` : ''}
💬 Комментарий: ${form.comment || 'Нет комментариев'}

📅 Дата: ${new Date().toLocaleDateString('ru-RU')}
⏰ Время: ${new Date().toLocaleTimeString('ru-RU')}
    `.trim()

    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: props.telegramChatId, text, parse_mode: 'HTML' }),
    })
    if (!response.ok) throw new Error('Ошибка отправки')

    emit('success', t('enroll.success'))
    close()
  } catch (error) {
    console.error('Ошибка:', error)
    emit('error', t('enroll.error'))
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <Transition name="modal">
  <div v-if="modelValue" class="modal-overlay" @click="close">
    <Transition name="modal-content" appear>
    <div
        ref="dialogRef"
        class="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="course-dialog-title"
        tabindex="-1"
        @click.stop
      >
      <div class="modal-header">
        <h2 id="course-dialog-title" class="modal-title">{{ t('enroll.title') }}</h2>
        <button type="button" class="close-button" :aria-label="$t('a11y.close')" @click="close">
          <svg class="close-icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form class="modal-form" @submit.prevent="submit">
        <div class="form-group">
          <label for="name" class="form-label">{{ t('enroll.name') }}</label>
          <input id="name" v-model="form.name" type="text" name="name" autocomplete="name" class="form-input" :placeholder="t('enroll.name_placeholder')" required />
        </div>

        <div class="form-group">
          <label for="phone" class="form-label">{{ t('enroll.phone') }}</label>
          <input id="phone" v-model="form.phone" type="tel" name="phone" autocomplete="tel" inputmode="tel" class="form-input" :placeholder="t('enroll.phone_placeholder')" required />
        </div>

        <div class="form-group">
          <label for="course" class="form-label">{{ t('enroll.course') }}</label>
          <div class="custom-select-wrapper" @keydown="onSelectKeydown">
            <button
              id="course"
              ref="selectButton"
              type="button"
              class="custom-select"
              :class="{ open: dropdownOpen }"
              aria-haspopup="listbox"
              :aria-expanded="dropdownOpen"
              aria-controls="course-listbox"
              @click="dropdownOpen = !dropdownOpen"
            >
              <span class="select-display">
                <span v-if="form.selectedCourse" class="selected-course">
                  {{ t(form.selectedCourse) }} — {{ priceOf(form.selectedCourse) }}
                </span>
                <span v-else class="placeholder">{{ t('enroll.select_course') }}</span>
              </span>
              <span class="select-arrow" :class="{ rotated: dropdownOpen }" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </button>

            <Transition name="dropdown">
            <div v-if="dropdownOpen" id="course-listbox" class="dropdown-menu" role="listbox" :aria-label="t('enroll.select_course')">
              <div class="dropdown-scroll">
                <button
                  v-for="course in courses"
                  :key="course.id"
                  type="button"
                  role="option"
                  class="dropdown-item"
                  :aria-selected="form.selectedCourse === course.titleKey"
                  @click="pickCourse(course.titleKey)"
                >
                  <span class="course-name">{{ t(course.titleKey) }}</span>
                  <span class="course-price">{{ course.price }}</span>
                </button>
              </div>
            </div>
            </Transition>
          </div>
        </div>

        <div class="form-group">
          <label for="comment" class="form-label">{{ t('enroll.comment') }}</label>
          <textarea
            id="comment"
            v-model="form.comment"
            class="form-textarea"
            :placeholder="t('enroll.comment_placeholder')"
            rows="4"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-button" @click="close">{{ t('enroll.cancel') }}</button>
          <button type="submit" class="submit-button" :disabled="submitting">
            <span v-if="submitting">{{ t('enroll.sending') }}</span>
            <span v-else>{{ t('enroll.submit') }}</span>
          </button>
        </div>
      </form>
    </div>
    </Transition>
  </div>
  </Transition>
</template>
