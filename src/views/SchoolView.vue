<script setup>
import EducationHero from '@/components/school/EducationHero.vue'
import AboutEducation from '@/components/school/AboutEducation.vue'
import CoursesSection from '@/components/school/CoursesSection.vue'
import OurTeachers from '@/components/school/OurTeachers.vue'
import TechBand from '@/components/ui/TechBand.vue'
import MapSection from '@/components/school/MapSection.vue'
</script>

<template>
  <EducationHero />
  <div class="block"></div>
  <section id="courses" class="cousesFont">
    <div class="courses-inner">
      <h2 class="courses-title">{{ $t('school.courses_title') }}</h2>
      <CoursesSection />
    </div>
  </section>
  <AboutEducation />
  <TechBand />
  <section class="sectionTeacher">
    <div class="cont"><OurTeachers /></div>
  </section>
  <section class="map-block">
    <div class="map-inner"><MapSection /></div>
  </section>
</template>

<style scoped>
.cousesFont {
  padding: clamp(48px, 9vw, 110px) 0;
  border-top: 1px solid var(--line);
  background: var(--bg-raised);
  color: var(--text);
}
.sectionTeacher {
  padding: clamp(48px, 9vw, 110px) 0;
  border-top: 1px solid var(--line);
  background: var(--bg-raised);
}
.map-block {
  padding: clamp(40px, 7vw, 80px) 0 clamp(48px, 9vw, 110px);
  border-top: 1px solid var(--line);
  background: var(--bg);
}
.cont {
  max-width: none;
}
.courses-inner {
  width: min(1200px, 100% - var(--page-gutter));
  margin-inline: auto;
}
.courses-title {
  margin: 0;
  font-family: gilroyB, Exo, sans-serif;
  font-size: clamp(1.6rem, 4.2vw, 3.2rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
}
.map-inner {
  width: min(1200px, 100% - var(--page-gutter));
  margin-inline: auto;
}
@media (max-width: 640px) {
  .cousesFont,
  .sectionTeacher {
    padding: 72px 0;
  }
}
</style>
