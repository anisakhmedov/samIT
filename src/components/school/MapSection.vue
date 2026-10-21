<script setup>
const mapUrl =
  'https://www.google.com/maps/place/SamIT+Global/@39.6795666,66.9552376,17z/data=!3m1!4b1!4m6!3m5!1s0x3f4d19c448a9f8f9:0x65fe5a5127c687b3!8m2!3d39.6795625!4d66.9578125!16s%2Fg%2F11krd9h9_l?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D'
</script>

<template>
  <div class="map-section">
    <div class="decorative-elements">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
    <div class="map-card">
      <img src="/images/backgrounds/cardFon.png" alt="BIT ACADEMY" class="map-bg-image" />
      <div class="map-content">
        <div class="info-block">
          <div class="logo-wrapper">
            <img src="/images/brand/logoMap.svg" class="logo" alt="BIT ACADEMY" />
          </div>
          <div class="address-wrapper">
            <div class="location-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <p class="address">Xoja Gunjoish street 128, Samarkand, Samarqand Region</p>
          </div>
        </div>
        <a :href="mapUrl" target="_blank" class="map-button">
          <span class="button-icon-wrapper">
            <img src="/images/brand/mapIcon.svg" alt="map" class="map-icon" />
          </span>
          <span class="button-text">Открыть в Google Картах</span>
          <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
      <div class="pulse-effect"></div>
    </div>
  </div>
</template>

<style scoped>
.map-section {
  position: relative;
  padding: 40px 20px;
}
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}
.circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgb(var(--brand-rgb) / 0.1), rgb(var(--brand-soft-rgb) / 0.05));
}
.circle-1 {
  width: 200px;
  height: 200px;
  top: -50px;
  left: -50px;
  animation-delay: 0s;
}
.circle-2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  right: -30px;
  animation-delay: 2s;
}
.circle-3 {
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  animation-delay: 4s;
}
.map-card {
  position: relative;
  border-radius: 24px;
  height: 50vh;
  overflow: hidden;
  box-shadow:
    0 25px 50px -12px #00000040,
    0 0 0 1px rgb(var(--brand-rgb) / 0.1);
  margin: 0 auto;
  max-width: 420px;
  animation: slideUp 0.8s ease-out;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  z-index: 1;
}
.map-card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 35px 60px -12px #0000004d,
    0 0 0 1px rgb(var(--brand-rgb) / 0.2);
}
.map-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.map-card:hover .map-bg-image {
  transform: scale(1.05);
}
.map-content {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  color: #fff;
}
.info-block {
  margin-bottom: 1.5rem;
  animation: fadeInUp 1s ease-out 0.3s both;
}
.logo-wrapper {
  margin-bottom: 1.5rem;
  animation: fadeIn 1s ease-out 0.5s both;
}
.logo {
  width: 85%;
  max-width: 280px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  transition: transform 0.3s ease;
}
.logo:hover {
  transform: scale(1.05);
}
.address-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  animation: fadeInUp 1s ease-out 0.7s both;
}
.location-icon {
  width: 20px;
  height: 20px;
  color: var(--brand);
  flex-shrink: 0;
  margin-top: 2px;
}
.location-icon svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 2px 8px rgb(var(--brand-rgb) / 0.6));
}
.address {
  font-size: 0.9375rem;
  line-height: 1.5;
  margin: 0;
  font-weight: 400;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}
.map-button {
  background: linear-gradient(135deg, var(--brand), var(--brand-soft));
  color: #fff;
  font-size: 0.9375rem;
  padding: 0.875rem 1.5rem;
  border-radius: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: all 0.4s ease;
  width: fit-content;
  box-shadow: 0 8px 24px rgb(var(--brand-rgb) / 0.4);
  position: relative;
  overflow: hidden;
  animation: fadeInUp 1s ease-out 0.9s both;
}
.map-button:before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}
.map-button:hover:before {
  left: 100%;
}
.map-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgb(var(--brand-rgb) / 0.5);
}
.map-button:active {
  transform: translateY(-1px);
}
.button-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #fff3;
  border-radius: 8px;
  transition: transform 0.3s ease;
}
.map-button:hover .button-icon-wrapper {
  transform: rotate(15deg) scale(1.1);
}
.map-icon {
  width: 16px;
  height: 16px;
}
.button-text {
  flex: 1;
}
.arrow-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}
.map-button:hover .arrow-icon {
  transform: translate(5px);
}
.pulse-effect {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 12px;
  height: 12px;
  background: var(--brand);
  border-radius: 50%;
  opacity: 0;
}
@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes float {
  0%,
  to {
    transform: translate(0) rotate(0);
  }
  33% {
    transform: translate(20px, -20px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}
@keyframes pulse {
  0%,
  to {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}
@keyframes pulseIndicator {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  to {
    opacity: 0;
    transform: scale(3);
  }
}
@media (min-width: 640px) {
  .map-card {
    max-width: 100%;
    min-height: 400px;
  }
  .map-content {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    padding: 2.5rem;
  }
  .info-block {
    margin-bottom: 0;
  }
}
@media (max-width: 480px) {
  .map-section {
    padding: 20px 15px;
  }
  .map-card {
    border-radius: 20px;
  }
  .map-content {
    padding: 1.5rem;
  }
  .logo {
    width: 75%;
  }
  .address {
    font-size: 0.875rem;
  }
  .map-button {
    font-size: 0.875rem;
    padding: 0.75rem 1.25rem;
  }
  .button-text {
    display: none;
  }
  .map-button {
    gap: 0.5rem;
  }
  .map-button:after {
    content: "Google Карты";
  }
}
@media (max-width: 640px) {
  .decorative-elements {
    display: none;
  }
}
</style>
