<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const navItems = [
  { to: '/', label: 'nav.home' },
  { to: '/projects', label: 'nav.projects' },
  { to: '/school', label: 'nav.school' },
  { to: '/ai-school', label: 'nav.aiSchool' },
]
const languages = ['ru', 'en']
const phoneHref = 'tel:+998901234567'

const mobileOpen = ref(false)
const scrolled = ref(false)

const toggleMobile = () => (mobileOpen.value = !mobileOpen.value)
const closeMobile = () => (mobileOpen.value = false)
const setLocale = (lang) => (locale.value = lang)

const onScroll = () => {
  const next = window.scrollY > 20
  if (next !== scrolled.value) scrolled.value = next
}
const onDocumentClick = (e) => {
  if (!e.target.closest('.main-header')) mobileOpen.value = false
}
const onKeydown = (e) => {
  if (e.key === 'Escape' && mobileOpen.value) {
    mobileOpen.value = false
    document.querySelector('.mobile-menu-btn')?.focus()
  }
}
const onResize = () => {
  if (window.innerWidth >= 1024) mobileOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="main-header" :class="{ scrolled }">
    <div class="header-background"></div>
    <div class="header-container">
      <div class="logo-section">
        <router-link to="/" class="logo-link">
          <img src="/images/brand/logo.png" alt="SAM IT Global" class="logo-image" />
        </router-link>
        <nav class="desktop-nav" :aria-label="t('a11y.main_nav')">
          <ul class="nav-menu">
            <li v-for="item in navItems" :key="item.to" class="nav-item">
              <router-link :to="item.to" class="nav-link" :class="{ active: $route.path === item.to }">
                {{ t(item.label) }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>

      <div class="right-section">
        <div class="language-switcher desktop-lang" role="group" :aria-label="t('a11y.lang')">
          <template v-for="(lang, i) in languages" :key="lang">
            <span v-if="i" class="lang-divider" aria-hidden="true">|</span>
            <button
              class="lang-btn"
              :class="{ active: locale === lang }"
              :aria-pressed="locale === lang"
              :lang="lang"
              @click="setLocale(lang)"
            >
              {{ lang.toUpperCase() }}
            </button>
          </template>
        </div>
        <a :href="phoneHref" class="phone-link desktop-phone" :aria-label="t('a11y.call')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      </div>

      <div class="mobile-right-section">
        <div class="language-switcher mobile-lang" role="group" :aria-label="t('a11y.lang')">
          <template v-for="(lang, i) in languages" :key="lang">
            <span v-if="i" class="lang-divider" aria-hidden="true">|</span>
            <button
              class="lang-btn"
              :class="{ active: locale === lang }"
              :aria-pressed="locale === lang"
              :lang="lang"
              @click="setLocale(lang)"
            >
              {{ lang.toUpperCase() }}
            </button>
          </template>
        </div>
        <a :href="phoneHref" class="phone-link mobile-phone" :aria-label="t('a11y.call')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
        <button
          class="mobile-menu-btn"
          :class="{ active: mobileOpen }"
          :aria-label="mobileOpen ? t('a11y.menu_close') : t('a11y.menu_open')"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          @click="toggleMobile"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <nav v-if="mobileOpen" id="mobile-nav" class="mobile-nav" :aria-label="t('a11y.main_nav')">
        <ul class="mobile-menu">
          <li v-for="item in navItems" :key="item.to" class="mobile-nav-item">
            <router-link
              :to="item.to"
              class="mobile-nav-link"
              :class="{ active: $route.path === item.to }"
              @click="closeMobile"
            >
              {{ t(item.label) }}
            </router-link>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  background: transparent;
}
.header-background {
  position: absolute;
  inset: 0;
  background: transparent;
  border-bottom: 1px solid transparent;
  opacity: 0;
  transition: all 0.3s ease-in-out;
}
.main-header.scrolled .header-background {
  background: #0006;
  backdrop-filter: blur(25px) saturate(180%) brightness(1.1);
  -webkit-backdrop-filter: blur(25px) saturate(180%) brightness(1.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 1;
  box-shadow: 0 8px 32px #0003;
}
@supports (backdrop-filter: blur(25px)) {
  .main-header.scrolled .header-background {
    background: #0000001a;
  }
}
@supports not (backdrop-filter: blur(25px)) {
  .main-header.scrolled .header-background {
    background: #000c;
  }
}
.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 30px;
  align-items: cneter;
  align-items: center;
}
.main-header {
  transform: translateZ(0);
  will-change: backdrop-filter;
}
.header-background {
  will-change: backdrop-filter, opacity, background;
}
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  background: transparent;
  transform: translateZ(0);
  will-change: backdrop-filter, background;
}
.main-header.scrolled {
  background: #00000040;
  backdrop-filter: blur(25px) saturate(180%) brightness(1.2);
  -webkit-backdrop-filter: blur(25px) saturate(180%) brightness(1.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px #00000026;
}
.header-background {
  display: none;
}
@supports not (backdrop-filter: blur(25px)) {
  .main-header.scrolled {
    background: #000000d9;
  }
}
@supports (backdrop-filter: blur(25px)) {
  .main-header.scrolled {
    background: #00000026;
  }
}
.header-container {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 70px;
}
.logo-section {
  display: flex;
  align-items: center;
  gap: 40px;
  flex-shrink: 0;
}
.logo-link {
  display: block;
  transition: all 0.3s ease;
}
.logo-link:hover {
  transform: scale(1.05);
}
.logo-image {
  height: 45px;
  width: auto;
  display: block;
  transition: filter 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}
.desktop-nav {
  display: none;
}
.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 30px;
  align-items: center;
}
.nav-item {
  position: relative;
}
.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  padding: 8px 16px;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
.nav-link:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 2px;
  background: linear-gradient(90deg, var(--brand-soft), var(--brand));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
  border-radius: 1px;
}
.nav-link:hover {
  color: #ff6b35;
}
.nav-link:hover:after {
  transform: scaleX(1);
}
.nav-link.active {
  color: #ff6b35;
}
.nav-link.active:after {
  transform: scaleX(1);
}
.right-section {
  display: none;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}
.language-switcher {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff26;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 6px 12px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.language-switcher:hover {
  border-color: #ff6b3580;
  background: #fff3;
}
.lang-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.lang-btn:hover,
.lang-btn.active {
  color: #ff6b35;
}
.lang-divider {
  color: #fff6;
  font-size: 12px;
}
.phone-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: #ffffff26;
  border: 1px solid rgba(255, 107, 53, 0.3);
  border-radius: 12px;
  color: #ff6b35;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.phone-link:hover {
  background: #ff6b3533;
  border-color: #ff6b35;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px #ff6b354d;
}
.mobile-right-section {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.mobile-lang {
  padding: 4px 8px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.mobile-lang .lang-btn {
  font-size: 12px;
  padding: 1px 3px;
}
.mobile-phone {
  width: 45px;
  height: 45px;
}
.mobile-menu-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background: #ffffff26;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 4px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.mobile-menu-btn:hover {
  border-color: #ff6b35;
  background: #fff3;
}
.hamburger-line {
  width: 20px;
  height: 2px;
  background: #fff;
  border-radius: 1px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px #0003;
}
.mobile-menu-btn.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
  background: #ff6b35;
}
.mobile-menu-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}
.mobile-menu-btn.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
  background: #ff6b35;
}
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgb(7 8 13 / 0.96);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px #0000004d;
}
.mobile-menu {
  list-style: none;
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.mobile-nav-link {
  display: block;
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  padding: 12px 16px;
  transition: all 0.3s ease;
  position: relative;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
.mobile-nav-link:after {
  content: "";
  position: absolute;
  bottom: 4px;
  left: 16px;
  right: 16px;
  height: 2px;
  background: linear-gradient(90deg, var(--brand-soft), var(--brand));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
  border-radius: 1px;
}
.mobile-nav-link:hover {
  color: #ff6b35;
}
.mobile-nav-link:hover:after {
  transform: scaleX(1);
}
.mobile-nav-link.active {
  color: #ff6b35;
}
.mobile-nav-link.active:after {
  transform: scaleX(1);
}
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
@media (min-width: 1024px) {
  .logo-section .desktop-nav,
  .right-section {
    display: flex;
  }
  .mobile-right-section {
    display: none;
  }
}
@media (max-width: 1023px) {
  .header-container {
    padding: 0 15px;
    height: 60px;
  }
  .logo-section {
    gap: 0;
  }
  .logo-image {
    height: 35px;
  }
  .logo-section .desktop-nav,
  .right-section {
    display: none;
  }
  .mobile-right-section {
    display: flex;
  }
}
@media (max-width: 768px) {
  .header-container {
    padding: 0 12px;
  }
  .mobile-right-section {
    gap: 6px;
  }
  .mobile-lang {
    padding: 3px 6px;
  }
  .mobile-phone,
  .mobile-menu-btn {
    width: 40px;
    height: 40px;
  }
}
@media (max-width: 480px) {
  .logo-image {
    height: 30px;
  }
  .mobile-right-section {
    gap: 4px;
  }
  .mobile-lang .lang-btn {
    font-size: 11px;
  }
  .mobile-phone,
  .mobile-menu-btn {
    width: 36px;
    height: 36px;
  }
  .hamburger-line {
    width: 18px;
  }
}
</style>
