<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { links as sharedLinks } from '@/data/links'

const { t } = useI18n()
const email = ref('')
const year = computed(() => new Date().getFullYear())

const subscribe = () => {
  if (email.value) {
    alert(t('footer.subscribed'))
    email.value = ''
  }
}

const links = {
  ...sharedLinks,
  map: 'https://www.google.com/maps/dir//MXH5%2BR47,+Xoja+Gunjoish+street+128,+Samarkand,+Samarqand+Region/@39.6795334,66.8754116,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3f4d19c448a9f8f9:0x65fe5a5127c687b3!2m2!1d66.9578125!2d39.6795625?entry=ttu&fbclid=PAZXh0bgNhZW0CMTEAAadznVYwrXPbsNr0gKrGb_rD2mqTBcW9e7u-lheht6tgh_1Iz0Hurwgjzy5Zbw_aem_8HuS4c7R7yiSnMpEiqzJLA',
}

// Только существующие страницы: раньше ссылки вели на несуществующие /about, /courses, /contact
const quickLinks = [
  { to: '/', label: 'footer.links.home' },
  { to: '/projects', label: 'footer.links.projects' },
  { to: '/school', label: 'footer.links.courses' },
  { href: sharedLinks.aiSchool, label: 'footer.links.ai' },
  { href: sharedLinks.telegram, label: 'footer.links.contact' },
]
const services = ['web', 'mobile', 'ai', 'design', 'devops', 'consulting']
const legal = ['privacy', 'terms', 'cookies']
</script>

<template>
  <footer class="main-footer">
    <div class="footer-background">
      <div class="bg-pattern"></div>
      <div class="floating-elements">
        <div class="floating-circle circle-1"></div>
        <div class="floating-circle circle-2"></div>
        <div class="floating-circle circle-3"></div>
      </div>
    </div>

    <div class="container">
      <div class="footer-content">
        <div class="footer-section company-info">
          <div class="logo-container">
            <img src="/images/brand/logo.png" alt="SAM IT Global" class="footer-logo" />
            <h3 class="company-name">SAM IT Global</h3>
          </div>
          <p class="company-description">{{ $t('footer.description') }}</p>
          <div class="social-links">
            <a :href="links.facebook" class="social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a :href="links.instagram" class="social-link" aria-label="Instagram">
              <img src="/images/brand/inst.svg" width="30px" alt="" />
            </a>
            <a :href="links.telegram" class="social-link" aria-label="Telegram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931L23.93 3.821l.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693L18.953 5.78c.595-.394 1.136-.176.691.218z" />
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-section">
          <h4 class="section-title">{{ $t('footer.quick_links') }}</h4>
          <ul class="footer-links">
            <li v-for="link in quickLinks" :key="link.to || link.href">
              <router-link v-if="link.to" :to="link.to" class="footer-link">{{ $t(link.label) }}</router-link>
              <a v-else :href="link.href" class="footer-link">{{ $t(link.label) }}</a>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="section-title">{{ $t('footer.services') }}</h4>
          <ul class="footer-links">
            <li v-for="service in services" :key="service">
              <router-link to="/projects" class="footer-link">{{ $t(`footer.items.${service}`) }}</router-link>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="section-title">{{ $t('footer.contact_info') }}</h4>
          <div class="contact-info">
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div class="contact-text">
                <a :href="links.map"><span>{{ $t('footer.city') }}</span></a>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div class="contact-text"><span>+998 (77) 701-33-35</span></div>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div class="contact-text"><span>cooperation@samit.global</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="newsletter-section">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h4>{{ $t('footer.newsletter_title') }}</h4>
            <p>{{ $t('footer.newsletter_text') }}</p>
          </div>
          <div class="newsletter-form">
            <div class="input-group">
              <input
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                :aria-label="$t('a11y.subscribe_email')"
                :placeholder="$t('footer.email_placeholder')"
                class="newsletter-input"
              />
              <button class="newsletter-btn" @click="subscribe">
                <span>{{ $t('footer.subscribe') }}</span>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="copyright">
          <p>{{ $t('footer.copyright', { year }) }}</p>
        </div>
        <div class="footer-bottom-links">
          <span v-for="item in legal" :key="item" class="bottom-link">{{ $t(`footer.legal.${item}`) }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.main-footer {
  position: relative;
  background: var(--bg);
  border-top: 1px solid var(--line);
  color: #fff;
  overflow: hidden;
}
.footer-background {
  position: absolute;
  inset: 0;
  z-index: 1;
}
.bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 25% 25%, rgb(var(--brand-rgb) / 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgb(var(--brand-rgb) / 0.05) 0%, transparent 50%);
}
.floating-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.floating-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgb(var(--brand-rgb) / 0.1), rgb(var(--brand-rgb) / 0.05));
}
.circle-1 {
  width: 150px;
  height: 150px;
  top: 20%;
  right: 10%;
  animation-delay: 0s;
}
.circle-2 {
  width: 100px;
  height: 100px;
  bottom: 30%;
  left: 15%;
  animation-delay: 3s;
}
.circle-3 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 30%;
  animation-delay: 6s;
}
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 20px 0;
  position: relative;
  z-index: 2;
}
.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 60px;
  margin-bottom: 60px;
}
.footer-section {
  animation: fadeInUp 0.8s ease-out;
}
.company-info {
  max-width: 400px;
}
.logo-container {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.footer-logo {
  width: 50px;
  height: 50px;
  filter: brightness(0) invert(1);
}
.company-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}
.company-description {
  color: #cbd5e1;
  line-height: 1.6;
  margin: 0 0 32px;
  font-size: 0.95rem;
}
.social-links {
  display: flex;
  gap: 16px;
}
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: #ffffff1a;
  border-radius: 12px;
  color: #cbd5e1;
  transition: all 0.3s ease;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
.social-link:hover {
  background: linear-gradient(135deg, var(--brand), var(--brand-soft));
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgb(var(--brand-rgb) / 0.3);
}
.social-link svg {
  width: 20px;
  height: 20px;
}
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 24px;
  position: relative;
}
.section-title:after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, var(--brand), var(--brand-soft));
  border-radius: 2px;
}
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer-links li {
  margin-bottom: 12px;
}
.footer-link {
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  position: relative;
  display: inline-block;
}
.footer-link:hover {
  color: var(--brand);
  padding-left: 8px;
}
.footer-link:before {
  content: "";
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 2px;
  background: var(--brand);
  transition: width 0.3s ease;
}
.footer-link:hover:before {
  width: 4px;
}
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
}
.contact-icon {
  width: 40px;
  height: 40px;
  background: rgb(var(--brand-rgb) / 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--brand);
  flex-shrink: 0;
}
.contact-icon svg {
  width: 20px;
  height: 20px;
}
.contact-text span {
  color: #cbd5e1;
  font-size: 0.95rem;
}
.newsletter-section {
  background: linear-gradient(135deg, rgb(var(--brand-rgb) / 0.1), #ffffff0d);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 60px;
  border: 1px solid rgb(var(--brand-rgb) / 0.2);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
.newsletter-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}
.newsletter-text h4 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
}
.newsletter-text p {
  color: #cbd5e1;
  margin: 0;
  font-size: 0.95rem;
}
.newsletter-form {
  flex-shrink: 0;
}
.input-group {
  display: flex;
  background: #ffffff1a;
  border-radius: 12px;
  padding: 4px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid var(--control-border);
}
.newsletter-input {
  background: transparent;
  border: none;
  padding: 12px 16px;
  color: #fff;
  flex: 1;
  min-width: 280px;
  font-size: 0.95rem;
}
.newsletter-input::placeholder {
  color: #94a3b8;
}
.newsletter-btn {
  background: linear-gradient(135deg, var(--brand), var(--brand-soft));
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
}
.newsletter-btn:hover {
  background: linear-gradient(135deg, var(--brand-soft), var(--brand));
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgb(var(--brand-rgb) / 0.4);
}
.newsletter-btn svg {
  width: 16px;
  height: 16px;
}
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  gap: 20px;
}
.copyright p {
  color: #94a3b8;
  margin: 0;
  font-size: 0.9rem;
}
.footer-bottom-links {
  display: flex;
  gap: 24px;
}
.bottom-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes float {
  0%,
  to {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-15px) rotate(180deg);
  }
}
@media (max-width: 1200px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  .newsletter-content {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }
}
@media (max-width: 768px) {
  .container {
    padding: 60px 20px 0;
  }
  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .newsletter-section {
    padding: 30px 20px;
  }
  .input-group {
    flex-direction: column;
    gap: 8px;
  }
  .newsletter-input {
    min-width: auto;
  }
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  .footer-bottom-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
}
@media (max-width: 480px) {
  .logo-container {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  .social-links {
    justify-content: center;
  }
  .newsletter-section {
    padding: 24px 16px;
  }
}
/* ---------- Телефон: компактнее ---------- */
@media (max-width: 480px) {
  .container {
    padding: 36px 16px 0;
  }
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 24px 16px;
    margin-bottom: 24px;
  }
  .company-info,
  .footer-content > .footer-section:last-child {
    grid-column: 1 / -1;
  }
  .logo-container {
    gap: 12px;
    margin-bottom: 12px;
  }
  .footer-logo {
    width: 40px;
  }
  .company-description {
    margin-bottom: 16px;
    font-size: 0.9rem;
  }
  .social-link {
    width: 40px;
    height: 40px;
  }
  .section-title {
    margin-bottom: 14px;
    font-size: 1.05rem;
  }
  .footer-links li {
    margin-bottom: 8px;
  }
  .footer-link {
    font-size: 0.9rem;
  }
  .contact-item {
    gap: 12px;
  }
  .contact-text {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .contact-icon {
    width: 36px;
    height: 36px;
  }
  .newsletter-section {
    padding: 18px;
    margin-bottom: 24px;
  }
  .newsletter-content {
    gap: 14px;
  }
  .newsletter-text h4 {
    font-size: 1.15rem;
  }
  .newsletter-text p {
    font-size: 0.9rem;
  }
  .footer-bottom {
    gap: 10px;
    padding: 16px 0;
  }
  .footer-bottom-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px 14px;
  }
}
</style>
