# SAM IT Global

Сайт SAM IT Global: Vue 3 + Vite + vue-router + vue-i18n (RU/EN).
Исходники восстановлены из готовой сборки (оригинальных не было), поэтому комментариев мало, а стили
перенесены как были — их можно смело переписывать при редизайне.

## Запуск
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # сборка в dist/
```
На хостинге нужен SPA-fallback на `index.html` (маршруты /school, /projects), сайт — в корне домена.

## Структура
```
index.html
public/                     статика, отдаётся как есть (пути вида /images/...)
  images/{brand,backgrounds,hero,courses,content,staff}
  fonts/                    Gilroy
src/
  main.js, App.vue
  router/                   маршруты: / , /school , /projects (остальное -> /)
  i18n/                     index.js + locales/{en,ru}.json — все тексты
  styles/tokens.css         дизайн-токены тёмной темы (цвета, радиусы, кнопки)
  styles/modal.css          модалки и формы (общие)
  styles/global.css         старые глобальные стили + Tailwind v4 (скомпилирован)
  data/                     courses, people (команда/преподаватели), projects, about — данные страниц
  components/
    layout/                 HeaderBlock, FooterBlock
    ui/                     AnimatedButton
    school/                 EducationHero, AboutEducation, AboutCard, AboutIcon, CoursesSection,
                            CourseModal, OurTeachers, MapSection
  views/                    HomeView, SchoolView, ProjectsView
_legacy/                    старая скомпилированная сборка и неиспользуемые файлы (видео 190 МБ) — можно удалить
```

## Нюансы
- `images/staff/`: 8 фото — серые заглушки, замените файлами с теми же именами.
- Заявки с /school уходят `POST /api/lead` (Telegram) — бэкенда в проекте нет, нужно сделать серверную часть.
- Форма на /projects — заглушка (setTimeout + alert).
- Tailwind в проекте не установлен: используются несколько готовых утилит из `global.css`.
- В `AnimatedButton` иконки не показываются: HomeView передаёт слот `icon-left`, а кнопка читает `icon` (как в оригинале).
- Ссылка «AI School» в меню ведёт на `/ai-school`, которого нет — редирект на главную (как в оригинале).
