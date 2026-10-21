export const projectTypes = [
  { value: 'web', labelKey: 'services.items.web.title', descriptionKey: 'services.items.web.description' },
  { value: 'mobile', labelKey: 'services.items.mobile.title', descriptionKey: 'services.items.mobile.description' },
  { value: 'ai', labelKey: 'services.items.ai.title', descriptionKey: 'services.items.ai.description' },
  { value: 'design', labelKey: 'services.items.design.title', descriptionKey: 'services.items.design.description' },
  { value: 'devops', labelKey: 'services.items.cloud.title', descriptionKey: 'services.items.cloud.description' },
]

export const budgets = [
  { value: '1000-5000', label: '$1,000 – $5,000', descriptionKey: 'projects.modal.budget_small' },
  { value: '5000-15000', label: '$5,000 – $15,000', descriptionKey: 'projects.modal.budget_medium' },
  { value: '15000-50000', label: '$15,000 – $50,000', descriptionKey: 'projects.modal.budget_large' },
  { value: '50000+', label: '$50,000+', descriptionKey: 'projects.modal.budget_enterprise' },
]

export const projectFilters = ['all', 'web', 'mobile', 'ai', 'design']

export const services = [
  {
    id: 1,
    titleKey: 'services.items.web.title',
    descriptionKey: 'services.items.web.description',
    features: ['Responsive Design', 'SEO Optimization', 'Fast Performance', 'Secure Architecture'],
    startingPrice: '400',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7l-10-5zM12 4.3l8 4V17H4V8.3l8-4z"/></svg>',
  },
  {
    id: 2,
    titleKey: 'services.items.mobile.title',
    descriptionKey: 'services.items.mobile.description',
    features: ['iOS & Android', 'React Native', 'Flutter', 'App Store Deployment'],
    startingPrice: '5,000',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zM14 21h-4v-1h4v1zm1.25-3H8.75V4h6.5v14z"/></svg>',
  },
  {
    id: 3,
    titleKey: 'services.items.ai.title',
    descriptionKey: 'services.items.ai.description',
    features: ['Machine Learning', 'Data Analysis', 'Predictive Models', 'Automation'],
    startingPrice: '8,000',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
  },
  {
    id: 4,
    titleKey: 'services.items.design.title',
    descriptionKey: 'services.items.design.description',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    startingPrice: '1,500',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  },
]

const project = (id, type, technologies, duration, teamSize) => ({
  id,
  type,
  titleKey: `projects.portfolio.project${id}.title`,
  categoryKey: `projects.portfolio.project${id}.category`,
  shortDescKey: `projects.portfolio.project${id}.short_desc`,
  fullDescriptionKey: `projects.portfolio.project${id}.full_desc`,
  image: '/images/courses/courses6.jpg',
  technologies,
  duration,
  teamSize,
})

export const portfolio = [
  project(1, 'web', ['React', 'Node.js', 'MongoDB', 'Stripe'], '4 months', '5 developers'),
  project(2, 'mobile', ['React Native', 'Firebase', 'Google Maps', 'Stripe'], '6 months', '4 developers'),
  project(3, 'ai', ['Python', 'TensorFlow', 'NLP', 'REST API'], '3 months', '3 developers'),
  project(4, 'design', ['Figma', 'Adobe XD', 'Design System', 'Prototyping'], '2 months', '2 designers'),
  project(5, 'web', ['Vue.js', 'Laravel', 'MySQL', 'AWS'], '5 months', '6 developers'),
  project(6, 'mobile', ['Flutter', 'Firebase', 'HealthKit', 'Charts'], '4 months', '3 developers'),
]

const step = (id, name) => ({
  id,
  titleKey: `projects.process.steps.${name}`,
  descriptionKey: `projects.process.${name}.desc`,
  detailKeys: [1, 2, 3, 4].map((n) => `projects.process.${name}.detail${n}`),
})

export const processSteps = [step(1, 'discovery'), step(2, 'design'), step(3, 'development'), step(4, 'testing')]
