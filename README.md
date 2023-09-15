# Темплейт для проектов с использованием Gulp.js

Шаблон для разработки приложений и автоматизации различных задач.

Если вы работаете над web-проектом, который:
- не основан на современных JS-фреймворках;
- не является SPA или PWA.

Gulp — ваш бро, не сомневайтесь.

## Инуструкция по развёртыванию:

1. Установите LTS версию Node.js
2. Клонируйте данный репозиторий
3. Установите утилиту командной строки gulp командой `npm i --g gulp-cli`
4. Установите все зависимости проекта командой `npm i`
5. Для запуска введите соответствующие команды:
  - для разработки: `npm run start`
  - для итоговой сборки `npm run build`

## Список пакетов:

- `file-include` позволяет включать HTML файл друг в друга
- `sass` - компилирует SCSS файлы в CSS
- `sass-glob` - улучшает работу с импортами SCSS файлов
- `sourcemaps` - гененрирует карты соответствия скомпилированного и исходного кода
- `server` - развёртывает локальный сервер с 'Hot reload'
- `clean` - удаляет соответствующие директории
- `changed` - следит за тем, какие именно файлы были изменены
- `fs` - для работы с файловой системой
- `plumber` и `notify` - необходимы для отображения ошибок при сборке
- `webpack` - осуществляет сборку JS файлов
- `babel` - оптимизирует JS файлы для поддержки старых браузеров
- `imagemin` - оптимизация изображений

> Указанные выше пакеты работают как в режиме разработки, так и в режиме для итоговой сборки. Дальнейшие пакеты функционируют только в режиме сборки.

- `htmlclean` - минифицирует HTML код
- `webp`, `webp-html` и `webp-css` - автогенерация и автоподключение webp в HTML и CSS файлах
- `autoprefixer` - добавление вендорных префиксов для CSS
- `csso` - минификация CSS файлов
- `group-css-media-qureies` - группировка медиа-запросов в CSS файлах

## Описание



