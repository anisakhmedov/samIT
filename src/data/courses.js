// level — id уровня (цвет и подпись берутся из него, а не из переведённого текста)
// months — длительность числом: подпись строится через i18n с учётом падежа (school.months)
const COURSE_META = [
  { price: '700 000 UZS', months: 6, level: 'beginner', featured: true },
  { price: '1 000 000 UZS', months: 8, level: 'advanced' },
  { price: '700 000 UZS', months: 7, level: 'intermediate' },
  { price: '650 000 UZS', months: 6, level: 'intermediate' },
  { price: '850 000 UZS', months: 9, level: 'advanced' },
  { price: '1 200 000 UZS', months: 8, level: 'advanced' },
  { price: '800 000 UZS', months: 10, level: 'intermediate' },
  { price: '1 000 000 UZS', months: 7, level: 'intermediate' },
]

export const courses = COURSE_META.map((meta, i) => {
  const id = i + 1
  const k = `school.courses.${id}`
  return {
    id,
    titleKey: `${k}.title`,
    categoryKey: `${k}.category`,
    descKey: `${k}.desc`,
    levelKey: `${k}.level`,
    studentsKey: `${k}.students`,
    ratingKey: `${k}.rating`,
    image: `/images/courses/courses${id}.jpg`,
    ...meta,
  }
})

// Короткий список курсов для заявки с главного экрана школы
export const heroCourses = [
  { id: 1, title: 'Frontend Development' },
  { id: 2, title: 'Backend Development' },
  { id: 3, title: 'Full Stack Development' },
  { id: 4, title: 'Mobile Development' },
  { id: 5, title: 'AI & Machine Learning' },
]
