# Web CI Lab — автоматическая проверка веб-проекта

Учебный проект по теме 3.1.50. Репозиторий содержит рабочий адаптивный HTML/CSS/JavaScript-интерфейс и три GitHub Actions workflow для базовой, комплексной и матричной проверки.

## Запуск сайта локально

1. Склонируйте репозиторий.
2. Установите Node.js 18 или новее.
3. Выполните `npm ci`.
4. Выполните `npm run lint`, `npm test` и `npm run build`.
5. Откройте `index.html` в браузере. Для локального HTTP-сервера можно выполнить `npx --yes http-server .`.

Проект не требует сторонних npm-зависимостей: проверки используют встроенные возможности Node.js. Команда сборки создаёт каталог `dist/` с готовыми файлами сайта.

## Три уровня задания

| Уровень | Workflow | Сценарий |
| --- | --- | --- |
| Базовый | `.github/workflows/basic-ci.yml` | push в main и ручной запуск; Node.js 20; npm ci; npm test |
| Средний | `.github/workflows/quality-gate.yml` | feature/** и pull_request в main; фильтр путей; кэш npm; lint, test, build; dist на 5 дней |
| Продвинутый | `.github/workflows/enterprise-ci.yml` | матрица Ubuntu/Windows × Node.js 18/20/22; fail-fast false; production-build после matrix-test; артефакт на 7 дней |

## Проверка [skip ci]

GitHub Actions распознаёт маркеры пропуска CI в сообщении коммита, например `docs: update README [skip ci]`. Для демонстрации создайте отдельный коммит документации с таким сообщением и проверьте, что push- и pull-request-workflow не запускаются для этого коммита. Не используйте этот маркер для коммитов с изменением исходного кода.

## Структура

- `index.html`, `styles.css`, `app.js` — интерфейс Web CI Lab.
- `scripts/lint.js` — статическая проверка синтаксиса JS, структуры HTML и форматирования.
- `scripts/build.js` — production-сборка в `dist/`.
- `tests/app.test.js` — unit-тесты логики приложения.
- `.github/workflows/` — три сценария GitHub Actions.

## Важное замечание о результатах

Статусы запусков, матричные результаты и архивы появляются во вкладке **Actions** после выполнения workflow. Успешное наличие YAML-файла само по себе не является доказательством успешного прогона. Для сдачи приложите ссылки на реальные запуски и скачанный артефакт.

## Репозиторий

https://github.com/ffhg20197-maker/18-11-2006
