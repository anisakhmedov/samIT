// Сотрудники и преподаватели. Ключи переводов: `${scope}.${key}.name | role | description | skills.N`
const person = (scope, key, photo, skills) => ({
  nameKey: `${scope}.${key}.name`,
  roleKey: `${scope}.${key}.role`,
  descriptionKey: `${scope}.${key}.description`,
  skillsKeys: Array.from({ length: skills }, (_, i) => `${scope}.${key}.skills.${i}`),
  photo: `/images/staff/${photo}.png`,
})

export const partners = [
  person('projects.partners', 'sanjar', 'sanjarsaidkulov', 5),
  person('projects.partners', 'nurbekjon', 'nurbekjonakhmatov', 6),
  person('projects.partners', 'ibrakhim', 'ibrakhimazizov', 5),
  person('projects.partners', 'ravshanjon', 'ravshanjohnravshanov', 5),
  person('projects.partners', 'abubakr', 'abubakrmardonkulov', 5),
  person('projects.partners', 'parviz', 'parvizkhaydarov', 5),
  person('projects.partners', 'samir', 'samir', 5),
  person('projects.partners', 'farzona', 'farzonafarkhodova', 6),
  person('projects.partners', 'shokhjakhon', 'shokhjakhonsirojev', 6),
]

export const teachers = [
  person('education.teachers', 'sanjar', 'sanjarsaidkulov', 5),
  person('education.teachers', 'nurbekjon', 'nurbekjonakhmatov', 6),
  person('education.teachers', 'izzatullo', 'izzatulloubaydullaev', 6),
  person('education.teachers', 'nemat', 'nemattilloyev', 6),
  person('education.teachers', 'abubakr', 'abubakrmardonkulov', 5),
  person('education.teachers', 'ibrakhim', 'ibrakhimazizov', 5),
]
