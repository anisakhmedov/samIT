<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDialog } from '@/composables/useDialog'
import { useMediaQuery } from '@/composables/useMediaQuery'
import { handleListboxKeys } from '@/composables/listboxKeys'
import TechBand from '@/components/ui/TechBand.vue'
import { partners } from '@/data/people'
import { projectTypes, budgets, projectFilters, services, portfolio, processSteps } from '@/data/projects'

const { t } = useI18n()
const emptyForm = () => ({ projectType: '', budget: '', name: '', email: '', description: '' })

const activeFilter = ref('all')
const showQuoteModal = ref(false)
const showProjectModal = ref(false)
const selectedProject = ref(null)
const submitting = ref(false)
const typeOpen = ref(false)
const budgetOpen = ref(false)
const form = ref(emptyForm())
// На телефоне списки превращаются в ленты: делаем их доступными с клавиатуры (WCAG 2.1.1)
const narrow = useMediaQuery('(max-width: 480px)')
const quoteDialog = ref(null)
const projectDialog = ref(null)

const filteredProjects = computed(() =>
  activeFilter.value === 'all' ? portfolio : portfolio.filter((p) => p.type === activeFilter.value),
)

const typeIconPaths = {
  web: 'M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7l-10-5z',
  mobile: 'M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3z',
  ai: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
  design: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  devops: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
}
const budgetIconPath =
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.28.6 4.18 1.77 4.18 3.84 0 1.78-1.29 2.86-3.12 3.17z'

const typeLabelKey = (value) => projectTypes.find((t) => t.value === value)?.labelKey ?? ''
const budgetLabel = (value) => budgets.find((b) => b.value === value)?.label ?? ''

const lockScroll = (locked) => (document.body.style.overflow = locked ? 'hidden' : 'auto')

const scrollToProjects = () => {
  const section = document.getElementById('projects')
  if (section) window.scrollTo({ top: section.offsetTop - 150, behavior: 'smooth' })
}
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

function openQuote() {
  showQuoteModal.value = true
  lockScroll(true)
}
function closeQuote() {
  showQuoteModal.value = false
  lockScroll(false)
  typeOpen.value = false
  budgetOpen.value = false
  form.value = emptyForm()
}
function toggleType() {
  typeOpen.value = !typeOpen.value
  budgetOpen.value = false
}
function toggleBudget() {
  budgetOpen.value = !budgetOpen.value
  typeOpen.value = false
}
function selectType(value) {
  form.value.projectType = value
  typeOpen.value = false
}
function selectBudget(value) {
  form.value.budget = value
  budgetOpen.value = false
}

function openProject(project) {
  selectedProject.value = project
  showProjectModal.value = true
  lockScroll(true)
}
function closeProject() {
  showProjectModal.value = false
  selectedProject.value = null
  lockScroll(false)
}

async function submit() {
  submitting.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('Form submitted:', form.value)
    alert(t('projects.modal.success'))
    closeQuote()
  } catch (error) {
    console.error('Error:', error)
    alert(t('projects.modal.error'))
  } finally {
    submitting.value = false
  }
}

const closeSelects = (e) => {
  if (!e.target.closest('.custom-select-wrapper')) {
    typeOpen.value = false
    budgetOpen.value = false
  }
}
// Escape закрывает открытый список, а не всё окно
function onSelectKeydown(e) {
  const isType = !!e.currentTarget.querySelector('#projectType')
  const open = isType ? typeOpen : budgetOpen
  if (handleListboxKeys(e, e.currentTarget, open.value, () => (isType ? toggleType() : toggleBudget()))) return
  if (e.key === 'Escape' && (typeOpen.value || budgetOpen.value)) {
    e.stopPropagation()
    e.preventDefault()
    const trigger = typeOpen.value ? '#projectType' : '#budget'
    typeOpen.value = false
    budgetOpen.value = false
    document.querySelector(trigger)?.focus()
  }
}

useDialog(showQuoteModal, quoteDialog, closeQuote)
useDialog(showProjectModal, projectDialog, closeProject)

onMounted(() => document.addEventListener('click', closeSelects))
onBeforeUnmount(() => document.removeEventListener('click', closeSelects))
</script>

<template>
  <div class="outsourcing-page">
    <!-- Hero -->
    <section class="hero-section">
      <div class="hero-background">
        <img src="/images/backgrounds/projects-bg.jpg" alt="Projects Background" class="bg-image" />
        <div class="overlay"></div>
      </div>
      <div class="hero-content">
        <div class="container">
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="title-white">{{ $t('projects.title').split(' ')[0] }}</span>
              <span class="title-orange">{{ $t('projects.title').split(' ')[1] }}</span>
            </h1>
            <p class="hero-description">{{ $t('projects.description') }}</p>
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">150+</div>
                <div class="stat-label">{{ $t('projects.stats.completed') }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">98%</div>
                <div class="stat-label">{{ $t('projects.stats.satisfaction') }}</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">{{ $t('projects.stats.clients') }}</div>
              </div>
            </div>
            <div class="hero-actions">
              <button class="btn-primary" @click="scrollToProjects">{{ $t('buttons.view_projects') }}</button>
              <button class="btn-secondary" @click="openQuote">{{ $t('buttons.get_quote') }}</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="services-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('services.title') }} <span>{{ $t('services.subtitle') }}</span></h2>
          <p class="section-description">{{ $t('services.description') }}</p>
        </div>
        <div
          class="services-grid"
          :role="narrow ? 'region' : undefined"
          :aria-label="narrow ? $t('services.title') + ' ' + $t('services.subtitle') : undefined"
          :tabindex="narrow ? 0 : undefined"
        >
          <div v-for="(service, i) in services" :key="service.id" class="service-card" :style="{ animationDelay: `${i * 0.1}s` }">
            <div class="service-icon"><div class="icon-wrapper" v-html="service.icon"></div></div>
            <h3 class="service-title">{{ $t(service.titleKey) }}</h3>
            <p class="service-description">{{ $t(service.descriptionKey) }}</p>
            <ul class="service-features">
              <li v-for="feature in service.features" :key="feature">
                <span class="feature-chip">
                  <span class="feature-dot"></span>
                  <span class="feature-text">{{ feature }}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <TechBand />

    <!-- Partners / team -->
    <section class="partners-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('projects.partners.title') }}</h2>
          <p class="section-description">{{ $t('projects.partners.description') }}</p>
        </div>
        <div
          class="partners-grid"
          :role="narrow ? 'region' : undefined"
          :aria-label="narrow ? $t('projects.partners.title') : undefined"
          :tabindex="narrow ? 0 : undefined"
        >
          <div v-for="partner in partners" :key="partner.nameKey" class="partner-card">
            <div class="partner-image">
              <img :src="partner.photo" :alt="$t(partner.nameKey)" />
              <div class="partner-overlay" aria-hidden="true">
                <div class="overlay-content">
                  <h4>{{ $t(partner.nameKey) }}</h4>
                  <p>{{ $t(partner.roleKey) }}</p>
                </div>
              </div>
            </div>
            <div class="partner-info">
              <div class="partner-category">{{ $t(partner.roleKey) }}</div>
              <h3 class="partner-title">{{ $t(partner.nameKey) }}</h3>
              <p class="partner-description">{{ $t(partner.descriptionKey) }}</p>
              <div class="partner-skills">
                <span v-for="key in partner.skillsKeys" :key="key" class="skill-tag">{{ $t(key) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio -->
    <section id="projects" class="portfolio-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('projects.portfolio.title') }}</h2>
          <p class="section-description">{{ $t('projects.portfolio.desc') }}</p>
        </div>
        <div class="project-filters">
          <button
            v-for="filter in projectFilters"
            :key="filter"
            class="filter-btn"
            :class="{ active: activeFilter === filter }"
            :aria-pressed="activeFilter === filter"
            @click="activeFilter = filter"
          >
            {{ $t(`projects.filters.${filter}`) }}
          </button>
        </div>
        <div
          class="projects-grid"
          :role="narrow ? 'region' : undefined"
          :aria-label="narrow ? $t('projects.portfolio.title') : undefined"
          :tabindex="narrow ? 0 : undefined"
        >
          <div v-for="project in filteredProjects" :key="project.id" class="project-card" @click="openProject(project)">
            <div class="project-image">
              <img :src="project.image" :alt="$t(project.titleKey)" />
              <div class="project-overlay" aria-hidden="true">
                <div class="overlay-content">
                  <h4>{{ $t(project.titleKey) }}</h4>
                  <p>{{ $t(project.shortDescKey) }}</p>
                  <span class="view-project">{{ $t('projects.portfolio.view') }}</span>
                </div>
              </div>
            </div>
            <div class="project-info">
              <div class="project-category">{{ $t(project.categoryKey) }}</div>
              <h3 class="project-title">
                <button type="button" class="card-link" @click.stop="openProject(project)">{{ $t(project.titleKey) }}</button>
              </h3>
              <p class="project-description">{{ $t(project.shortDescKey) }}</p>
              <div class="project-tech">
                <span v-for="tech in project.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="process-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('projects.process.title') }}</h2>
          <p class="section-description">{{ $t('projects.process.desc') }}</p>
        </div>
        <div
          class="process-timeline"
          :role="narrow ? 'region' : undefined"
          :aria-label="narrow ? $t('projects.process.title') : undefined"
          :tabindex="narrow ? 0 : undefined"
        >
          <div v-for="(step, i) in processSteps" :key="step.id" class="process-step">
            <div class="step-number">{{ i + 1 }}</div>
            <div class="step-content">
              <h3 class="step-title">{{ $t(step.titleKey) }}</h3>
              <p class="step-description">{{ $t(step.descriptionKey) }}</p>
              <ul class="step-details">
                <li v-for="key in step.detailKeys" :key="key">{{ $t(key) }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <div class="cta-text">
            <h2>{{ $t('projects.cta.title') }}</h2>
            <p>{{ $t('projects.cta.desc') }}</p>
          </div>
          <div class="cta-actions">
            <button class="btn-primary" @click="openQuote">{{ $t('buttons.get_started') }}</button>
            <button class="btn-secondary" @click="scrollToTop">{{ $t('buttons.learn_more') }}</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote modal -->
    <Transition name="modal" appear>
      <div v-if="showQuoteModal" class="modal-overlay" @click="closeQuote">
        <Transition name="modal-content" appear>
          <div
            v-if="showQuoteModal"
            ref="quoteDialog"
            class="modal-content modern"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-dialog-title"
            tabindex="-1"
            @click.stop
          >
            <div class="modal-header">
              <h2 id="quote-dialog-title" class="modal-title">{{ $t('projects.modal.get_quote') }}</h2>
              <button type="button" class="close-button" :aria-label="$t('a11y.close')" @click="closeQuote">
                <svg class="close-icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form class="modal-form" @submit.prevent="submit">
              <div class="form-group">
                <label for="projectType" class="form-label">{{ $t('projects.modal.project_type') }}</label>
                <div class="custom-select-wrapper" @keydown="onSelectKeydown">
                  <button
                    id="projectType"
                    type="button"
                    class="custom-select"
                    :class="{ open: typeOpen }"
                    aria-haspopup="listbox"
                    :aria-expanded="typeOpen"
                    aria-controls="type-listbox"
                    @click="toggleType"
                  >
                    <span class="select-display">
                      <span v-if="form.projectType" class="selected-option">{{ $t(typeLabelKey(form.projectType)) }}</span>
                      <span v-else class="placeholder">{{ $t('projects.modal.select_project_type') }}</span>
                    </span>
                    <span class="select-arrow" :class="{ rotated: typeOpen }" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <Transition name="dropdown">
                    <div v-if="typeOpen" id="type-listbox" class="dropdown-menu" role="listbox" aria-labelledby="projectType">
                      <div class="dropdown-scroll">
                        <button
                          v-for="type in projectTypes"
                          :key="type.value"
                          type="button"
                          role="option"
                          class="dropdown-item"
                          :aria-selected="form.projectType === type.value"
                          @click="selectType(type.value)"
                        >
                          <span class="option-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path :d="typeIconPaths[type.value]" /></svg>
                          </span>
                          <span class="option-content">
                            <span class="option-name">{{ $t(type.labelKey) }}</span>
                            <span class="option-description">{{ $t(type.descriptionKey) }}</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>

              <div class="form-group">
                <label for="budget" class="form-label">{{ $t('projects.modal.budget') }}</label>
                <div class="custom-select-wrapper" @keydown="onSelectKeydown">
                  <button
                    id="budget"
                    type="button"
                    class="custom-select"
                    :class="{ open: budgetOpen }"
                    aria-haspopup="listbox"
                    :aria-expanded="budgetOpen"
                    aria-controls="budget-listbox"
                    @click="toggleBudget"
                  >
                    <span class="select-display">
                      <span v-if="form.budget" class="selected-option">{{ budgetLabel(form.budget) }}</span>
                      <span v-else class="placeholder">{{ $t('projects.modal.select_budget') }}</span>
                    </span>
                    <span class="select-arrow" :class="{ rotated: budgetOpen }" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <Transition name="dropdown">
                    <div v-if="budgetOpen" id="budget-listbox" class="dropdown-menu" role="listbox" aria-labelledby="budget">
                      <div class="dropdown-scroll">
                        <button
                          v-for="budget in budgets"
                          :key="budget.value"
                          type="button"
                          role="option"
                          class="dropdown-item"
                          :aria-selected="form.budget === budget.value"
                          @click="selectBudget(budget.value)"
                        >
                          <span class="option-icon budget-icon">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path :d="budgetIconPath" /></svg>
                          </span>
                          <span class="option-content">
                            <span class="option-name">{{ budget.label }}</span>
                            <span class="option-description">{{ $t(budget.descriptionKey) }}</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>

              <div class="form-group">
                <label for="name" class="form-label">{{ $t('projects.modal.name') }}</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  name="name"
                  autocomplete="name"
                  class="form-input"
                  :placeholder="$t('projects.modal.placeholder_name')"
                  required
                />
              </div>

              <div class="form-group">
                <label for="email" class="form-label">{{ $t('projects.modal.email') }}</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  class="form-input"
                  :placeholder="$t('projects.modal.placeholder_email')"
                  required
                />
              </div>

              <div class="form-group">
                <label for="description" class="form-label">{{ $t('projects.modal.description') }}</label>
                <textarea
                  id="description"
                  name="description"
                  v-model="form.description"
                  class="form-textarea"
                  :placeholder="$t('projects.modal.placeholder_desc')"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div class="form-actions">
                <button type="button" class="cancel-button" @click="closeQuote">{{ $t('projects.modal.cancel') }}</button>
                <button type="submit" class="submit-button" :disabled="submitting">
                  <span v-if="submitting" class="loading-spinner"></span>
                  <span v-if="submitting">{{ $t('projects.modal.sending') }}</span>
                  <span v-else>{{ $t('projects.modal.send') }}</span>
                </button>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Project details modal -->
    <Transition name="modal" appear>
      <div v-if="showProjectModal" class="modal-overlay" @click="closeProject">
        <Transition name="project-modal" appear>
          <div
            v-if="showProjectModal"
            ref="projectDialog"
            class="project-modal-content modern"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            tabindex="-1"
            @click.stop
          >
            <div class="project-modal-header">
              <h3 id="project-dialog-title">{{ $t(selectedProject?.titleKey) }}</h3>
              <button type="button" class="close-btn" :aria-label="$t('a11y.close')" @click="closeProject">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div v-if="selectedProject" class="project-modal-body">
              <img :src="selectedProject.image" :alt="$t(selectedProject.titleKey)" class="project-modal-image" />
              <div class="project-modal-info">
                <p class="project-modal-description">{{ $t(selectedProject.fullDescriptionKey) }}</p>
                <div class="project-modal-details">
                  <div class="detail-item">
                    <strong>{{ $t('projects.modal.category') }}:</strong> {{ $t(selectedProject.categoryKey) }}
                  </div>
                  <div class="detail-item">
                    <strong>{{ $t('projects.modal.duration') }}:</strong> {{ selectedProject.duration }}
                  </div>
                  <div class="detail-item">
                    <strong>{{ $t('projects.modal.team_size') }}:</strong> {{ selectedProject.teamSize }}
                  </div>
                </div>
                <div class="project-modal-tech">
                  <h4>{{ $t('projects.modal.technologies') }}:</h4>
                  <div class="tech-tags">
                    <span v-for="tech in selectedProject.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.outsourcing-page {
  background: var(--bg);
  color: var(--text);
}
.container {
  width: min(1200px, 100% - var(--page-gutter));
  max-width: none;
  margin-inline: auto;
  padding: 0;
}

/* ---------- Кнопки ---------- */
.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 26px;
  border-radius: 999px;
  border: 1px solid transparent;
  font: inherit;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  color: var(--text);
  cursor: pointer;
  transition-property: transform, background-color, border-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
  -webkit-tap-highlight-color: transparent;
}
.btn-primary {
  background: linear-gradient(135deg, var(--brand), var(--brand-soft));
  color: #0b0b0f;
  box-shadow: 0 8px 28px -8px var(--brand-glow);
}
.btn-secondary {
  background: rgb(255 255 255 / 0.04);
  border-color: var(--line-strong);
}
.btn-primary:active,
.btn-secondary:active {
  transform: scale(0.96);
}
.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}
@media (hover: hover) {
  .btn-primary:hover {
    box-shadow: 0 12px 36px -6px var(--brand-glow);
  }
  .btn-secondary:hover {
    background: rgb(255 255 255 / 0.09);
    border-color: rgb(255 255 255 / 0.3);
  }
}

/* ---------- Hero ---------- */
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 120px 0 80px;
  overflow: hidden;
}
.hero-background {
  position: absolute;
  inset: 0;
}
.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.16;
  filter: grayscale(0.4);
}
.overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 50% 50% at 10% 0%, rgb(var(--brand-rgb) / 0.25), transparent),
    radial-gradient(ellipse 40% 45% at 95% 100%, rgb(34 211 238 / 0.14), transparent),
    linear-gradient(180deg, rgb(7 8 13 / 0.5), var(--bg) 96%);
}
.hero-background::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 70% 60% at 40% 40%, #000, transparent);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 40% 40%, #000, transparent);
}
.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
}
.hero-text {
  max-width: 44rem;
}
.hero-title {
  margin: 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: clamp(1.9rem, 8.5vw, 5rem);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.02em;
}
.title-white,
.title-orange {
  display: block;
}
.title-orange {
  background: linear-gradient(135deg, var(--brand), var(--brand-soft) 60%, #ffc27a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero-description {
  max-width: 36rem;
  margin: 24px 0 0;
  font-size: clamp(1.05rem, 1.6vw, 1.25rem);
  line-height: 1.6;
  color: var(--text-muted);
}
.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 36px;
}
.stat-item {
  min-width: 150px;
  padding: 18px 22px;
  border-radius: var(--radius-md);
  background: rgb(255 255 255 / 0.04);
  border: 1px solid var(--line);
}
.stat-number {
  font-family: gilroyB, Exo, sans-serif;
  font-size: 2.2rem;
  line-height: 1;
  background: linear-gradient(135deg, #fff, var(--brand-soft));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.stat-label {
  margin-top: 8px;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 36px;
}

/* ---------- Общие для секций ---------- */
.services-section,
.partners-section,
.portfolio-section,
.process-section,
.cta-section {
  padding: clamp(48px, 9vw, 110px) 0;
  border-top: 1px solid var(--line);
}
.partners-section {
  background: var(--bg-raised);
}
.section-header {
  max-width: 44rem;
  margin-bottom: 48px;
}
.section-title {
  margin: 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: clamp(1.6rem, 4.2vw, 3.2rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
}
.section-title span {
  color: var(--brand-soft);
}
.section-description {
  margin: 16px 0 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-muted);
}

/* ---------- Услуги ---------- */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.service-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 28px;
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, var(--surface), var(--bg-raised));
  border: 1px solid var(--line);
  transition-property: border-color, transform;
  transition-duration: 200ms;
  transition-timing-function: var(--ease-out);
}
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgb(var(--brand-rgb) / 0.12);
  border: 1px solid rgb(var(--brand-rgb) / 0.3);
  color: var(--brand-soft);
}
.icon-wrapper :deep(svg) {
  width: 24px;
  height: 24px;
}
.service-title {
  margin: 6px 0 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: 1.3rem;
  color: var(--text);
}
.service-description {
  margin: 0;
  flex: 1;
  line-height: 1.6;
  color: var(--text-muted);
}
.service-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
}
.feature-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  border-radius: 8px;
  background: rgb(255 255 255 / 0.05);
  border: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}
.feature-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--brand);
}

/* ---------- Команда ---------- */
.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.partner-card,
.project-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, var(--surface), var(--bg-raised));
  border: 1px solid var(--line);
  transition-property: border-color, transform;
  transition-duration: 200ms;
  transition-timing-function: var(--ease-out);
}
.partner-image,
.project-image {
  position: relative;
  overflow: hidden;
  background: #0b0d14;
}
.partner-image {
  aspect-ratio: 4 / 4.2;
}
.project-image {
  height: 220px;
}
.partner-image img,
.project-image img {
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
.partner-overlay,
.project-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  background: linear-gradient(180deg, transparent 30%, rgb(7 8 13 / 0.92));
  opacity: 0;
  transition-property: opacity;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
}
.overlay-content h4 {
  margin: 0 0 4px;
  font-size: 1.15rem;
}
.overlay-content p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-muted);
}
.view-project {
  display: inline-block;
  margin-top: 10px;
  font-weight: 600;
  color: var(--brand-soft);
}
.partner-info,
.project-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding: 22px;
}
.partner-category,
.project-category {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--brand-soft);
}
.partner-title,
.project-title {
  margin: 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: 1.2rem;
  color: var(--text);
}
.partner-description,
.project-description {
  margin: 0;
  flex: 1;
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--text-muted);
}
.partner-skills,
.project-tech,
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.skill-tag,
.tech-tag {
  padding: 4px 11px;
  border-radius: 8px;
  background: rgb(255 255 255 / 0.05);
  border: 1px solid var(--line);
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--text-muted);
}
@media (hover: hover) {
  .service-card:hover,
  .partner-card:hover,
  .project-card:hover {
    transform: translateY(-4px);
    border-color: rgb(var(--brand-rgb) / 0.5);
  }
  .partner-card:hover .partner-overlay,
  .project-card:hover .project-overlay {
    opacity: 1;
  }
  .partner-card:hover img,
  .project-card:hover img {
    transform: scale(1.04);
  }
}

/* ---------- Портфолио ---------- */
.project-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}
.filter-btn {
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  background: rgb(255 255 255 / 0.04);
  color: var(--text-muted);
  font: inherit;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition-property: background-color, border-color, color;
  transition-duration: 150ms;
  transition-timing-function: ease-out;
}
.filter-btn.active {
  background: rgb(var(--brand-rgb) / 0.14);
  border-color: var(--brand);
  color: var(--brand-soft);
}
.filter-btn:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
@media (hover: hover) {
  .filter-btn:not(.active):hover {
    color: var(--text);
    background: rgb(255 255 255 / 0.09);
  }
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 20px;
}
.project-card {
  position: relative;
  cursor: pointer;
}
/* Название карточки — настоящая кнопка; ::after растягивает зону нажатия на всю карточку */
.card-link {
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: start;
  cursor: pointer;
}
.card-link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
}
.card-link:focus-visible {
  outline: none;
}
.card-link:focus-visible::after {
  outline: 2px solid var(--focus-ring);
  outline-offset: 3px;
}

/* ---------- Процесс ---------- */
.process-timeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  counter-reset: step;
}
.process-step {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 28px;
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--line);
}
.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--brand), var(--brand-soft));
  color: #0b0b0f;
  font-family: var(--font-mono);
  font-weight: 700;
}
.step-title {
  margin: 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: 1.25rem;
  color: var(--text);
}
.step-description {
  margin: 8px 0 0;
  line-height: 1.55;
  color: var(--text-muted);
}
.step-details {
  display: grid;
  gap: 8px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}
.step-details li {
  position: relative;
  padding-left: 22px;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.step-details li::before {
  content: '';
  position: absolute;
  top: 0.55em;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--brand);
  box-shadow: 0 0 10px var(--brand);
}

/* ---------- CTA ---------- */
.cta-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: clamp(32px, 6vw, 64px);
  border-radius: var(--radius-lg);
  border: 1px solid rgb(var(--brand-rgb) / 0.35);
  background: radial-gradient(ellipse at top left, rgb(var(--brand-rgb) / 0.22), transparent 60%), var(--surface);
}
.cta-text h2 {
  margin: 0;
  max-width: 28rem;
  font-family: gilroyB, Exo, sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  line-height: 1.1;
}
.cta-text p {
  margin: 14px 0 0;
  max-width: 32rem;
  line-height: 1.6;
  color: var(--text-muted);
}
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

/* ---------- Модалка проекта ---------- */
.project-modal-content {
  width: min(860px, 100%);
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  overscroll-behavior: contain;
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, #131622, #0d0f17);
  border: 1px solid var(--line-strong);
  box-shadow: 0 40px 100px -20px rgb(0 0 0 / 0.9);
  color: var(--text);
}
.project-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 28px;
}
.project-modal-header h3 {
  margin: 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: 1.5rem;
}
.project-modal-image {
  display: block;
  width: 100%;
  height: 280px;
  object-fit: cover;
  outline: 1px solid oklch(1 0 0 / 0.1);
  outline-offset: -1px;
}
.project-modal-info {
  display: grid;
  gap: 22px;
  padding: 28px;
}
.project-modal-description {
  margin: 0;
  line-height: 1.7;
  color: var(--text-muted);
}
.project-modal-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}
.detail-item {
  padding: 14px 16px;
  border-radius: 12px;
  background: rgb(255 255 255 / 0.04);
  border: 1px solid var(--line);
  color: var(--text-muted);
}
.detail-item strong {
  display: block;
  margin-bottom: 4px;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--brand-soft);
}
.project-modal-tech h4 {
  margin: 0 0 12px;
  font-size: 0.95rem;
}

/* ---------- Движение ---------- */
@media (prefers-reduced-motion: no-preference) {
  .service-card {
    animation: rise 300ms ease-out both;
  }
}
@keyframes rise {
  from {
    opacity: 0;
    filter: blur(4px);
    transform: translateY(12px);
  }
}

@media (max-width: 640px) {
  .services-section,
  .partners-section,
  .portfolio-section,
  .process-section,
  .cta-section {
    padding: 72px 0;
  }
}
@media (max-width: 640px) {
  .hero-stats {
    flex-wrap: nowrap;
    gap: 10px;
  }
  .stat-item {
    flex: 1 1 0;
    min-width: 0;
    padding: 14px 12px;
  }
  .stat-number {
    font-size: 1.6rem;
  }
  .stat-label {
    font-size: 0.78rem;
  }
}
/* ---------- Телефон: компактнее ---------- */
@media (max-width: 480px) {
  .hero-section {
    min-height: auto;
    padding: 88px 0 40px;
  }
  .hero-description {
    margin-top: 14px;
    font-size: 1rem;
    line-height: 1.5;
  }
  .hero-stats {
    margin-top: 22px;
  }
  .stat-number {
    font-size: 1.5rem;
  }
  .hero-actions {
    gap: 10px;
    margin-top: 22px;
  }
  .hero-actions .btn-primary,
  .hero-actions .btn-secondary {
    flex: 1 1 100%;
  }
  .section-header {
    margin-bottom: 26px;
  }
  .section-description {
    margin-top: 10px;
    font-size: 1rem;
  }
  .services-grid,
  .partners-grid,
  .projects-grid,
  .process-timeline {
    gap: 14px;
  }
  .service-card {
    gap: 10px;
    padding: 20px;
  }
  .icon-wrapper {
    width: 40px;
    height: 40px;
  }
  .service-title {
    font-size: 1.15rem;
  }
  .partner-image {
    aspect-ratio: 4 / 3.2;
  }
  .partner-info,
  .project-info {
    gap: 8px;
    padding: 16px;
  }
  .partner-title,
  .project-title {
    font-size: 1.1rem;
  }
  .project-image {
    height: 160px;
  }
  .project-filters {
    gap: 8px;
    margin-bottom: 20px;
  }
  .filter-btn {
    padding: 8px 14px;
    font-size: 0.85rem;
  }
  .process-step {
    gap: 10px;
    padding: 20px;
  }
  .step-number {
    width: 38px;
    height: 38px;
  }
  .step-title {
    font-size: 1.1rem;
  }
  .step-details {
    margin-top: 12px;
  }
  .cta-content {
    gap: 18px;
    padding: 24px 20px;
  }
  .cta-actions {
    width: 100%;
    gap: 10px;
  }
  .cta-actions .btn-primary,
  .cta-actions .btn-secondary {
    flex: 1 1 100%;
  }
  .project-modal-image {
    height: 180px;
  }
  .project-modal-header {
    padding: 16px 20px;
  }
  .project-modal-info {
    gap: 16px;
    padding: 20px;
  }
}
@media (max-width: 360px) {
  .service-card,
  .process-step {
    padding: 16px;
  }
  .stat-item {
    padding: 12px 10px;
  }
}
/* ---------- Телефон: длинный список — горизонтальная лента ---------- */
@media (max-width: 480px) {
  .partners-grid,
  .projects-grid {
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
  .partner-card,
  .project-card {
    flex: 0 0 82%;
    scroll-snap-align: start;
  }
}
/* ---------- Телефон: услуги и этапы — горизонтальные ленты ---------- */
@media (max-width: 480px) {
  .services-grid,
  .process-timeline {
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
  .service-card,
  .process-step {
    flex: 0 0 82%;
    scroll-snap-align: start;
  }
}
</style>
