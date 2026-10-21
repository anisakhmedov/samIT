import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/HomeView.vue') },
  { path: '/school', name: 'School', component: () => import('@/views/SchoolView.vue') },
  { path: '/projects', name: 'Projects', component: () => import('@/views/ProjectsView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export default createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior: (to, from, saved) => saved || { top: 0 },
})
